import "@/app/globals.css"
import Navbar from "@/components/common/navbar"
import { Toaster } from "@/components/ui/sonner"
import QueryProviderWrapper from "@/components/wrappers/query-provider"
import { ThemeProvider } from "@/components/wrappers/theme-provider"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"

const font = DM_Sans({
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Engraph Eval",
	description: "Create documentation for your code.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html suppressHydrationWarning lang="en">
			<body className={`${font.className} min-h-svh antialiased`}>
				<QueryProviderWrapper>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						<main>
							<Navbar />
							{children}
						</main>
						<Toaster />
					</ThemeProvider>
				</QueryProviderWrapper>
			</body>
		</html>
	)
}
