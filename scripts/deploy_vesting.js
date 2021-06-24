const hre = require("hardhat")
require("@nomiclabs/hardhat-web3")
const fs = require("fs-extra")

const ERC20_ABI = require("../utils/erc20_abi.js")
const VESTING_ABI = require("../utils/vesting_abi.js")

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}

async function main() {
	fs.removeSync("cache")
	fs.removeSync("artifacts")
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

	//bsc mainnet: 0xC9D3fBbc35333abC7D078049984C883bAF1AC671
	const trailTokenAddress = "0xC9D3fBbc35333abC7D078049984C883bAF1AC671"
	let deployed = await Vesting.deploy(trailTokenAddress)
	let dep = await deployed.deployed()

	await sleep(45000) // 40 seconds sleep
	await hre.run("verify:verify", {
		address: dep.address,
		constructorArguments: [trailTokenAddress],
	})

	//---------- The Operations ----------

	const GASPrice = "5" //!important

	//give allowance for transfering tokens
	let erc20contract = new ethers.Contract(trailTokenAddress, ERC20_ABI, deployer)
	let numberOfTokens = ethers.utils.parseUnits("100000000", 18) //just give 100% allowance
	let options = { gasLimit: 60000, gasPrice: ethers.utils.parseUnits(GASPrice, "gwei") }
	let tx = await erc20contract.increaseAllowance(dep.address, numberOfTokens, options)
	console.log("Vested Allowance Set.....", tx.hash)

	//1. -------------- VESTING --------------
	let wallet = "0x8b90b067d02132fC7c5cDf64b8cac04D55aBC2B2"
	let amount = ethers.utils.parseUnits("4761904", 18)
	let duration = 182 //days
	let cliff = 0 //days
	let vestingContract = new ethers.Contract(dep.address, VESTING_ABI, deployer)
	options = { gasLimit: 150000, gasPrice: ethers.utils.parseUnits(GASPrice, "gwei") }
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)
	// //------------------------------------------

	//29.
	wallet = "0x9E0E04670Ffd7F4784a528Ed4F61B3fB1ED4aC4d"
	amount = ethers.utils.parseUnits("1904761", 18)
	duration = 182 //days
	cliff = 0 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//30.
	wallet = "0x1b95513eFD5E88267c85cFd4e16988ce929665E5"
	amount = ethers.utils.parseUnits("595237", 18)
	duration = 182 //days
	cliff = 0 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//31.
	wallet = "0x592559D38fA7ae15152eF3286dC63C6d9D6Ee99a"
	amount = ethers.utils.parseUnits("2380952", 18)
	duration = 182 //days
	cliff = 0 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//32.
	wallet = "0xCa9061Ae96f2728259E328AEda513270532FC43d"
	amount = ethers.utils.parseUnits("357142", 18)
	duration = 182 //days
	cliff = 0 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//33.
	wallet = "0xA0d8f6c24394EBBeBCE0A4a8618e0A4eD70Ee22A"
	amount = ethers.utils.parseUnits("357142", 18)
	duration = 182 //days
	cliff = 0 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//34.
	wallet = "0xbc3b76686c627B229BE6DB20f4C47AB0E6bfFE09"
	amount = ethers.utils.parseUnits("535714", 18)
	duration = 182 //days
	cliff = 0 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//35.
	wallet = "0x6728fCBA2012863e9E1bD12f2a95355deD06C7aD"
	amount = ethers.utils.parseUnits("357142", 18)
	duration = 182 //days
	cliff = 0 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//36.
	wallet = "0x11596F3eF6207D888b0d185bFEAf36F18BB30f66"
	amount = ethers.utils.parseUnits("238095", 18)
	duration = 182 //days
	cliff = 0 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//37.
	wallet = "0x078cfD085962f8dB8B3eaD10Ce9009f366CF51d8"
	amount = ethers.utils.parseUnits("833332", 18)
	duration = 182 //days
	cliff = 0 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//39.
	wallet = "0x637E21Ac11F0E0Cf95D926d6bd2737b059A2858a"
	amount = ethers.utils.parseUnits("714285", 18)
	duration = 182 //days
	cliff = 0 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//40.
	wallet = "0x2BD750478F9Dc18A09B921B47F6c68D9a70b5eA2"
	amount = ethers.utils.parseUnits("238095", 18)
	duration = 182 //days
	cliff = 0 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//41.
	wallet = "0xC9974D6A7378875cc2F4d8B0744D7ADdA402Fd39"
	amount = ethers.utils.parseUnits("71428", 18)
	duration = 182 //days
	cliff = 0 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//42.
	wallet = "0x9B3aDf3E0B40Fd66E036B11FDEC06D9EB45E2405"
	amount = ethers.utils.parseUnits("357142", 18)
	duration = 182 //days
	cliff = 0 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//43.
	wallet = "0x2Ca977C02b7112C856B4bDb012367541d466Ebe4"
	amount = ethers.utils.parseUnits("357142", 18)
	duration = 182 //days
	cliff = 0 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//46.
	wallet = "0x9ecA5A04Aa9Ad17Da86d3079CE31Ca18e94c2c20"
	amount = ethers.utils.parseUnits("2015152", 18)
	duration = 182 //days
	cliff = 30 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//47.
	wallet = "0xD1073EAA6Ca4A362a6E1F97A758fC3CdF01Ff58E"
	amount = ethers.utils.parseUnits("7000000", 18)
	duration = 1 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//48.
	wallet = "0x0E1B3d3F3Fe2758B5047941C2f99dCc483910bBa"
	amount = ethers.utils.parseUnits("10000000", 18)
	duration = 1 //days
	cliff = 30 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//49.
	wallet = "0xaC2b98d3CE8a9E3A6804eb35dFF287Dd85543AE3"
	amount = ethers.utils.parseUnits("13000000", 18)
	duration = 1 //days
	cliff = 0 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//50.
	wallet = "0x00000004Af22764bb04ddf4402Fd35F6e3011123"
	amount = ethers.utils.parseUnits("5000000", 18)
	duration = 365 //days
	cliff = 182 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//51.
	wallet = "0xAccA062ee2Ce8cA182e3fc28EE45D25b4eA5d142"
	amount = ethers.utils.parseUnits("13000000", 18)
	duration = 365 //days
	cliff = 182 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//52.
	wallet = "0x484967Bc01336553795c37291A5dFEAC3F2967f5"
	amount = ethers.utils.parseUnits("12000000", 18)
	duration = 1 //days
	cliff = 14 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
