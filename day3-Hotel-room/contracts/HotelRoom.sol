// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HotelRoom {
    enum Statuses {
        Vacant,
        Occupied
    }
    Statuses currentStatus;

    event Occupy(address _occupant, uint256 _value);

    address public owner;

    constructor() public {
        owner = msg.sender;
        currentStatus = Statuses.Vacant;
    }

    modifier onlyWhileVacant() {
        require(currentStatus == Statuses.Vacant, "Currently Occupied");
        _;
    }

    modifier costs(uint256 _amount) {
        require(msg.value >= _amount, "Not enough Ether provided");
        _;
    }

    function book() public payable onlyWhileVacant costs(2 ether) {
        currentStatus = Statuses.Occupied;
        payable(owner).transfer(msg.value);
        emit Occupy(msg.sender, msg.value);
    }
}
