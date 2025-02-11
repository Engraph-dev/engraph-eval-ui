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
import { getProjectModules } from "@/lib/actions/api"
import useEvalContext from "@/lib/context/eval"
import { useQuery } from "@tanstack/react-query"
import * as React from "react"

export function SelectProjectModule() {
	const {
		selectedProject,
		selectedParser,
		setSelectedModule,
		selectedModule,
	} = useEvalContext()

	const { data } = useQuery({
		queryKey: ["project-modules", selectedProject, selectedParser],
		queryFn: async () =>
			await getProjectModules(selectedParser, selectedProject || ""),
		enabled: !!selectedProject && !!selectedParser,
	})

	const moduleNodes = data?.responseData?.moduleNodes

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
