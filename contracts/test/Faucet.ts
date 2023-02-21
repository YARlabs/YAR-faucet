import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import * as mocha from "mocha-steps";
import { parseEther } from '@ethersproject/units';
import { Faucet } from '../typechain-types';


describe("Diamond Global Test", async () => {
  let faucet: Faucet;

  let owner: SignerWithAddress, user1: SignerWithAddress, user2: SignerWithAddress, transactionPayer: SignerWithAddress;

  beforeEach(async () => {
    [owner, user1, user2, transactionPayer] = await ethers.getSigners();
  });

  async function timeMovement(_seconds: number) {
    await ethers.provider.send("evm_increaseTime", [_seconds]);
    await ethers.provider.send("evm_mine", []);
  }

  const payoutAmount = parseEther("0.5");
  const payoutPeriod = 60 * 60 * 24;
  const initialBalance = parseEther('10000');

  mocha.step("Faucet Deploy", async function() {
    const Faucet = await ethers.getContractFactory("Faucet");
    faucet = await Faucet.connect(owner).deploy(payoutAmount, payoutPeriod); 
    faucet.deployed();
  });

  mocha.step("Replenishment of the contract", async function () {
    const amountForSend = parseEther('999'); 
    await user1.sendTransaction({
      to: faucet.address,
      value: amountForSend
    });
    expect(await ethers.provider.getBalance(faucet.address)).to.be.equal(amountForSend);
  });

  mocha.step("Giving currency", async function () {
    await faucet.connect(transactionPayer).giveCurrency(user2.address);
    expect(await ethers.provider.getBalance(user2.address)).to.be.equal(initialBalance.add(payoutAmount));
  });

  mocha.step("Check time require", async function () {
    await expect(faucet.connect(transactionPayer).giveCurrency(user2.address)).to.be.revertedWith(    
      'This address has already received the currency, please wait.'
    );
  });

  mocha.step("Time movement", async function() {
    await timeMovement(payoutPeriod);
  });

  mocha.step("Second giving currency", async function () {
    await faucet.connect(transactionPayer).giveCurrency(user2.address);
    expect(await ethers.provider.getBalance(user2.address)).to.be.equal(initialBalance.add(payoutAmount).add(payoutAmount));
  });

});
