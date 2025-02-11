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

export function SelectParser() {
	const { parsers, setSelectedParser, selectedParser } = useEvalContext()
	return (
		<Select value={selectedParser} onValueChange={setSelectedParser}>
			<SelectTrigger>
				<SelectValue placeholder="Select a Parser" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Parsers</SelectLabel>
					{parsers.map((parser, idx) => (
						<SelectItem key={idx} value={parser}>
							{parser}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
