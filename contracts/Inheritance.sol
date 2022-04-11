// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Ownable {
    address owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Must be owner");
        _;
    }
}

contract SecretValue {
    string secret;

    constructor(string memory _secret) public {
        secret = _secret;
    }

    function getSecret() public view returns (string memory) {
        return secret;
    }
}

contract Inheritance is Ownable {
    address secretValue;

    constructor(string memory _secret) public {
        SecretValue _secretValue = new SecretValue(_secret);
        secretValue = address(_secretValue);
        super;
    }

    function getSecret() public view onlyOwner returns (string memory) {
        SecretValue _secretValue = SecretValue(secretValue);
        return _secretValue.getSecret();
    }
}
