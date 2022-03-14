import React from "react"
import Web3 from "web3"
import type { Color } from "../types/contracts/Color";

export interface IAppContext {
	web3?: Web3
	accounts?: string[]
	contract?: Color
}

export const AppContext = React.createContext<IAppContext | null | undefined>(undefined)

export function useInitializedContext(): Required<IAppContext> {
	const context = React.useContext(AppContext)
	if (!context?.web3 || !context.accounts || !context.contract) {
		throw new Error(
			"useInitializedContext has been accessed outside of a provider or somewhere the context wasn't checked",
		)
	}

	return context as Required<IAppContext>
}
