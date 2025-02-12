"use client"

import SummaryCard from "@/components/eval/summary-card"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Remark from "@/components/ux/remark"
import {
	getProjectModuleSummary,
	getProjectSymbolSummary,
	postPreference,
} from "@/lib/actions/api"
import useEvalContext from "@/lib/context/eval"
import { getLabel, randomSort } from "@/lib/helpers/common"
import { ENode, ESummaryType } from "@/lib/types/requests"
import { useQuery } from "@tanstack/react-query"
import React, { useEffect, useMemo } from "react"

export default function Response() {
	const { selectedNode, selectedProject, selectedParser } = useEvalContext()
	const label = getLabel(selectedNode)
	const [selectedType, setSelectedType] = React.useState<ESummaryType>()
	const { data: summaryData, isLoading } = useQuery({
		queryKey: ["node-summary", selectedNode?.nodeType, label],
		queryFn: async () => {
			if (selectedNode?.nodeType === ENode.MODULE) {
				return await getProjectModuleSummary(
					selectedParser,
					selectedProject || "",
					selectedNode?.nodeData.modulePath || "",
				)
			}
			return await getProjectSymbolSummary(
				selectedParser,
				selectedProject || "",
				selectedNode?.nodeData.symbolIdentifier || "",
				selectedNode?.nodeData.symbolPath || "",
			)
		},
		enabled:
			!!selectedNode?.nodeData && !!selectedProject && !!selectedParser,
	})

	async function sendPreference(type: ESummaryType) {
		if (!summaryData?.responseData?.summaryId || selectedType) return
		setSelectedType(type)
		await postPreference(summaryData.responseData.summaryId, type)
	}

	useEffect(() => {
		setSelectedType(undefined)
	}, [selectedNode])

	const summaries = useMemo(
		() =>
			!summaryData?.responseData
				? []
				: randomSort([
						{
							data: summaryData.responseData.summaryContext,
							type: ESummaryType.CONTEXT,
						},
						{
							data: summaryData.responseData.summaryPlain,
							type: ESummaryType.PLAIN,
						},
					]),
		[summaryData],
	)

	if (!selectedNode) {
		return null
	}

	if (isLoading) {
		return (
			<div>
				<h4 className="pb-2">Loading summary of {label}... </h4>
				<Skeleton className="h-[60svh] w-full rounded-lg" />
			</div>
		)
	}

	if (!summaryData?.responseData) {
		return <div>Error occurred in loading summary of {label}...</div>
	}

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
			<h1 className="col-span-full text-2xl font-semibold">
				Source Code
			</h1>
			<Card className="col-span-full rounded-lg p-4">
				<Remark
					markdown={
						"```\n" +
						summaryData.responseData.summarySource +
						"\n```"
					}
				/>
			</Card>
			<h1 className="col-span-full text-2xl font-semibold">Summary</h1>
			{summaries.map((summary, idx) => (
				<SummaryCard
					key={idx}
					markdown={summary.data}
					disabled={!!selectedType}
					parentClassName={
						selectedType
							? selectedType === summary.type
								? "bg-foreground text-background"
								: "opacity-55"
							: ""
					}
					onClick={() => void sendPreference(summary.type)}
				/>
			))}
		</div>
	)
}
