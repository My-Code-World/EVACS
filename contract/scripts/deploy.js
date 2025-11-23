const hre = require("hardhat");

async function main() {
  const DocVer = await hre.ethers.getContractFactory("DocumentVerification");
  const docVer = await DocVer.deploy();
  await docVer.deployed();
  console.log("Contract deployed to:", docVer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
