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
import useEvalContext from "@/lib/context/eval"
import * as React from "react"

export function SelectProjectSymbol() {
	const { setSelectedSymbol, selectedSymbol, nodes } = useEvalContext()

	const symbolNodes = nodes?.symbolNodes

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
