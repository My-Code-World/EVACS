// scripts/deploy.js
const hre = require("hardhat");
require("dotenv").config();

async function main() {
    // Compile contract factory
    const DocVer = await hre.ethers.getContractFactory("DocumentVerification");

    // Deploy contract
    const docVer = await DocVer.deploy();

    // Wait for deployment to complete
    await docVer.waitForDeployment();

    // Log deployed address
    console.log("Contract deployed to:", await docVer.getAddress());
}

// Error handling
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
