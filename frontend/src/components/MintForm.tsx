import React from "react"
import { useInitializedContext } from "../context"
import { useColorTokens } from "../hooks/useColorTokens"

export function MintForm() {
	const [color, setColor] = React.useState<string>()

	const { fetchColors } = useColorTokens()

	const { contract, accounts } = useInitializedContext()
	const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault()

		if (!color) {
			window.alert("Please specify a color to mint")
			return
		}

		if (!window.confirm(`Are you willing to mint color ${color}?`)) {
			return
		}

		contract.methods
			.mint(color)
			.send({ from: accounts[0] })
			.once("receipt", () => {
				setColor("")
				fetchColors()
			})
	}
	return (
		<>
			<h1 className="text-4xl mt-8">Mint new NFT</h1>
			<form onSubmit={handleFormSubmit} className="mt-4 flex space-x-2 items-center">
				<label htmlFor="color">Select a color:</label>
				<input
					type="color"
					id="color"
					name="color"
					value={color}
					onChange={(event) => setColor(event.target.value)}
				/>
				<p>{color || "None"}</p>
				<button type="submit" className="border border-black px-2 py-1">
					Mint
				</button>
			</form>
		</>
	)
}
