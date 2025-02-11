"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"

export default function QueryProviderWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnMount: false,
				refetchOnWindowFocus: false,
				staleTime: 1000 * 60 * 5, // 5 minutes
				retry: false,
			},
		},
	})
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	)
}
