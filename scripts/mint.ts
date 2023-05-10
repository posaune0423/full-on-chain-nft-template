import { ethers } from "hardhat";
import { Contract } from "ethers";
import { Buffer } from "buffer";

import { tetoris } from "./games/tetoris";
import { contractAbi } from "./abi";

async function main() {
  const [owner] = await ethers.getSigners();
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

  const encoded = Buffer.from(tetoris).toString("base64");
  const tokenId = 1;
  const tokenContract = new Contract(contractAddress, contractAbi, owner);
  await tokenContract.mint(
    tokenId,
    "name",
    "description",
    "image",
    "data:text/html;charset=UTF-8;base64, " + encoded
  );
  const tokenInfo = await tokenContract.tokenURI(tokenId);
  console.log(tokenInfo);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
