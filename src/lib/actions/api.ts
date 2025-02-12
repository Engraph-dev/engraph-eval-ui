"use server"

import { makeAPIRequest } from "@/lib/api/helper"
import { NoParams } from "@/lib/types/api"
import {
	TGetModuleSummaryQueryParams,
	TGetParserProjectsParams,
	TGetParserProjectsResponse,
	TGetParsersResponse,
	TGetProjecSymbolsResponse,
	TGetProjectModulesParams,
	TGetProjectModulesResponse,
	TGetSummaryResponse,
	TGetSymbolSummaryQueryParams,
	TPostPreferenceBody,
} from "@/lib/types/requests"

export async function getSupportedParsers() {
	const resp = await makeAPIRequest<TGetParsersResponse>({
		requestMethod: "GET",
		requestUrl: "/parsers",
		bodyParams: {},
		urlParams: {},
		queryParams: {},
	})

	return resp
}

export async function getSupportedParsersProjects(
	parser: string = "typescript",
) {
	const resp = await makeAPIRequest<
		TGetParserProjectsResponse,
		TGetParserProjectsParams
	>({
		requestMethod: "GET",
		requestUrl: "/parsers/:parser/projects",
		bodyParams: {},
		urlParams: { parser },
		queryParams: {},
	})

	return resp
}

export async function getProjectModules(
	parser: string = "typescript",
	project: string,
) {
	const resp = await makeAPIRequest<
		TGetProjectModulesResponse,
		TGetProjectModulesParams
	>({
		requestMethod: "GET",
		requestUrl: "/parsers/:parser/projects/:project/modules",
		bodyParams: {},
		urlParams: { parser, project },
		queryParams: {},
	})

	return resp
}

export async function getProjectSymbols(
	parser: string = "typescript",
	project: string,
) {
	const resp = await makeAPIRequest<
		TGetProjecSymbolsResponse,
		TGetProjectModulesParams
	>({
		requestMethod: "GET",
		requestUrl: "/parsers/:parser/projects/:project/symbols",
		bodyParams: {},
		urlParams: { parser, project },
		queryParams: {},
	})

	return resp
}

export async function getProjectModuleSummary(
	parser: string = "typescript",
	project: string,
	module: string,
) {
	const resp = await makeAPIRequest<
		TGetSummaryResponse,
		TGetProjectModulesParams,
		NoParams,
		TGetModuleSummaryQueryParams
	>({
		requestMethod: "GET",
		requestUrl: "/parsers/:parser/projects/:project/modules/eval",
		bodyParams: {},
		urlParams: { parser, project },
		queryParams: { module },
	})

	return resp
}

export async function getProjectSymbolSummary(
	parser: string = "typescript",
	project: string,
	identifier: string,
	path: string,
) {
	const resp = await makeAPIRequest<
		TGetSummaryResponse,
		TGetProjectModulesParams,
		NoParams,
		TGetSymbolSummaryQueryParams
	>({
		requestMethod: "GET",
		requestUrl: "/parsers/:parser/projects/:project/modules/eval",
		bodyParams: {},
		urlParams: { parser, project },
		queryParams: { identifier, path },
	})

	return resp
}

export async function postPreference(evalId: string, preferenceType: string) {
	const resp = await makeAPIRequest<NoParams, NoParams, TPostPreferenceBody>({
		requestMethod: "POST",
		requestUrl: "/prefs",
		bodyParams: { evalId, preferenceType },
		urlParams: {},
		queryParams: {},
	})

	return resp
}
