import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    yar: {
      url: 'https://rpc1.testnet.yarchain.org',
      accounts: [`${process.env.PRIVATE_KEY}`],
    }
  },
};

export default config;
