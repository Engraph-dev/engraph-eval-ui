import { ErrorCode } from "@/lib/types/error"

export type ReqMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

export const StatusCodes = {
	OK: 200,
	TEMPORARY_REDIRECT: 307,
	PERMANENT_REDIRECT: 308,
	BAD_REQUEST: 400,
	UNAUTHENTICATED: 401,
	UNAUTHORIZED: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	TEAPOT: 418,
	RATE_LIMIT: 429,
	INTERNAL_ERROR: 500,
} as const

export type StatusCode = (typeof StatusCodes)[keyof typeof StatusCodes]

export type InvalidParam<
	ParamT extends {} = {},
	BodyT extends {} = {},
	QueryT extends {} = {},
> = (
	| {
			paramType: "URL"
			paramName: keyof ParamT
	  }
	| {
			paramType: "BODY"
			paramName: keyof BodyT
	  }
	| {
			paramType: "QUERY"
			paramName: keyof QueryT
	  }
) & {
	errorCode: ErrorCode
	errorArgs: any
}

export type ParamType = InvalidParam["paramType"]

export type ResJSON<
	DataT extends {} = {},
	ParamT extends {} = {},
	BodyT extends {} = {},
	QueryT extends {} = {},
> =
	| ({
			responseStatus: "SUCCESS"
	  } & DataT)
	| {
			responseStatus: "ERR_INVALID_PARAMS"
			invalidParams: InvalidParam<ParamT, BodyT, QueryT>[]
	  }
	| {
			responseStatus: "ERR_UNAUTHENTICATED"
	  }
	| {
			responseStatus: "ERR_RESTRICTED_ENDPOINT"
	  }
	| {
			responseStatus: "ERR_UNVERIFIED"
	  }
	| {
			responseStatus: "ERR_UNAUTHORIZED"
	  }
	| {
			responseStatus: "ERR_NOT_FOUND"
	  }
	| {
			responseStatus: "ERR_INTERNAL_ERROR"
	  }
	| {
			responseStatus: "ERR_RATE_LIMIT"
	  }
	| {
			responseStatus: "ERR_METHOD_NOT_ALLOWED"
	  }
	| {
			responseStatus: "ERR_TEAPOT"
	  }

export type ResponseStatus = ResJSON["responseStatus"]

export type HeartbeatCheckResponse = {
	heartbeatTimestamp: string
}

export type NoParams = {}

export type MakeOptional<T> = {
	[key in keyof T]: T[key] | undefined
}

export type PagedQuery = MakeOptional<{
	searchPage: number
	pageSize: number
}>

export type ExtendPagedQuery<T extends {} = {}> = T & PagedQuery
