import ErrorPage from "@/components/common/error"
import EvalPage from "@/components/eval"
import { getSupportedParsers } from "@/lib/actions/api"
import { EvalContextProvider } from "@/lib/context/eval"

export default async function Home() {
	const { responseData } = await getSupportedParsers()
	if (!responseData) {
		return <ErrorPage />
	}
	return (
		<EvalContextProvider parsers={responseData}>
			<EvalPage />
		</EvalContextProvider>
	)
}
