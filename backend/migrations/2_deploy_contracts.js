const Color = artifacts.require("Color")

module.exports = async (deployer) => {
	await deployer.deploy(Color)
	const color = await Color.deployed()
	console.log(`Color deployed at ${color.address}.`)
}
