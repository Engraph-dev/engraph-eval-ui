"use client"

import OrSeparator from "@/components/eval/or-separator"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { getProjectSymbols } from "@/lib/actions/api"
import useEvalContext from "@/lib/context/eval"
import { useQuery } from "@tanstack/react-query"
import * as React from "react"

export function SelectProjectSymbol() {
	const {
		selectedProject,
		selectedParser,
		setSelectedSymbol,
		selectedSymbol,
	} = useEvalContext()

	const { data } = useQuery({
		queryKey: ["project-symbols", selectedProject, selectedParser],
		queryFn: async () =>
			await getProjectSymbols(selectedParser, selectedProject || ""),
		enabled: !!selectedProject && !!selectedParser,
	})

	const symbolNodes = data?.responseData?.symbolNodes

	console.log({ data })

	if (!symbolNodes) {
		return null
	}
	return (
		<>
			<OrSeparator />
			<Select
				value={selectedSymbol?.symbolIdentifier}
				onValueChange={(val) =>
					setSelectedSymbol(
						symbolNodes.find(
							(node) => node.symbolIdentifier === val,
						),
					)
				}
			>
				<SelectTrigger>
					<SelectValue placeholder="Select a Symbol" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Symbols</SelectLabel>
						{symbolNodes.map((symbolNode, idx) => (
							<SelectItem
								key={idx}
								value={symbolNode.symbolIdentifier}
							>
								{symbolNode.symbolIdentifier}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</>
	)
}
