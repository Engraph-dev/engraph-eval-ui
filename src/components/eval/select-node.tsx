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
import useEvalContext from "@/lib/context/eval"
import { ENode, TNode } from "@/lib/types/requests"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"

function areEqual(node1: TNode, node2: TNode) {
	if (node1.nodeType === ENode.MODULE && node2.nodeType === ENode.MODULE) {
		return node1.nodeData.modulePath === node2.nodeData.modulePath
	} else if (
		node1.nodeType === ENode.SYMBOL &&
		node2.nodeType === ENode.SYMBOL
	) {
		return (
			node1.nodeData.symbolIdentifier === node2.nodeData.symbolIdentifier
		)
	}
	return false
}

function getLabel(node: TNode) {
	if (node.nodeType === ENode.MODULE) {
		return node.nodeData.modulePath
	} else if (node.nodeType === ENode.SYMBOL) {
		return node.nodeData.symbolIdentifier
	}
	return ""
}

export function SelectNode() {
	const [open, setOpen] = React.useState(false)

	const { nodes, selectedNode, setSelectedNode } = useEvalContext()

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

	if (!nodes || !items) return null
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{currentItem
						? getLabel(currentItem)
						: "Select framework..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput
						placeholder="Search framework..."
						className="h-9"
					/>
					<CommandList>
						<CommandEmpty>No framework found.</CommandEmpty>
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
