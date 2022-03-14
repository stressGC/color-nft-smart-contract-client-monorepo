import BN from "bn.js"
import chai, { expect } from "chai"
import chaiAsPromise from "chai-as-promised"
import type { ColorInstance } from "../types/contracts/Color"
import { assertThrowWithReason } from "./utils"

chai.use(chaiAsPromise).should()

const Color = artifacts.require("Color")

contract("Color", (accounts) => {
	let contract: ColorInstance

	before(async () => {
		contract = await Color.deployed()
	})

	describe("deployment", () => {
		it("deploys successfully", async () => {
			const address = contract.address
			expect(address).to.not.equal(0x0)
			expect(address).to.not.equal("")
			expect(address).to.not.equal(null)
			expect(address).to.not.equal(undefined)
		})

		it("has a name", async () => {
			const name = await contract.name()
			expect(name).to.equal("Color")
		})

		it("has a symbol", async () => {
			const symbol = await contract.symbol()
			expect(symbol).to.equal("CLR")
		})
	})

	describe("minting", async () => {
		it("creates a new token", async () => {
			const result = await contract.mint("#AAAAAA")
			const totalSupply = await contract.totalSupply()

			const event = result.logs[0]
			const from = event.args[0]
			const to = event.args[1]
			const tokenId = event.args[2]

			expect(totalSupply.toNumber()).to.equal(1)
			expect(from).to.equal("0x0000000000000000000000000000000000000000")
			expect(to).to.equal(accounts[0])
			expect((tokenId as BN).toNumber()).to.equal(1)

			const color = await contract.colors((tokenId as BN).toNumber() - 1)
			expect(color).to.equal("#AAAAAA")
		})

		it("rejects minting the same color twice", async () => {
			await contract.mint("#BBBBBB")
			await assertThrowWithReason(() => contract.mint("#BBBBBB"), "Color must be unique")
		})

		it("caps the total supply to 5", async () => {
			// 2 tokens have already been minted, adding 3 more to reach the supply limit
			await Promise.all([contract.mint("#AAA333"), contract.mint("#AAA444"), contract.mint("#AAA555")])
			await assertThrowWithReason(() => contract.mint("#AAA666"), "No supply available")

			const totalSupply = await contract.totalSupply()
			expect(totalSupply.toNumber()).to.equal(5)
		})
	})

	describe("indexing", async () => {
		it("lists colors", async () => {
			const totalSupply = await contract.totalSupply()

			const getColorPromises = [...new Array(totalSupply.toNumber()).keys()].map((index) =>
				contract.colors(index),
			)
			const colors = await Promise.all(getColorPromises)

			expect(colors).to.deep.equal(["#AAAAAA", "#BBBBBB", "#AAA333", "#AAA444", "#AAA555"])
		})
	})
})
