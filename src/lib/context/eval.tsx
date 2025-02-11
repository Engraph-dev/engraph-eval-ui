"use client"

import { getProjectModules, getProjectSymbols } from "@/lib/actions/api"
import {
	ModuleNode,
	SymbolNode,
	TGetParsersResponse,
	TNode,
} from "@/lib/types/requests"
import { useQuery } from "@tanstack/react-query"
import {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react"

export type EvalContextType = {
	parsers: string[]
	selectedModule: ModuleNode | undefined
	selectedParser: string
	selectedProject: string | undefined
	selectedSymbol: SymbolNode | undefined
	selectedNode: TNode | undefined
	setSelectedModule: Dispatch<SetStateAction<ModuleNode | undefined>>
	setSelectedParser: Dispatch<SetStateAction<string>>
	setSelectedProject: Dispatch<SetStateAction<string | undefined>>
	setSelectedSymbol: Dispatch<SetStateAction<SymbolNode | undefined>>
	setSelectedNode: Dispatch<SetStateAction<TNode | undefined>>
	nodes:
		| {
				moduleNodes: ModuleNode[]
				symbolNodes: SymbolNode[]
		  }
		| undefined
}

export const EvalContext = createContext<EvalContextType | null>(null)

export function EvalContextProvider({
	children,
	parsers: { supportedParsers: parsers },
}: {
	children: React.ReactNode
	parsers: TGetParsersResponse
}) {
	const [selectedParser, setSelectedParser] = useState<string>(parsers[0])
	const [selectedProject, setSelectedProject] = useState<string>()
	const [selectedNode, setSelectedNode] = useState<TNode>()
	const [selectedModule, setSelectedModule] = useState<ModuleNode>()
	const [selectedSymbol, setSelectedSymbol] = useState<SymbolNode>()

	const { data: nodes } = useQuery({
		queryKey: ["project-modules", selectedProject, selectedParser],
		queryFn: async () => {
			const moduleDataPromise = getProjectModules(
				selectedParser,
				selectedProject || "",
			)
			const symbolDataPromise = await getProjectSymbols(
				selectedParser,
				selectedProject || "",
			)
			const [modules, symbols] = await Promise.all([
				moduleDataPromise,
				symbolDataPromise,
			])
			return {
				moduleNodes: modules.responseData?.moduleNodes || [],
				symbolNodes: symbols.responseData?.symbolNodes || [],
			}
		},
		enabled: !!selectedProject && !!selectedParser,
	})

	const value = {
		parsers,
		selectedModule,
		selectedParser,
		selectedProject,
		selectedSymbol,
		setSelectedModule,
		setSelectedParser,
		setSelectedProject,
		setSelectedSymbol,
		nodes,
		selectedNode,
		setSelectedNode,
	}
	return <EvalContext.Provider value={value}>{children}</EvalContext.Provider>
}

export default function useEvalContext() {
	const context = useContext(EvalContext)
	if (!context) {
		throw new Error(
			"useEvalContext must be used within a EvalContextProvider",
		)
	}
	return context
}
