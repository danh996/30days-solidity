// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Crud {
    struct Player {
        uint256 id;
        string name;
    }

    Player[] public player;
    uint256 public nextId;

    function createPlayer(string memory name) public {
        player.push(Player(nextId, name));
        nextId++;
    }

    function getPlayer(uint256 _id)
        public
        view
        returns (uint256, string memory)
    {
        uint256 i = getId(_id);
        return (player[i].id, player[i].name);
    }

    function updatePlayer(uint256 id, string memory _name) public {
        uint256 i = getId(id);
        player[i].name = _name;
    }

    function deletePlayer(uint256 id) public {
        uint256 i = getId(id);
        delete (player[i]);
    }

    function getId(uint256 _id) internal view returns (uint256 id) {
        for (uint256 i = 0; i < player.length; i++) {
            if (player[i].id == _id) {
                return i;
            }
        }
        revert("Player does not exist");
    }
}
