"use client"

import { Button } from "@/components/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import useEvalContext from "@/lib/context/eval"
import { areEqual, getLabel } from "@/lib/helpers/common"
import { ENode, TNode } from "@/lib/types/requests"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"

export function SelectNode() {
	const [open, setOpen] = React.useState(false)

	const { nodes, selectedNode, setSelectedNode, selectedProject } =
		useEvalContext()

	const items: TNode[] = React.useMemo(
		() => [
			...((nodes?.moduleNodes.map((node) => ({
				nodeData: node,
				nodeType: ENode.MODULE,
			})) || []) as TNode[]),
			...((nodes?.symbolNodes.map((node) => ({
				nodeData: node,
				nodeType: ENode.SYMBOL,
			})) || []) as TNode[]),
		],
		[nodes],
	)

	const currentItem = React.useMemo(
		() =>
			selectedNode && items.find((item) => areEqual(item, selectedNode)),
		[items, selectedNode],
	)

	if (!selectedProject) {
		return null
	}

	if (!nodes || !items) {
		return <Skeleton className="h-9 w-full rounded-lg" />
	}
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					{currentItem
						? getLabel(currentItem)
						: "Select Module or Symbol..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className="w-[80svw] p-0">
				<Command>
					<CommandInput
						placeholder="Search Module or Symbol..."
						className="h-9"
					/>
					<CommandList>
						<CommandEmpty>No Module or Symbol found.</CommandEmpty>
						<CommandGroup>
							{items.map((item, idx) => (
								<CommandItem
									key={idx}
									value={getLabel(item)}
									onSelect={() => {
										setSelectedNode(item)
										setOpen(false)
									}}
								>
									{getLabel(item)}
									<Check
										className={cn(
											"ml-auto",
											selectedNode &&
												getLabel(item) ===
													getLabel(selectedNode)
												? "opacity-100"
												: "opacity-0",
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
