import { ethers } from "hardhat";

async function main() {
  // We get the contract to deploy
  const Token = await ethers.getContractFactory("OnChainToken");
  const token = await Token.deploy();

  await token.deployed();

  console.log("Token deployed to:", token);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
