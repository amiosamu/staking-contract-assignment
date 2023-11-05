const { expect } = require("chai");
const { ethers } = require("hardhat")

describe("Staking contract", function(){
  let MyContract, myContractDeployed, owner, addr1, addr2, addr3, addrs
  
  beforeEach(async function(){
    MyContract = await ethers.getContractFactory("Staking");
    myContractDeployed = await MyContract.deploy("86400"); // Deploy the Staking contract with a 1-day staking period.
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
  });

  describe("Deployment", function() {
    it("should return correct minimum value and staking period (1 day)", async function(){
      // Check if the minimum value is equal to 0.005 ethers and the staking period is 1 day.
      expect(await myContractDeployed.minValue()).to.equal("5000000000000000"); // 0.005 ethers
      expect(await myContractDeployed.stakingPeriod()).to.equal("86400"); // 1 day
    });
  
    it("should implement stake function", async function() {
      // Stake 0.05 ethers for address 1.
      const stakeTx = await myContractDeployed.connect(addr1).stake({ value: "50000000000000000" });
      await stakeTx.wait();
      // Check if the contract's balance is not equal to 10,000 ethers minus 0.05 ethers.
      expect(await myContractDeployed.getBalance()).to.not.equal("10000000000000000000000"); // 10000 ethers - 0.05 ethers != 10000 ethers
    })

    it("should check the length of the staked balance map after calling the staking function", async function() {
      // Stake 0.05 ethers for address 1.
      const stakeTx = await myContractDeployed.connect(addr1).stake({ value: "50000000000000000" });
      await stakeTx.wait();
      // Stake 0.05 ethers for address 2.
      const stake2Tx = await myContractDeployed.connect(addr2).stake({ value: "50000000000000000" });
      await stake2Tx.wait();
      // Check if the total number of stakers has been incremented to 2 after staking.
      expect(await myContractDeployed.totalStakers()).to.equal(2);
    })

    it("should revert because the address doesn't have a stake balance to withdraw", async function() {
      // Check if attempting to withdraw from address 1 reverts with the message "You don't have a stake balance."
      await expect(myContractDeployed.connect(addr1).withdraw()).to.be.revertedWith("You don't have a stake balance");
    })
  });
});
