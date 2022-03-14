import { useInitializedContext } from "../context"

export function Header() {
	const { accounts } = useInitializedContext()
	return (
		<header className="bg-slate-800 py-3 flex justify-between text-white">
			<div className="max-w-[1140px] mx-auto">
				<h1 className="text-6xl">NFT project</h1>
				<div>
					{accounts.map((account, index) => {
						return (
							<p key={account}>
								account {index}: {account}
							</p>
						)
					})}
				</div>
			</div>
		</header>
	)
}
