// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Land is ERC721 {
    uint256 public cost = 1 ether;
    uint256 public maxSupply = 5;
    uint256 public totalSupply = 0;

    struct Building {
        string name;
        address owner;
        int256 posX;
        int256 posY;
        int256 posZ;
        uint256 sizeX;
        uint256 sizeY;
        uint256 sizeZ;
    }

    Building[] public buildings;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _cost
    ) ERC721(_name, _symbol) {
        cost = _cost;
        buildings.push(
            Building("City Hall", address(0x0), 0, 0, 0, 10, 10, 10)
        );

        buildings.push(
            Building("Emirate Stadium", address(0x0), 0, 10, 0, 10, 5, 3)
        );

        buildings.push(
            Building("University", address(0x0), 0, -10, 0, 10, 5, 3)
        );

        buildings.push(Building("Part", address(0x0), 10, 10, 10, 10, 5, 3));

        buildings.push(
            Building("MyTai City", address(0x0), 20, 20, 20, 10, 5, 3)
        );
    }

    function mint(uint256 _id) public payable {
        uint256 supply = totalSupply;
        require(supply <= maxSupply);
        require(buildings[_id - 1].owner == address(0x00));
        require(msg.value >= 1 ether);

        buildings[_id - 1].owner = msg.sender;

        totalSupply = totalSupply + 1;

        _safeMint(msg.sender, _id);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner of nor approved"
        );
        buildings[tokenId - 1].owner = to;
        _safeTransfer(from, to, tokenId, "");
    }

    function getBuildings() public view returns (Building[] memory) {
        return buildings;
    }

    function getBuilding(uint256 _id) public view returns (Building memory) {
        return buildings[_id - 1];
    }
}
