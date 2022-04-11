// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TokenSale {
    string public name = "Token Sale";
    string public symbol = "TSC";
    string public standard = "Token Sale V1.0";

    uint256 public totalSupply;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) private allowed;

    constructor(uint256 _totalSupply) public {
        balanceOf[msg.sender] = _totalSupply;
        totalSupply = _totalSupply;
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool sucess)
    {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] += _value;
        balanceOf[_to] -= _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool succcess)
    {
        allowed[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address owner, address spender)
        public
        view
        returns (uint256)
    {
        return allowed[owner][spender];
    }
}
