// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract PeerToPeer {
  //keep trackof transactions
  uint256 transactionCount;
  //an event that will be emitted after each transaction
  event Transfer(
      uint id,
      address from, 
      address receiver, 
      uint amount,
      string message,
      uint timestamp
    );

    //struct to define the transactions
    struct Transaction{
      address from; 
      address receiver;
      uint amount;
      string message;
      uint timestamp;
    }
    //keeping transactions records
    Transaction[] public transactions;
 
    //Add transactions to ethereum 
    //based on our struct
    function makeTransaction(address payable receiver, uint amount, string memory message) public{
      //add transaction count
      transactionCount++;
      transactions.push(Transaction(msg.sender, receiver, amount, message, block.timestamp));
      emit Transfer(transactionCount, msg.sender, receiver, amount, message, block.timestamp);
    }

    //Get All Transactions From Etheruem
    function getAllTransactions() public view returns(Transaction[] memory){
        return transactions;
    }

    //Get Transaction Count
    function getTransactionCount() public view returns (uint256){
      return transactionCount;
    }

    function getBalanceOfOwner() public view returns(uint){
        return address(this).balance;
    }
}
