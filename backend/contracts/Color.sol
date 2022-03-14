// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract Color is ERC721 {
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;

	string[] public colors;
	uint256 public constant maxSupply = 5;
	mapping(string => bool) _colorExists;

	constructor() ERC721("Color", "CLR") {}

	// E.G. color = "#FFFFFF"
	// TODO: should we emit an Event, what is it used for?
	function mint(string memory _color) public {
		require(totalSupply() < maxSupply, "No supply available");
		require(!_colorExists[_color], "Color must be unique");

		_tokenIds.increment();
		uint256 _newItemId = _tokenIds.current();
	
		colors.push(_color);

		_mint(msg.sender, _newItemId);
		_colorExists[_color] = true;
	}

	function totalSupply() public view virtual returns (uint256) {
		return _tokenIds.current();
	}
}