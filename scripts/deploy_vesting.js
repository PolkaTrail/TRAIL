// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat")
require("@nomiclabs/hardhat-web3")

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

	const baseTokenAddress = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8"
	const vestingAddress1 = "0x1111117Fe854f5CC8BE01Ff0F74605f4F3860cbD"
	const vestingAddress2 = "0x11111190553D6177CA22c53fCA807871FAE687Cf"

	const vestingTime = Math.round(new Date().getTime() / 1000) + 60 //now + 60 seconds
	const deployed = await Vesting.deploy(baseTokenAddress, vestingAddress1, vestingTime)
	let dep = await deployed.deployed()
	console.log("Vesting Contract deployed to:", dep.address)

	//transfer funds to vesting
	var contract = new ethers.Contract(baseTokenAddress, abi, wallet)

	var numberOfTokens = ethers.utils.parseUnits("10.0", numberOfDecimals)
	var options = { gasLimit: 1500000, gasPrice: ethers.utils.parseUnits("1.0", "gwei") }

	contract.transferFrom(fromAddress, targetAddress, numberOfTokens, options).then(function (tx) {
		console.log(tx)
	})


	deployed = await Vesting.deploy(baseTokenAddress, vestingAddress2, vestingTime + 60)
	dep = await deployed.deployed()
	console.log("Vesting deployed to:", dep.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
