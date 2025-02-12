import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useEffect } from "react"
import { useRemark } from "react-remark"

const Remark = ({ markdown }: { markdown: string }) => {
	const [reactContent, setMarkdownSource] = useRemark()

	useEffect(() => {
		setMarkdownSource(markdown)
	}, [markdown, setMarkdownSource])

	return (
		<ScrollArea className="overflow-x-auto">
			{reactContent}
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	)
}

export default Remark
