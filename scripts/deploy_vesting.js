// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat")
require("@nomiclabs/hardhat-web3")

const erc20abi = require("../utils/erc20_abi.js")

async function main() {
	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	await hre.run("compile")

	// We get the contract to deploy
	const Vesting = await hre.ethers.getContractFactory("Vesting")
	console.log("Deploying Contract...")

	let network = process.env.NETWORK ? process.env.NETWORK : "rinkeby"

	console.log(">-> Network is set to " + network)

	// ethers is avaialble in the global scope
	const [deployer] = await ethers.getSigners()
	const deployerAddress = await deployer.getAddress()
	const account = await web3.utils.toChecksumAddress(deployerAddress)
	const balance = await web3.eth.getBalance(account)

	console.log(
		"Deployer Account " + deployerAddress + " has balance: " + web3.utils.fromWei(balance, "ether"),
		"ETH"
	)

	const baseTokenAddress = "0x0A5cC7153991166B88B9CCE672aB8b8a211aE6d6"
	const vestingAddress1 = "0x8C99B5A504DDd9EA33842a6e062f0Fc283199cf2"
	const vestingAddress2 = "0x76451a0e22539FF373920cd356791f0CDA2c017c"

	const vestingTime = Math.round(new Date().getTime() / 1000) + 60 //now + 60 seconds
	let deployed = await Vesting.deploy(baseTokenAddress, vestingAddress1, vestingTime)
	let dep = await deployed.deployed()
	console.log("Vesting Contract deployed to:", dep.address)

	//transfer funds to vesting
	let erc20contract = new ethers.Contract(baseTokenAddress, erc20abi, deployer)
	let numberOfTokens = ethers.utils.parseUnits("1234.0", 18)
	let options = { gasLimit: 100000, gasPrice: ethers.utils.parseUnits("1.0", "gwei") }
	let tx = await erc20contract.transfer(dep.address, numberOfTokens, options)
	console.log("Tokens deployed ok @ ", tx.hash)

	// deployed = await Vesting.deploy(baseTokenAddress, vestingAddress2, vestingTime + 60)
	// dep = await deployed.deployed()
	// console.log("Vesting deployed to:", dep.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
