pragma solidity ^0.8.0;

import "./ERC721.sol";

contract Danh is ERC721 {
    string public name; //erc721 meta data
    string public symbol; //erc721 meta data
    mapping(uint256 => string) private tokenURIs;
    uint256 public tokenCount;

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        //erc721 meta data
        require(_owners[tokenId] != address(0), "Token Id does not exist");
        return tokenURIs[tokenId];
    }

    function mint(string memory _tokenURI) public {
        tokenCount += 1; //tokenId luon
        _balances[msg.sender] += 1;
        _owners[tokenCount] = msg.sender;

        _tokenURIs[tokenCount] = _tokenURI;

        emit Transfer(address(0), msg.sender, tokenCount);
    }

    function supportInterface(bytes4 interfaceID)
        public
        pure
        override
        returns (bool)
    {
        return interfaceId == 0x80ac58cd || 0x5b5e139f;
    }
}
