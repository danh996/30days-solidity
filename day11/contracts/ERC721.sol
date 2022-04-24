//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract ERC721 {

    mapping(address => uint) internal _balances;
    mapping(uint => address) internal _owners;
    mapping(address => mapping(address => bool)) private _operatorApprivals;
    mapping(uint => address) private _tokenApprovals;

    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);

    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);

    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

    //return number NFT of owner
    function balanceOf(address _owner) external view returns (uint256){
        require(_owner != address(0), "Owner address must be different with 0" );
        return _balances(_owner);
    }

    //return owner address of token ID
    function ownerOf(uint256 _tokenId) external view returns (address){
        address owner = _owners[_tokenId];
        require(owner != address(0), "Owner of token must be different with 0");
        return owner;
    }

    //like transfer function but is check the receiver address is
    //is capable of receiving NFT or not
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable{
        transferFrom(_from, _to, _tokenId);
        require(_checkOnERC721Received(), "Receiver is not implement");
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable{
        safeTransferFrom(_from, _to, _tokenId, "");
    }

    
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable{
        owner = _owners[_tokenId];

        //set approve address to 0 or delete owner of token id
        approve(address(0), _tokenId);

        
        require(msg.sender == owner || 
            isApprovedForAll(owner, msg.sender) || 
            getApproved(_tokenId, msg.sender)
             "You are not the owner of Token Id Or The Oprator or not have permission");

        require(_from, owner, "From address is not the owner of this token");
        require(_to != address(0), "from address is 0");
        require(_owners[_tokenId] != address(0), "Token id is not exist");


        //update balances for from and to

        balances[_from] -= 1;
        balances[_to] += 1;
        _owners[_tokenId] = _to;
        
        emit Transfer(_from, _to, _tokenId);
    }

    //set a approve address for a token id
    function approve(address _approved, uint256 _tokenId) external payable{
        owner = ownerOf(_tokenId);

        require(msg.sender, owner, "Invalid owner of token id");
        require(isApprovedForAll(owner, _approved), "Invalid operator of the token Id");

        _tokenApprovals[_tokenId] = _approved;
        emit Approval(owner, _approved, _tokenId)
    }

    //ennable or disable an operator
    function setApprovalForAll(address _operator, bool _approved) external{
        //thang operator co quyen approve cua thang sender hay khong?
        _operatorApprivals[msg.sender][_operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    //get permission for an address to a token id
    function getApproved(uint256 _tokenId) external view returns (address){
        require(_owners[_tokenId] != address(0), "Token id is not exist");
        return _tokenApprovals[_tokenId];
    }

    //return permission of operator with owner is enable or disable
    function isApprovedForAll(address _owner, address _operator) external view returns (bool){
        require(_owner != address(0), "Owner addres must be different with address 0");
        return _operatorApprivals[_owner][_operator];
    }

    //co ham nay thi cai smart contract cua minh no se nhan duoc NFT
    //chua hieu lam
    function _checkOnERC721Received() private pure returns(bool){
        return true;
    }
    //EIP165 propasal: query if a contract implement another interface
    function supportInterFace(byte4 interfaceID) public pure vitual returns(bool){
        return interfaceID == 0x80ac58cd;
    }
}
