import { useEffect } from "react"
import { useRemark } from "react-remark"

const Remark = ({ markdown }: { markdown: string }) => {
	const [reactContent, setMarkdownSource] = useRemark()

	useEffect(() => {
		setMarkdownSource(markdown)
	}, [markdown, setMarkdownSource])

	return reactContent
}

export default Remark
