// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract Staking {
    address public owner;
    uint public stakingPeriod;
    uint public totalRewards;
    uint public minValue = 0.005 ether;
    uint public totalStakers;

    mapping(address => uint) public userBalances;
    mapping(address => uint) public stakedBalances;
    mapping(address => uint) public stakingStartTimes;



    constructor(uint _stakingPeriod) payable  {
        owner = msg.sender;
        stakingPeriod = _stakingPeriod;
        totalRewards = msg.value;
    }

    function stake() public payable {
        require(msg.value >= minValue, "A value must be greater than 0.005 ether");
        require(msg.sender.balance >= msg.value, "Insufficient balance");
        require(stakedBalances[msg.sender] == 0, "You already have stake");
        userBalances[msg.sender] = msg.sender.balance;
        uint _amount = msg.value;
        userBalances[msg.sender] -= _amount;
        stakedBalances[msg.sender] += _amount;
        stakingStartTimes[msg.sender] = block.timestamp;
        totalStakers++;
    }

    function calculateRewards() public view returns (uint) {
        uint timeStaked = block.timestamp - stakingStartTimes[msg.sender];
        uint rewards = (stakedBalances[msg.sender] * timeStaked) / stakingPeriod;
        return rewards;
    }

    function distributeRewards() public {
        require(block.timestamp >= stakingStartTimes[msg.sender] + 24 hours, "Deadline is not over");
        withdraw();
    }

    function withdraw() public {
        require(stakedBalances[msg.sender] >= minValue, "You don't have a stake balance");
        uint rewards = calculateRewards();
        uint totalAmount = stakedBalances[msg.sender] + rewards;        
        userBalances[msg.sender] += totalAmount;
        stakedBalances[msg.sender] = 0;
        stakingStartTimes[msg.sender] = 0;
        totalRewards -= rewards;
        totalStakers--;
        payable(msg.sender).transfer(totalAmount);
    
    }

    function getBalance() public view returns(uint){
        return msg.sender.balance;
    }

    function getStakedBalance() public view returns(uint){
        return stakedBalances[msg.sender];
    }

    function timeLeft() public view returns(uint){
        if (block.timestamp > stakingStartTimes[msg.sender] + 24 hours){
                return 0;
        } else{
            return (stakingStartTimes[msg.sender] + 24 hours) - block.timestamp;
        }
    }
}