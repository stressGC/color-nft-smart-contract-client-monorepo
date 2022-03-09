import React from "react"
import { useMount } from "react-use"
import Web3 from "web3"
import { Header } from "./components/Header"
import { AppContext, IAppContext } from "./context"

export function App() {
	const [context, setContext] = React.useState<Required<IAppContext> | null>(null)

	useMount(async () => {
		const provider = window.ethereum ?? window.web3?.currentProvider

		const web3 = new Web3(provider)
		await window.ethereum.enable()

		const accounts = await web3.eth.getAccounts()
		const networkId = await web3.eth.net.getId()

		// TODO: provider is any and could be nullish
		const initializedContext: Required<IAppContext> = {
			web3,
			accounts,
			networkId,
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
				<main></main>
				<footer />
			</div>
		</AppContext.Provider>
	)
}
