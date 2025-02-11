"use client"

import {
	ModuleNode,
	SymbolNode,
	TGetParsersResponse,
} from "@/lib/types/requests"
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
	setSelectedModule: Dispatch<SetStateAction<ModuleNode | undefined>>
	setSelectedParser: Dispatch<SetStateAction<string>>
	setSelectedProject: Dispatch<SetStateAction<string | undefined>>
	setSelectedSymbol: Dispatch<SetStateAction<SymbolNode | undefined>>
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
	const [selectedModule, setSelectedModule] = useState<ModuleNode>()
	const [selectedSymbol, setSelectedSymbol] = useState<SymbolNode>()

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
