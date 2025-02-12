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
import { Skeleton } from "@/components/ui/skeleton"
import { getSupportedParsersProjects } from "@/lib/actions/api"
import useEvalContext from "@/lib/context/eval"
import { useQuery } from "@tanstack/react-query"
import * as React from "react"

export function SelectProject() {
	const { selectedParser, setSelectedProject, selectedProject } =
		useEvalContext()

	const { data } = useQuery({
		queryKey: ["projects", selectedParser],
		queryFn: async () => await getSupportedParsersProjects(selectedParser),
		enabled: !!selectedParser,
	})

	const projects = data?.responseData?.supportedProjects

	if (!selectedParser) {
		return null
	}

	if (!projects) {
		return <Skeleton className="h-9 w-full rounded-lg" />
	}
	return (
		<Select value={selectedProject} onValueChange={setSelectedProject}>
			<SelectTrigger>
				<SelectValue placeholder="Select a Project" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Projects</SelectLabel>
					{projects.map((project, idx) => (
						<SelectItem key={idx} value={project}>
							{project}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
