// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat")
require("@nomiclabs/hardhat-web3")

const erc20abi = require("../utils/erc20_abi.js")

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}

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

	const baseTokenAddress = "0x9Fe423993c8879B1B68E5236fa8893a94258F96F" // Trail Token
	const vestingAddress1 = "0x1111117Fe854f5CC8BE01Ff0F74605f4F3860cbD" // team
	const vestingAddress2 = "0x11111190553D6177CA22c53fCA807871FAE687Cf" // reserves

	//-------------- TEAM VESTING --------------
	let vestingTime = Math.round(new Date().getTime() / 1000) + 600 //now + 10 minutes
	console.log("vesting time set to", vestingTime)
	let deployed = await Vesting.deploy(baseTokenAddress, vestingAddress1, vestingTime)
	let dep = await deployed.deployed()
	console.log("Vesting Contract deployed at:", dep.address)

	if (network === "rinkeby" || network === "mainnet") {
		await sleep(20000) // 20 seconds sleep
		await hre.run("verify:verify", {
			address: dep.address,
			constructorArguments: [baseTokenAddress, vestingAddress1, vestingTime],
		})
	}

	let erc20contract = new ethers.Contract(baseTokenAddress, erc20abi, deployer)
	let numberOfTokens = ethers.utils.parseUnits("130000.0", 18) //13%
	let options = { gasLimit: 100000, gasPrice: ethers.utils.parseUnits("1.0", "gwei") }
	let tx = await erc20contract.transfer(dep.address, numberOfTokens, options)
	console.log("Vested Tokens trasfered.....", tx.hash)
	//------------------------------------------

	//-------------- RESERVES VESTING --------------
	vestingTime = Math.round(new Date().getTime() / 1000) + 900 //now + 15 minutes
	console.log("vesting time set to", vestingTime)
	deployed = await Vesting.deploy(baseTokenAddress, vestingAddress2, vestingTime)
	dep = await deployed.deployed()
	console.log("Vesting Contract deployed tx:", dep.address)

	if (network === "rinkeby" || network === "mainnet") {
		await sleep(20000) // 20 seconds sleep
		await hre.run("verify:verify", {
			address: dep.address,
			constructorArguments: [baseTokenAddress, vestingAddress2, vestingTime],
		})
	}

	erc20contract = new ethers.Contract(baseTokenAddress, erc20abi, deployer)
	numberOfTokens = ethers.utils.parseUnits("130000.0", 18) //13%
	options = { gasLimit: 100000, gasPrice: ethers.utils.parseUnits("1.0", "gwei") }
	tx = await erc20contract.transfer(dep.address, numberOfTokens, options)
	console.log("Vested tokens transfered......", tx.hash)
	//------------------------------------------
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
