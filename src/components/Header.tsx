import { useInitializedContext } from "../context"

export function Header() {
	const { accounts } = useInitializedContext()
	return (
		<header className="bg-slate-800 py-3 flex justify-between">
			<h1 className="text-6xl">NFT project</h1>
			<div>
				{accounts.map((account, index) => {
					return (
						<p>
							account {index}: {account}
						</p>
					)
				})}
			</div>
		</header>
	)
}
