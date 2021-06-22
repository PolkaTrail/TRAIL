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
	const trailTokenAddress = "0x48B3111fbB0588ADcb178F3bF0ff2D1be9817B03"
	let deployed = await Vesting.deploy(trailTokenAddress)
	let dep = await deployed.deployed()

	await sleep(45000) // 40 seconds sleep
	await hre.run("verify:verify", {
		address: dep.address,
		constructorArguments: [trailTokenAddress],
	})

	//---------- The Operations ----------

	const GASPrice = "10" //!important

	//give allowance for transfering tokens
	let erc20contract = new ethers.Contract(trailTokenAddress, ERC20_ABI, deployer)
	let numberOfTokens = ethers.utils.parseUnits("100000000", 18) //just give 100% allowance
	let options = { gasLimit: 60000, gasPrice: ethers.utils.parseUnits(GASPrice, "gwei") }
	let tx = await erc20contract.increaseAllowance(dep.address, numberOfTokens, options)
	console.log("Vested Allowance Set.....", tx.hash)

	//1. -------------- VESTING --------------
	let wallet = "0x8b90b067d02132fC7c5cDf64b8cac04D55aBC2B2" // team
	let amount = ethers.utils.parseUnits("3000000", 18)
	let duration = 304 //days
	let cliff = 14 //days
	let vestingContract = new ethers.Contract(dep.address, VESTING_ABI, deployer)
	options = { gasLimit: 150000, gasPrice: ethers.utils.parseUnits(GASPrice, "gwei") }
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)
	//------------------------------------------

	//2.
	wallet = "0x7333Be58868c75fa61981b9909076F9aCb8B02C5"
	amount = ethers.utils.parseUnits("666666", 18)
	duration = 365 //days
	cliff = 14 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//3.
	wallet = "0xf1a18b837601cD1f3eA1e529E95E832fED498f1b"
	amount = ethers.utils.parseUnits("666666", 18)
	duration = 365 //days
	cliff = 14 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//4.
	wallet = "0x5692BD676eb69B0658B6438035d6BbC5Bd2Dc740"
	amount = ethers.utils.parseUnits("666666", 18)
	duration = 365 //days
	cliff = 14 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//5.
	wallet = "0x1b95513eFD5E88267c85cFd4e16988ce929665E5"
	amount = ethers.utils.parseUnits("416666", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//6.
	wallet = "0xbfDd960844765b1BAC0BF1F01A84Fb1F5aAFe9bC"
	amount = ethers.utils.parseUnits("694444", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//7.
	wallet = "0xd062213f191B84c21C9E4da8D99Ee9B1a2cE018A"
	amount = ethers.utils.parseUnits("2777778", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//8.
	wallet = "0xbc3b76686c627B229BE6DB20f4C47AB0E6bfFE09"
	amount = ethers.utils.parseUnits("347222", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//9.
	wallet = "0xFfbAD33e6d78a7fA76a863d843CF8D9596CBAE1F"
	amount = ethers.utils.parseUnits("277778", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//10.
	wallet = "0xd9847Cd60258a9b113908A2Dc9ADEa13A00ec6CA"
	amount = ethers.utils.parseUnits("277778", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//11.
	wallet = "0x4553eD5d8d3731E629f67BD86abd021175F31848"
	amount = ethers.utils.parseUnits("208333", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//12.
	wallet = "0x74726c43FafD8f9C3d50A9F63820bfB8860F3481"
	amount = ethers.utils.parseUnits("416666", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//13.
	wallet = "0x5BF45428F68021Bb9Ba267A07A2702137ec58a40"
	amount = ethers.utils.parseUnits("555555", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//14.
	wallet = "0x2BD750478F9Dc18A09B921B47F6c68D9a70b5eA2"
	amount = ethers.utils.parseUnits("416666", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//15.
	wallet = "0x1b75c6DC2C2cff9E6eAF54c5d72b3447740f1e76"
	amount = ethers.utils.parseUnits("277778", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//16.
	wallet = "0xdc8707011f64FD4563981C59f0970C1B2BDcbFa8"
	amount = ethers.utils.parseUnits("555555", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//17.
	wallet = "0x0c837db502a8636bef3d1f4fd5bc8e4529f77747"
	amount = ethers.utils.parseUnits("277778", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//18.
	wallet = "0x9E6d8980BC9fc98c5d2db48c46237d12d9873ab0"
	amount = ethers.utils.parseUnits("277778", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//19.
	wallet = "0xfd3858df77c92053c5a823d3f9a8b14da83e80fc"
	amount = ethers.utils.parseUnits("208333", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//20.
	wallet = "0x97Ec749bCF704434e491Ca42591721102E49f145"
	amount = ethers.utils.parseUnits("138888", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//21.
	wallet = "0x9780757bb22EAC40C63DdB7144B5BD3772F394aF"
	amount = ethers.utils.parseUnits("416666", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//22.
	wallet = "0xFBf2debC3Ac8f99A134697c6376b26946130953A"
	amount = ethers.utils.parseUnits("416666", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//23.
	wallet = "0x2BD750478F9Dc18A09B921B47F6c68D9a70b5eA2"
	amount = ethers.utils.parseUnits("277778", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//24.
	wallet = "0x9B3aDf3E0B40Fd66E036B11FDEC06D9EB45E2405"
	amount = ethers.utils.parseUnits("416666", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//25.
	wallet = "0x2Ca977C02b7112C856B4bDb012367541d466Ebe4"
	amount = ethers.utils.parseUnits("416666", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//26.
	wallet = "0xbc3b76686c627B229BE6DB20f4C47AB0E6bfFE09"
	amount = ethers.utils.parseUnits("277778", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//27.
	wallet = "0xc80222fe8dd3f35e72c4669aeb2059ba0b6344b0"
	amount = ethers.utils.parseUnits("277778", 18)
	duration = 243 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//28.
	wallet = "0x8b90b067d02132fC7c5cDf64b8cac04D55aBC2B2"
	amount = ethers.utils.parseUnits("4761904", 18)
	duration = 182 //days
	cliff = 0 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//29.
	wallet = "0x9E0E04670Ffd7F4784a528Ed4F61B3fB1ED4aC4d"
	amount = ethers.utils.parseUnits("1904761", 18)
	duration = 182 //days
	cliff = 0 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//30.
	wallet = "0x1b95513eFD5E88267c85cFd4e16988ce929665E5"
	amount = ethers.utils.parseUnits("357142", 18)
	duration = 182 //days
	cliff = 0 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//31.
	wallet = "0xd062213f191B84c21C9E4da8D99Ee9B1a2cE018A"
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
	amount = ethers.utils.parseUnits("297619", 18)
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
	amount = ethers.utils.parseUnits("357142", 18)
	duration = 182 //days
	cliff = 0 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//38.
	wallet = "0x1b95513eFD5E88267c85cFd4e16988ce929665E5"
	amount = ethers.utils.parseUnits("238095", 18)
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

	//44.
	wallet = "0xbc3b76686c627B229BE6DB20f4C47AB0E6bfFE09"
	amount = ethers.utils.parseUnits("238095", 18)
	duration = 182 //days
	cliff = 0 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//45.
	wallet = "0x078cfD085962f8dB8B3eaD10Ce9009f366CF51d8"
	amount = ethers.utils.parseUnits("476190", 18)
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
	duration = 0 //days
	cliff = 7 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//48.
	wallet = "0x0E1B3d3F3Fe2758B5047941C2f99dCc483910bBa"
	amount = ethers.utils.parseUnits("10000000", 18)
	duration = 0 //days
	cliff = 30 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//49.
	wallet = "0xaC2b98d3CE8a9E3A6804eb35dFF287Dd85543AE3"
	amount = ethers.utils.parseUnits("13000000", 18)
	duration = 243 //days
	cliff = 7 //days
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
	duration = 0 //days
	cliff = 14 //days
	tx = await vestingContract.addTokenGrant(wallet, amount, duration, cliff, options)
	console.log("Vested Grant Created ", tx.hash)

	//shit, I should have used some arrays...well too late now

	//dex liquidity to 0xc264baA26c0248a182F4F6572031E1FE2c55b95d

	//rest is burned
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
