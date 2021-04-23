// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract Trail is ERC20Permit, ERC20Burnable, Ownable {
	constructor() ERC20Permit("TRAIL") ERC20("TRAIL", "TRAIL") {
		_mint(msg.sender, 1000000 * (10**uint256(18))); // 1 million, 18 decimals
	}

	// Withdraw currency accidentally sent to the smart contract
	function withdraw() public onlyOwner {
		uint256 balance = address(this).balance;
		payable(msg.sender).transfer(balance);
	}

	// Owner claim any tokens that transfered to this contract address
	function reclaimToken(IERC20 token) public onlyOwner {
		require(address(token) != address(0));
		uint256 balance = token.balanceOf(address(this));
		token.transfer(msg.sender, balance);
	}
}
