// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract BNBToken {
    uint256 public totalSupply = 1000 * 10**18;
    string public name = "My Token";
    string public symbol = "TKN";
    int256 public decimals = 18;

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowance;
    //0x1
    //->0x2 => 10
    //->0x3 => 100
    //->0x4 => 18

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    constructor() {
        balances[msg.sender] = totalSupply;
    }

    function balanceOf(address owner) public view returns (uint256) {
        return balances[owner];
    }

    function transfer(address to, uint256 value) public returns (bool) {
        require(balanceOf(msg.sender) >= value, "balance is not enough");
        balances[to] += value;
        balances[msg.sender] -= value;

        emit Transfer(msg.sender, to, value);

        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public returns (bool) {
        require(balanceOf(from) >= value, "balance is too low");
        require(allowance[from][msg.sender] >= value, "alowance is too low");
        balances[to] += value;
        balances[from] -= value;
        emit Transfer(from, to, value);
        return true;
    }

    function approve(address spender, uint256 value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
}
