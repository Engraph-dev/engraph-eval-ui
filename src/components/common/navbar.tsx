import NavLogo from "@/components/common/nav-logo"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/ux/mode-togggle"
import { cn } from "@/lib/utils"
import { HelpCircle } from "lucide-react"
import Link from "next/link"
import * as React from "react"

export default function Navbar() {
	return (
		<div className="bg-foreground/5 backdrop-blur-md">
			<header className="z-50 w-full">
				<div className="flex h-14 items-center justify-between px-4 md:px-6">
					<div className="flex items-center gap-4">
						<NavLogo />
						<Separator orientation="vertical" className="h-6" />
						<h1 className="text-sm font-bold">Engraph.dev</h1>
					</div>
					<div className="hidden items-center gap-4 lg:flex">
						<Link
							href="https://engraph.dev/"
							target="_blank"
							className={cn(
								"h-8 w-8",
								buttonVariants({
									variant: "ghost",
									size: "icon",
								}),
							)}
						>
							<HelpCircle className="h-4 w-4" />
							<span className="sr-only">Help</span>
						</Link>
						<Link
							href="https://engraph.dev/"
							target="_blank"
							className={buttonVariants({
								variant: "ghost",
								size: "sm",
							})}
						>
							Docs
						</Link>
						<ModeToggle />
					</div>
				</div>
			</header>
		</div>
	)
}
