"use client"

import { MakeAPIRequestArgs, makeAPIRequest } from "@/lib/api/helper"
import {
	InvalidParam,
	ReqMethod,
	ResponseStatus,
	StatusCodes,
} from "@/lib/types/api"
import { ErrorCode } from "@/lib/types/error"
import {
	ChangeEventHandler,
	Dispatch,
	FormEventHandler,
	SetStateAction,
	useEffect,
	useState,
} from "react"

const beforeUnloadListener = (e: Event) => {
	e.preventDefault()
	e.returnValue = true
}

export function formatErrorCode(errorCode: ErrorCode, errorArgs: any = {}) {
	return errorCode as string
}

type CategorizedValues<
	ParamT extends {} = {},
	BodyT extends {} = {},
	QueryT extends {} = {},
> = {
	urlParams: ParamT
	bodyParams: BodyT
	queryParams: QueryT
}

type Values<T extends {}> = T[keyof T]

export type FieldError = {
	errorCode: ErrorCode
	errorArgs?: any
}

type DataErrors<DataT extends {} = {}> = {
	[key in keyof DataT]?: FieldError[]
}

type FormErrors<
	ParamT extends {} = {},
	BodyT extends {} = {},
	QueryT extends {} = {},
> = {
	urlParams: DataErrors<ParamT>
	bodyParams: DataErrors<BodyT>
	queryParams: DataErrors<QueryT>
}

type ResponseHandlers<
	DataT extends {} = {},
	ParamT extends {} = {},
	BodyT extends {} = {},
	QueryT extends {} = {},
> = {
	// Note: this is for network errors
	onError?: (err: Error) => any
	onSuccess?: (data: DataT) => any
	onInvalidParams?: (
		invalidParams: InvalidParam<ParamT, BodyT, QueryT>[],
	) => any
	onUnauthenticated?: () => any
	onUnauthorized?: (status: ResponseStatus) => any
	onNotFound?: () => any
	onRateLimit?: () => any
	// Note: this is for 500 ERR_INTERNAL_ERROR
	onInternalError?: () => any
	onMethodNotAllowed?: () => any
	onUnverified?: () => any
}

type UseRequestFormArgs<
	DataT extends {} = {},
	ParamT extends {} = {},
	BodyT extends {} = {},
	QueryT extends {} = {},
> = {
	requestUrl: string
	requestMethod: ReqMethod
	formFields: CategorizedValues<ParamT, BodyT, QueryT>
	customHeaders?: Headers
	responseHandlers?: Partial<ResponseHandlers<DataT, ParamT, BodyT, QueryT>>
	beforeRequest?: (
		args: MakeAPIRequestArgs<ParamT, BodyT, QueryT>,
	) =>
		| MakeAPIRequestArgs<ParamT, BodyT, QueryT>
		| Promise<MakeAPIRequestArgs<ParamT, BodyT, QueryT>>
}

type RegisterFieldFunctionRet<FieldT, NameT> = {
	value: FieldT & {}
	onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
	name: NameT
}

// Ref https://stackoverflow.com/questions/69850324/omit-never-types-in-typescript

type ValuePrimitive = null | undefined | string | number | boolean

type _PickValuePrimitivesImpl<T extends {}> = {
	[key in keyof T]: T[key] extends ValuePrimitive ? T[key] : never
}

type OmitNever<T extends {}> = {
	[K in keyof T as T[K] extends never ? never : K]: T[K]
}

export type PickValuePrimitives<T extends {}> = OmitNever<
	_PickValuePrimitivesImpl<T>
>

type RegisterFieldFunction<
	ParamT extends {} = {},
	BodyT extends {} = {},
	QueryT extends {} = {},
> = {
	(
		fieldName: keyof PickValuePrimitives<ParamT>,
		paramType: "URL",
	): RegisterFieldFunctionRet<
		Values<PickValuePrimitives<ParamT>>,
		keyof PickValuePrimitives<ParamT>
	>
	(
		fieldName: keyof PickValuePrimitives<BodyT>,
		paramType: "BODY",
	): RegisterFieldFunctionRet<
		Values<PickValuePrimitives<BodyT>>,
		keyof PickValuePrimitives<BodyT>
	>
	(
		fieldName: keyof PickValuePrimitives<QueryT>,
		paramType: "QUERY",
	): RegisterFieldFunctionRet<
		Values<PickValuePrimitives<QueryT>>,
		keyof PickValuePrimitives<QueryT>
	>
}

export type SetFieldErrorFunction<
	ParamT extends {} = {},
	BodyT extends {} = {},
	QueryT extends {} = {},
> = {
	(fieldName: keyof ParamT, paramType: "URL", fieldErrors: FieldError[]): void
	(fieldName: keyof BodyT, paramType: "BODY", fieldErrors: FieldError[]): void
	(
		fieldName: keyof QueryT,
		paramType: "QUERY",
		fieldErrors: FieldError[],
	): void
}

export type ClearFieldErrorFunction<
	ParamT extends {} = {},
	BodyT extends {} = {},
	QueryT extends {} = {},
> = {
	(fieldName: keyof ParamT, paramType: "URL"): void
	(fieldName: keyof BodyT, paramType: "BODY"): void
	(fieldName: keyof QueryT, paramType: "QUERY"): void
}

type FieldSetter<DataT extends {} = {}> = {
	[key in keyof DataT]: DataT[key]
}

type SetFieldsFunctionArg<
	ParamT extends {} = {},
	BodyT extends {} = {},
	QueryT extends {} = {},
> = {
	urlParams?: Partial<ParamT>
	bodyParams?: Partial<BodyT>
	queryParams?: Partial<QueryT>
}

type SetFieldsFunction<
	ParamT extends {} = {},
	BodyT extends {} = {},
	QueryT extends {} = {},
> = (partialArgs: Partial<SetFieldsFunctionArg<ParamT, BodyT, QueryT>>) => void

export type UseRequestFormRet<
	ParamT extends {} = {},
	BodyT extends {} = {},
	QueryT extends {} = {},
> = {
	hasError: boolean
	isLoading: boolean
	setLoading: Dispatch<SetStateAction<boolean>>
	isDirty: boolean
	setDirty: Dispatch<SetStateAction<boolean>>
	formValues: CategorizedValues<ParamT, BodyT, QueryT>
	formErrors: FormErrors<ParamT, BodyT, QueryT>
	clearFormErrors: () => void
	setFieldError: SetFieldErrorFunction<ParamT, BodyT, QueryT>
	clearFieldError: ClearFieldErrorFunction<ParamT, BodyT, QueryT>
	registerField: RegisterFieldFunction<ParamT, BodyT, QueryT>
	setFields: SetFieldsFunction<ParamT, BodyT, QueryT>
	resetForm: () => void
	submitForm: (
		overrideValues?: Partial<CategorizedValues<ParamT, BodyT, QueryT>>,
	) => Promise<void>
	generateSubmitHandler: (
		overrideValues?: Partial<CategorizedValues<ParamT, BodyT, QueryT>>,
	) => FormEventHandler<HTMLFormElement>
}

export function useRequestForm<
	DataT extends {} = {},
	ParamT extends {} = {},
	BodyT extends {} = {},
	QueryT extends {} = {},
>(
	args: UseRequestFormArgs<DataT, ParamT, BodyT, QueryT>,
): UseRequestFormRet<ParamT, BodyT, QueryT> {
	const { responseHandlers = {} } = args
	const [formFieldState, setFormFieldState] = useState<
		CategorizedValues<ParamT, BodyT, QueryT>
	>({
		...args.formFields,
	})

	const [formErrorState, setFormErrorState] = useState<FormErrors>({
		urlParams: {},
		bodyParams: {},
		queryParams: {},
	})

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isDirty, setIsDirty] = useState<boolean>(false)

	const resetForm = () => {
		setIsLoading(false)
		setIsDirty(false)
		setFormFieldState({
			...args.formFields,
		})
		clearFormErrors()
	}

	const parseValueToRealType = <DataT extends {} = {}>(
		dataType: DataT,
		fieldName: keyof DataT,
		fieldVal: DataT[keyof DataT] | string,
	) => {
		const currentVal = dataType[fieldName]
		if (typeof currentVal === "number") {
			const parsedValue = Number.parseFloat(fieldVal as string)
			if (Number.isNaN(parsedValue) || !Number.isFinite(parsedValue)) {
				return currentVal as DataT[keyof DataT]
			}
			return currentVal as DataT[keyof DataT]
		} else if (typeof currentVal === "string") {
			return fieldVal as DataT[keyof DataT]
		} else if (typeof currentVal === "boolean") {
			return !!fieldVal as DataT[keyof DataT]
		} else {
			return fieldVal as DataT[keyof DataT]
		}
	}

	const clearFormErrors: UseRequestFormRet["clearFormErrors"] = () => {
		setFormErrorState({
			urlParams: {},
			bodyParams: {},
			queryParams: {},
		})
	}

	const setFieldError: SetFieldErrorFunction<ParamT, BodyT, QueryT> = (
		fieldName,
		paramType,
		fieldErrors,
	) => {
		if (paramType === "URL") {
			setFormErrorState((prevState) => {
				return {
					...prevState,
					urlParams: {
						...prevState.urlParams,
						[fieldName]: fieldErrors,
					},
				}
			})
		} else if (paramType === "BODY") {
			setFormErrorState((prevState) => {
				return {
					...prevState,
					bodyParams: {
						...prevState.bodyParams,
						[fieldName]: fieldErrors,
					},
				}
			})
		} else {
			setFormErrorState((prevState) => {
				return {
					...prevState,
					queryParams: {
						...prevState.queryParams,
						[fieldName]: fieldErrors,
					},
				}
			})
		}
	}

	const clearFieldError: ClearFieldErrorFunction<ParamT, BodyT, QueryT> = (
		fieldName,
		paramType,
	) => {
		if (paramType === "URL") {
			setFieldError(fieldName as keyof ParamT, "URL", [])
		} else if (paramType === "BODY") {
			setFieldError(fieldName as keyof BodyT, "BODY", [])
		} else {
			setFieldError(fieldName as keyof QueryT, "QUERY", [])
		}
	}

	const hasError = Object.values(formErrorState).some((errFields) => {
		const fieldErrors = Object.values(errFields) as FieldError[][]
		return fieldErrors.some((fieldError) => {
			return fieldError.length > 0
		})
	})

	const setFields: SetFieldsFunction<ParamT, BodyT, QueryT> = (
		partialFields,
	) => {
		setFormFieldState((prevState) => {
			return {
				urlParams: {
					...prevState.urlParams,
					...(partialFields.urlParams || {}),
				},
				bodyParams: {
					...prevState.bodyParams,
					...(partialFields.bodyParams || {}),
				},
				queryParams: {
					...prevState.queryParams,
					...(partialFields.queryParams || {}),
				},
			}
		})
	}

	// useEffect(() => {
	// 	console.log(formFieldState)
	// }, [formFieldState])

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	const registerField: RegisterFieldFunction<ParamT, BodyT, QueryT> = (
		fieldName,
		paramType,
	) => {
		if (paramType === "URL") {
			return {
				name: fieldName as string,
				value: formFieldState.urlParams[fieldName as keyof ParamT],
				onChange: (e) => {
					setFormFieldState((prevState) => {
						const newValue = parseValueToRealType(
							prevState.urlParams,
							fieldName as keyof ParamT,
							e.target.value,
						)
						if (
							prevState.urlParams[fieldName as keyof ParamT] !==
							newValue
						) {
							setIsDirty((wasDirty) => {
								return true
							})
						}

						return {
							...prevState,
							urlParams: {
								...formFieldState.urlParams,
								[fieldName]: newValue,
							},
						}
					})
				},
			}
		} else if (paramType === "BODY") {
			return {
				name: fieldName,
				value: formFieldState.bodyParams[fieldName as keyof BodyT],
				onChange: (e) => {
					setFormFieldState((prevState) => {
						const newValue = parseValueToRealType(
							prevState.bodyParams,
							fieldName as keyof BodyT,
							e.target.value,
						)
						if (
							prevState.bodyParams[fieldName as keyof BodyT] !==
							newValue
						) {
							setIsDirty((wasDirty) => {
								return true
							})
						}

						return {
							...prevState,
							bodyParams: {
								...formFieldState.bodyParams,
								[fieldName]: newValue,
							},
						}
					})
				},
			}
		} else {
			return {
				name: fieldName as string,
				value: formFieldState.queryParams[fieldName as keyof QueryT],
				onChange: (e) => {
					setFormFieldState((prevState) => {
						const newValue = parseValueToRealType(
							prevState.queryParams,
							fieldName as keyof QueryT,
							e.target.value,
						)
						if (
							prevState.queryParams[fieldName as keyof QueryT] !==
							newValue
						) {
							setIsDirty((wasDirty) => {
								return true
							})
						}

						return {
							...prevState,
							queryParams: {
								...formFieldState.queryParams,
								[fieldName]: newValue,
							},
						}
					})
				},
			}
		}
	}

	const submitForm: UseRequestFormRet["submitForm"] = async (
		overrideValues = {},
	) => {
		setIsLoading(true)
		setIsDirty(false)
		clearFormErrors()

		const urlParams = {
			...formFieldState.urlParams,
			...overrideValues.urlParams,
		}
		const bodyParams = {
			...formFieldState.bodyParams,
			...overrideValues.bodyParams,
		}
		const queryParams = {
			...formFieldState.queryParams,
			...overrideValues.queryParams,
		}

		let finalArgs: MakeAPIRequestArgs<ParamT, BodyT, QueryT> = {
			requestUrl: args.requestUrl,
			requestMethod: args.requestMethod,
			customHeaders: args.customHeaders,
			urlParams: urlParams,
			bodyParams: bodyParams,
			queryParams: queryParams,
		}

		if (args.beforeRequest) {
			finalArgs = await args.beforeRequest(finalArgs)
		}

		const apiRequestRet = await makeAPIRequest<
			DataT,
			ParamT,
			BodyT,
			QueryT
		>(finalArgs)

		// Global error handling
		if (apiRequestRet.hasError) {
			responseHandlers.onError?.(apiRequestRet.errorData)
			setIsLoading(false)
			return
		}

		const { statusCode, responseData } = apiRequestRet
		const responseStatus = responseData?.responseStatus

		switch (statusCode) {
			case StatusCodes.NOT_FOUND:
				responseHandlers.onNotFound?.()
				break
			case StatusCodes.INTERNAL_ERROR:
				responseHandlers.onInternalError?.()
				break
			case StatusCodes.METHOD_NOT_ALLOWED:
				responseHandlers.onMethodNotAllowed?.()
				break
			case StatusCodes.OK:
				if (responseStatus === "SUCCESS") {
					responseHandlers.onSuccess?.(responseData)
				}
				break
			case StatusCodes.BAD_REQUEST:
				if (responseData?.responseStatus === "ERR_INVALID_PARAMS") {
					const { invalidParams } = responseData

					responseHandlers.onInvalidParams?.(invalidParams)

					const newFormErrors: FormErrors<ParamT, BodyT, QueryT> = {
						bodyParams: {},
						queryParams: {},
						urlParams: {},
					}

					const processInvalidParams = (
						invalidParams: any[],
						paramType: keyof FormErrors<ParamT, BodyT, QueryT>,
					) => {
						invalidParams.forEach((invalidParam) => {
							const { paramName, errorCode, errorArgs } =
								invalidParam
							const prevErrors = (newFormErrors[paramType][
								paramName as keyof (typeof newFormErrors)[typeof paramType]
							] || []) satisfies FieldError[]

							newFormErrors[paramType][
								paramName as keyof (typeof newFormErrors)[typeof paramType]
							] = [...prevErrors, { errorCode, errorArgs }]
						})
					}

					processInvalidParams(
						invalidParams.filter(
							(ip: { paramType: string }) =>
								ip.paramType === "URL",
						),
						"urlParams",
					)
					processInvalidParams(
						invalidParams.filter(
							(ip: { paramType: string }) =>
								ip.paramType === "BODY",
						),
						"bodyParams",
					)
					processInvalidParams(
						invalidParams.filter(
							(ip: { paramType: string }) =>
								ip.paramType === "QUERY",
						),
						"queryParams",
					)

					setFormErrorState(newFormErrors)
				}
				break
		}

		setIsLoading(false)
	}

	const generateSubmitHandler: UseRequestFormRet["generateSubmitHandler"] = (
		partialOverride = {},
	) => {
		return (ev) => {
			ev.preventDefault()
			ev.stopPropagation()
			submitForm(partialOverride)
		}
	}

	useEffect(() => {
		if (isDirty) {
			window.addEventListener("beforeunload", beforeUnloadListener)
		} else {
			window.removeEventListener("beforeunload", beforeUnloadListener)
		}
	}, [isDirty])

	return {
		formValues: formFieldState,
		formErrors: formErrorState,
		hasError: hasError,
		isDirty: isDirty,
		isLoading: isLoading,
		registerField: registerField,
		setFields: setFields,
		resetForm: resetForm,
		clearFormErrors: clearFormErrors,
		clearFieldError: clearFieldError,
		setFieldError: setFieldError,
		setDirty: setIsDirty,
		setLoading: setIsLoading,
		submitForm: submitForm,
		generateSubmitHandler: generateSubmitHandler,
	}
}
