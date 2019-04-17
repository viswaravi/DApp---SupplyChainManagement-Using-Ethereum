pragma solidity ^0.5.0;

contract Asset {
    
    constructor() public {  
    }

    //Transaction Structure 
    struct TxDetail {
        uint iid;
        address from;
        address to;
        uint cost;
        string location;
    }

    //Item Structure
    struct Item {
        uint id;
        string name;
        uint quantity;
        string location;
        uint cost;
        address owner;
        uint txcount;
    }

    
    mapping(uint => Item) public items;
    mapping(uint => TxDetail) public transactions;

    uint public itemCount = 0 ;
    uint public txcount = 0;

    function addItem (string memory _name, uint _quantity,string memory _location, uint  _cost) public {
        itemCount ++;
        items[itemCount] = Item(itemCount, _name, _quantity, _location,_cost,msg.sender,0);
    }

    

    function transactItem(uint _iid, address _to, uint _cost,string memory _location) public {    
        items[_iid].txcount++;
        txcount++;
        transactions[txcount] = TxDetail(_iid,msg.sender,_to,_cost,_location);
    }

    function getItemName(uint _iid) public returns(string memory name){
        Item memory I = items[_iid];
        return I.name;
    }

    function getTransactionCount() public view returns (uint){
        return txcount;
    }

    function getItemTotal() public view returns (uint){
        return itemCount;
    }

    function transferOwnership(uint _iid,address newOwner)  public {
        items[_iid].owner = newOwner;
    }

}