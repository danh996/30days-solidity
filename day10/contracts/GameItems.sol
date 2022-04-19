// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract GameItems is ERC1155 {
    uint256 public constant CHARIZARD = 0;
    uint256 public constant IVYSAR = 1;
    uint256 public constant VERUSAR = 2;
    uint256 public constant CHARMANDER = 3;

    constructor() ERC1155("https://khaosatdiem.com/api/item/{id}.json") {
        _mint(msg.sender, CHARIZARD, 10, "");
        _mint(msg.sender, IVYSAR, 100, "");
        _mint(msg.sender, VERUSAR, 10, "");
        _mint(msg.sender, CHARMANDER, 100, "");
    }
}
