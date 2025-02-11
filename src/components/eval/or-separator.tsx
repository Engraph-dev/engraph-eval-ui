import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import React, { HTMLAttributes } from "react"

export default function OrSeparator(props: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...props}
			className={cn(
				"flex flex-col items-center justify-center gap-1",
				props.className,
			)}
		>
			<Separator orientation="vertical" className="h-2" />
			OR
			<Separator orientation="vertical" className="h-2" />
		</div>
	)
}
