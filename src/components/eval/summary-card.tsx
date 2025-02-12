import { Button, ButtonProps } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Remark from "@/components/ux/remark"
import { cn } from "@/lib/utils"
import { ThumbsUp } from "lucide-react"
import React from "react"

export default function SummaryCard({
	markdown,
	parentClassName,
	...props
}: { markdown: string; parentClassName?: string } & ButtonProps) {
	return (
		<Card
			className={cn(
				"group relative cursor-pointer rounded-lg p-4 transition-all hover:bg-foreground hover:text-background",
				parentClassName,
			)}
		>
			<Button
				variant="outline"
				{...props}
				className={cn(
					"absolute -top-2 right-5 size-10 -translate-y-full rounded-full text-foreground",
					props.className,
				)}
			>
				<ThumbsUp />
			</Button>
			<Remark markdown={markdown} />
		</Card>
	)
}
