import { ethers } from "hardhat";

async function main() {
  const payoutAmount = ethers.utils.parseEther("0.5");
  const payoutPeriod = 60 * 60 * 24;

  const Faucet = await ethers.getContractFactory("Faucet");
  const faucet = await Faucet.deploy(payoutAmount, payoutPeriod);

  await faucet.deployed();

  console.log(`Faucet: ${faucet.address}`);//0xe02a33c999571d9Ef01E329058bd4E4f5c7216c0
} 

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
