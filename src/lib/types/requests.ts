export type TGetParserProjectsParams = {
	parser: string
}
export type TGetParserProjectsResponse = {
	supportedProjects: string[]
}
export type TGetParsersResponse = {
	supportedParsers: string[]
}
export type TGetProjectModulesParams = TGetParserProjectsParams & {
	project: string
}
export type ModuleNode = {
	modulePath: string
	moduleSourceCode: string
}
export type TGetProjectModulesResponse = {
	moduleNodes: ModuleNode[]
}

export type SymbolNode = {
	symbolIdentifier: string
	symbolPath: string
	symbolSourceCode: string
	symbolType: string
}

export type TGetProjecSymbolsResponse = {
	symbolNodes: SymbolNode[]
}

export type TGetModuleSummaryQueryParams = {
	module: string
}

export type TGetSymbolSummaryQueryParams = {
	path: string
	identifier: string
}

export enum ENode {
	MODULE = "module",
	SYMBOL = "symbol",
}

export type TGetSummaryResponse = {
	summaryId: string
	summaryTimestamp: string
	summaryPlain: string
	summaryContext: string
	summaryProject: string
	summarySource: string
	summaryType: string
}

export type TNode =
	| {
			nodeType: ENode.MODULE
			nodeData: ModuleNode
	  }
	| {
			nodeType: ENode.SYMBOL
			nodeData: SymbolNode
	  }

export type TPostPreferenceBody = {
	preferenceType: string
	evalId: string
}

export enum ESummaryType {
	CONTEXT = "Context",
	PLAIN = "Plain",
}
