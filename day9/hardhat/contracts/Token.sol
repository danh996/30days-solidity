pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
    string public name = "My hard hat token";
    string public symbol = "MTH";
    uint256 public totalSupply = 1000;
    address public owner;
    mapping(address => uint256) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {

        console.log('sender balance is %s tokens', balances[msg.sender]);
        console.log('trying to send %s token to %s', amount, to);

        require(balances[msg.sender] >= amount, "not enough token");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
