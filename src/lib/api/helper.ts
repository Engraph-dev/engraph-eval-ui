// "use server"
import { AUTH_SESSION, LOCAL_AUTH_SESSION } from "@/lib/config/api"
import {
	type ReqMethod as RequestMethod,
	type ResJSON as ResponseJSON,
	type StatusCode,
	StatusCodes,
} from "@/lib/types/api"

export type MakeAPIRequestArgs<
	ParamsT extends {} = {},
	BodyT extends {} = {},
	QueryT extends {} = {},
> = {
	requestUrl: string
	requestMethod: RequestMethod
	urlParams: ParamsT
	bodyParams: BodyT
	queryParams: QueryT
	customHeaders?: Headers
}

export type MakeAPIRequestRet<
	ResponseT extends {} = {},
	ParamsT extends {} = {},
	BodyT extends {} = {},
	QueryT extends {} = {},
> =
	| {
			hasResponse: true
			hasError: false
			statusCode: StatusCode
			responseData: ResponseJSON<ResponseT, ParamsT, BodyT, QueryT>
			errorData: undefined
	  }
	| {
			hasResponse: false
			hasError: true
			statusCode: StatusCode
			responseData: undefined
			errorData: Error
	  }

export async function makeAPIRequest<
	ResponseT extends {} = {},
	ParamsT extends {} = {},
	BodyT extends {} = {},
	QueryT extends {} = {},
	Signal extends AbortSignal = AbortSignal,
>(
	args: MakeAPIRequestArgs<ParamsT, BodyT, QueryT>,
	signal?: Signal,
): Promise<MakeAPIRequestRet<ResponseT, ParamsT, BodyT, QueryT>> {
	const url = process.env.NEXT_PUBLIC_API_URL || ""
	const {
		requestMethod,
		requestUrl,
		urlParams,
		queryParams,
		bodyParams,
		customHeaders = new Headers(),
	} = args

	let resolvedUrl = requestUrl

	for (const paramKey in urlParams) {
		const paramValue = urlParams[paramKey] as string
		resolvedUrl = resolvedUrl.replaceAll(
			`:${paramKey}`,
			paramValue.toString(),
		)
		resolvedUrl = resolvedUrl.replaceAll(
			`[${paramKey}]`,
			paramValue.toString(),
		)
	}

	const queryParameters = new URLSearchParams(queryParams)
	resolvedUrl = `${url}${resolvedUrl}?${queryParameters.toString()}`

	let sessionToken = null
	const isWindow = typeof window !== "undefined"
	if (isWindow) {
		const cookies = document.cookie.split(";")
		const authCookie = cookies.find((c) =>
			c.trim().startsWith("x-engaze-auth-local="),
		)
		if (authCookie) {
			sessionToken = authCookie.split("=")[1].trim()
		}
	} else {
		const { cookies } = await import("next/headers")
		const storedCookie = (await cookies()).get(LOCAL_AUTH_SESSION)
		sessionToken = storedCookie ? storedCookie.value : ""
	}

	let fetchResponse: Response | null = null
	try {
		fetchResponse = await fetch(resolvedUrl, {
			method: requestMethod,
			credentials: "include",
			headers: sessionToken
				? {
						"Content-Type": "application/json",
						[AUTH_SESSION]: sessionToken,
						...customHeaders,
					}
				: {
						"Content-Type": "application/json",
						...customHeaders,
					},
			...(["GET", "DELETE"].includes(requestMethod)
				? {}
				: {
						body: JSON.stringify(bodyParams),
					}),
			signal,
		})

		const statusCode = fetchResponse.status as StatusCode

		if (statusCode === StatusCodes.RATE_LIMIT) {
			console.log("Rate limit exceeded")
			return {
				hasResponse: false,
				hasError: true,
				statusCode: statusCode,
				responseData: undefined,
				errorData: new Error(JSON.stringify(fetchResponse)),
			}
		}

		const responseJson = (await fetchResponse.json()) as ResponseJSON<
			ResponseT,
			ParamsT,
			BodyT,
			QueryT
		>

		return {
			hasResponse: true,
			hasError: false,
			statusCode: statusCode,
			responseData: responseJson,
			errorData: undefined,
		}
	} catch (e) {
		console.log("Network request failed:", e)

		return {
			hasResponse: false,
			hasError: true,
			statusCode: 0 as StatusCode,
			responseData: undefined,
			errorData: e as Error,
		}
	}
}
