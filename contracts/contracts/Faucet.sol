// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Address.sol";

contract Faucet {
    using Address for address payable;
    using Address for address;

    address owner;
    uint256 payoutAmount;
    uint256 payoutPeriod;
    mapping(address => uint256) lastCalls;

    constructor(uint256 _payoutAmount, uint256 _payoutPeriod) {
       payoutAmount = _payoutAmount;
       payoutPeriod = _payoutPeriod;
       owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function giveCurrency(address payable _recipient) external {
        require(!_recipient.isContract());
        require(!msg.sender.isContract());
        uint256 callMoment = block.timestamp;
        require(lastCalls[_recipient] + payoutPeriod <= callMoment, "This address has already received the currency, please wait.");
        lastCalls[_recipient] = callMoment;
        _recipient.sendValue(payoutAmount);
    }

    function setPayoutAmount(uint256 _newAmount) external onlyOwner { 
        payoutAmount = _newAmount;
    }

    function setPayoutPeriod(uint256 _newPeriod) external onlyOwner { 
        payoutPeriod = _newPeriod;
    }

    function transferOwnership(address _newOwner) external onlyOwner {
        owner = _newOwner;
    }

    receive() external payable {}

    fallback() external payable {}
}
