"use client"

import { Card } from "@/components/ui/card"
import Remark from "@/components/ux/remark"
import {
	getProjectModuleSummary,
	getProjectSymbolSummary,
} from "@/lib/actions/api"
import useEvalContext from "@/lib/context/eval"
import { TGetSummaryResponse } from "@/lib/types/requests"
import { useQuery } from "@tanstack/react-query"
import { ThumbsUp } from "lucide-react"
import React, { useEffect, useState } from "react"

export default function Response() {
	const { selectedModule, selectedProject, selectedParser, selectedSymbol } =
		useEvalContext()
	const [latestSummary, setLatestSummary] = useState<TGetSummaryResponse>()

	const moduleQuery = useQuery({
		queryKey: ["summary", selectedModule?.modulePath],
		queryFn: async () =>
			await getProjectModuleSummary(
				selectedParser,
				selectedProject || "",
				selectedModule?.modulePath || "",
			),
		enabled:
			!!selectedModule?.modulePath &&
			!!selectedProject &&
			!!selectedParser,
	})

	const symbolQuery = useQuery({
		queryKey: [
			"summary",
			selectedSymbol?.symbolPath,
			selectedSymbol?.symbolIdentifier,
		],
		queryFn: async () =>
			await getProjectSymbolSummary(
				selectedParser,
				selectedProject || "",
				selectedSymbol?.symbolIdentifier || "",
				selectedSymbol?.symbolPath || "",
			),
		enabled:
			!!selectedSymbol?.symbolPath &&
			!!selectedProject &&
			!!selectedParser,
	})

	useEffect(() => {
		if (!moduleQuery.data?.responseData) return
		setLatestSummary(moduleQuery.data.responseData)
	}, [moduleQuery.data])

	useEffect(() => {
		if (!symbolQuery.data?.responseData) return
		setLatestSummary(symbolQuery.data.responseData)
	}, [symbolQuery.data])

	if (!latestSummary) {
		return null
	}
	return (
		<div className="grid grid-cols-2 gap-4">
			<h1 className="col-span-full text-2xl font-semibold">Summary</h1>
			<Card className="group peer relative rounded-lg p-4 transition-all hover:scale-[1.02] hover:bg-foreground hover:text-background peer-hover:scale-[0.98] peer-hover:opacity-55">
				<ThumbsUp className="pointer-events-none absolute -top-2 right-5 text-foreground opacity-0 transition-all group-hover:-translate-y-full group-hover:opacity-100" />
				<Remark markdown={latestSummary.summaryPlain} />
			</Card>
			<Card className="group peer relative rounded-lg p-4 transition-all hover:scale-[1.02] hover:bg-foreground hover:text-background peer-hover:scale-[0.98] peer-hover:opacity-55">
				<ThumbsUp className="pointer-events-none absolute -top-2 right-5 text-foreground opacity-0 transition-all group-hover:-translate-y-full group-hover:opacity-100" />
				<Remark markdown={latestSummary.summaryContext} />
			</Card>
			<Card className="col-span-full rounded-lg p-4">
				<h1 className="col-span-full pb-2 text-2xl font-semibold">
					Source Code
				</h1>
				<Remark markdown={latestSummary.summarySource} />
			</Card>
		</div>
	)
}
