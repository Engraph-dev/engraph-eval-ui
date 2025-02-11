import React from "react"

export default function ErrorPage({
	text = "Some Error Occured",
}: {
	text?: string
}) {
	return (
		<div className="flex h-full min-h-[80svh] items-center justify-center p-6 text-center">
			<h1 className="text-6xl font-bold">{text}</h1>
		</div>
	)
}
