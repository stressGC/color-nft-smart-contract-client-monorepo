import React from "react"
import Web3 from "web3"

export interface IAppContext {
	web3?: Web3
	accounts?: string[]
	networkId?: number
}

export const AppContext = React.createContext<IAppContext | null | undefined>(undefined)

export function useInitializedContext(): Required<IAppContext> {
	const context = React.useContext(AppContext)
	if (!context?.web3) {
		throw new Error(
			"useWeb3 has been accessed outside of a provider or somewhere the truthiness of web3 wasn't checked",
		)
	}

	return context as Required<IAppContext>
}
