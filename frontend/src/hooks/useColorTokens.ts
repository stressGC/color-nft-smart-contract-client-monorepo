import React from "react"
import { useInterval, useMount } from "react-use"
import { useInitializedContext } from "../context"

export function useColorTokens() {
	const { contract } = useInitializedContext()
	const [colors, setColors] = React.useState<string[] | null>(null)

	const fetchColors = React.useCallback(async () => {
		const totalSupply = await contract.methods.totalSupply().call()
		const firstcolor = await contract.methods.colors(0).call()
		console.log(firstcolor)
		const getColorPromises = [...new Array(Number(totalSupply)).keys()].map((index) =>
			contract.methods.colors(index).call(),
		)
		const colors = await Promise.all(getColorPromises)
		console.log(colors)
		setColors(colors)
	}, [contract.methods])

	useMount(fetchColors)

	useInterval(fetchColors, 30 * 1000)

	return { colors, fetchColors }
}
