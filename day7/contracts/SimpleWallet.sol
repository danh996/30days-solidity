// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleWallet {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {}

    function withDraw(uint256 _amount) external {
        require(msg.sender == owner, "only owner can withdraw");
        payable(msg.sender).transfer(_amount);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getBalanceOfAddress() external view returns (uint256) {
        return (msg.sender).balance;
    }
}
