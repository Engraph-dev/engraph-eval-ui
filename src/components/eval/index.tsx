import Response from "@/components/eval/response"
import { SelectParser } from "@/components/eval/select-parser"
import { SelectProject } from "@/components/eval/select-project"
import { SelectProjectModule } from "@/components/eval/select-project-module"
import { SelectProjectSymbol } from "@/components/eval/select-project-symbol"
import React from "react"

export default function EvalPage() {
	return (
		<div className="container mx-auto px-6 py-6 md:py-12">
			<h1 className="mb-6 text-4xl font-semibold">
				Evaluation of results
			</h1>
			<div className="space-y-4">
				<div className="flex gap-4">
					<SelectParser />
					<SelectProject />
				</div>
				<div className="flex items-center gap-4">
					<SelectProjectModule />
					<SelectProjectSymbol />
				</div>
				<Response />
			</div>
		</div>
	)
}
