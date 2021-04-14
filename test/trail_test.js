const { expect } = require("chai")
const { ethers } = require("hardhat")

let trail
let owner, acc1, acc2

describe("Deploy Trail", function () {
	beforeEach(async function () {
		let TrailContract = await ethers.getContractFactory("Trail")

		signers = await ethers.getSigners()
		owner = signers[0]
		acc1 = signers[1]
		acc2 = signers[2]
		trail = await TrailContract.deploy()
		await trail.deployed()
	})

	it("Deployment should assign the total supply of tokens to the owner", async function () {
		const ownerBalance = await trail.balanceOf(owner.address)
		expect(await trail.totalSupply()).to.equal(ownerBalance)
	})

	it("Should transfer tokens between accounts", async function () {
		// Transfer 50 tokens from owner to addr1
		await trail.transfer(acc1.address, 50)
		expect(await trail.balanceOf(acc1.address)).to.equal(50)

		// Transfer 50 tokens from addr1 to addr2
		await trail.connect(acc1).transfer(acc2.address, 50)
		expect(await trail.balanceOf(acc2.address)).to.equal(50)
	})
})
