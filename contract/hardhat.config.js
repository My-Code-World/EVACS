require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { SEPOLIA_RPC_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.28" }, // matches Lock.sol
      { version: "0.8.20" }  // matches your DocumentVerification.sol
    ]
  },
  networks: {
    localhost: {},
    sepolia: {
      url: SEPOLIA_RPC_URL || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
};
