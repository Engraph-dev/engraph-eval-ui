import NavLogo from "@/components/common/nav-logo"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/ux/mode-togggle"
import { HelpCircle } from "lucide-react"
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
						<Button variant="ghost" size="icon" className="h-8 w-8">
							<HelpCircle className="h-4 w-4" />
							<span className="sr-only">Help</span>
						</Button>
						<Button variant="ghost" size="sm">
							Docs
						</Button>
						{/* <Separator /> */}
						<ModeToggle />
					</div>
				</div>
			</header>
		</div>
	)
}
