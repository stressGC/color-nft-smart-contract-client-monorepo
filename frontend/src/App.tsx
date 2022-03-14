import React from "react"
import { useMount } from "react-use"
import Web3 from "web3"
import { Header } from "./components/Header"
import { AppContext, IAppContext } from "./context"
import ColorContractCompiled from "./contracts/Color.json"
import { ColorTokenList } from "./components/ColorTokenList"
import type { Color } from "../types/contracts/Color"
import type { AbiItem } from "web3-utils"
import { MintForm } from "./components/MintForm"


export function App() {
	const [context, setContext] = React.useState<Required<IAppContext> | null>(null)

	useMount(async () => {
		const provider = window.ethereum ?? window.web3?.currentProvider

		const web3 = new Web3(provider)
		await window.ethereum.enable()

		const accounts = await web3.eth.getAccounts()
		const networkId = await web3.eth.net.getId()
		// @ts-ignore TODO: should be removed
		const deploymentAddress = ColorContractCompiled.networks[networkId].address

		const contract = new web3.eth.Contract(ColorContractCompiled.abi as AbiItem[], deploymentAddress) as unknown as Color;

		// TODO: provider is any and could be nullish
		const initializedContext: Required<IAppContext> = {
			web3,
			accounts,
			contract,
		}
		setContext(initializedContext)
	})

	if (!context) {
		return <p>Loading...</p>
	}

	return (
		<AppContext.Provider value={context}>
			<div className="">
				<Header />
				<main className="max-w-[1140px] mx-auto">
					<ColorTokenList />
					<MintForm />
				</main>
				<footer />
			</div>
		</AppContext.Provider>
	)
}
