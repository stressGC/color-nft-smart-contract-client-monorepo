import { useColorTokens } from "../hooks/useColorTokens"

export function ColorTokenList() {
	const { colors } = useColorTokens()
	console.log(colors)

	if (!Array.isArray(colors)) {
		return <p>Loading colors...</p>
	}

	return (
		<>
			<h1 className="text-4xl mt-8">Collection</h1>
			<div className="flex w-full items-center mt-8 space-x-4">
				{colors.map((color) => {
					return (
						<div className="w-24 h-24 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: color }}>
							{color}
						</div>
					)
				})}
			</div></>
	)
}