"use client"

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

export function SelectProjectModule() {
	const { setSelectedModule, selectedModule, nodes } = useEvalContext()

	const moduleNodes = nodes?.moduleNodes

	if (!moduleNodes) {
		return null
	}
	return (
		<Select
			value={selectedModule?.modulePath}
			onValueChange={(val) =>
				setSelectedModule(
					moduleNodes.find((node) => node.modulePath === val),
				)
			}
		>
			<SelectTrigger>
				<SelectValue placeholder="Select a Module" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Modules</SelectLabel>
					{moduleNodes.map((moduleNode, idx) => (
						<SelectItem key={idx} value={moduleNode.modulePath}>
							{moduleNode.modulePath}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
