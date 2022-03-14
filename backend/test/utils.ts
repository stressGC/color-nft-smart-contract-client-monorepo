export async function assertThrowWithReason(fn: (...args: unknown[]) => unknown, expectedReason: string) {
	try {
		await fn()
		assert.fail("Minting the same color should reject")
	} catch (error: any) {
		expect(error.reason).to.equal(expectedReason)
	}
}
