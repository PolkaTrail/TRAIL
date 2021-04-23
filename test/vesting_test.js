const { expect } = require("chai")
const { ethers } = require("hardhat")
const { time, balance } = require("@openzeppelin/test-helpers")

let vesting
let owner, acc1, acc2
let erc20

describe("Deploy Vesting", function () {
	beforeEach(async function () {
		let VestingContract = await ethers.getContractFactory("Vesting")

		signers = await ethers.getSigners()
		owner = signers[0]
		acc1 = signers[1]
		acc2 = signers[2]

		//deploy an erc20 token for
		let ERC20MockContract = await ethers.getContractFactory("ERC20Mock")
		erc20 = await ERC20MockContract.connect(acc1).deploy("ERCToken", "ERC", "10000")
		await erc20.deployed()

		vesting = await VestingContract.deploy(erc20.address)
		await vesting.deployed()
	})

	it("Deployment should be ok", async function () {
		expect(await erc20.balanceOf(owner.address)).to.equal(0)
	})
})
