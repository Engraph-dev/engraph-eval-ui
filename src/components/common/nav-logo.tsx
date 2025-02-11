import { cn } from "@/lib/utils"
import Link from "next/link"
import React, { HTMLAttributes } from "react"

export default function NavLogo(props: HTMLAttributes<HTMLAnchorElement>) {
	return (
		<Link href="/" {...props} className={cn(props.className)}>
			<img
				src="/landing/logo.png"
				alt="engraph logo"
				className="size-6"
			/>
		</Link>
	)
}
