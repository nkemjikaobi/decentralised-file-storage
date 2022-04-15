const hre = require("hardhat");
const fs = require("fs");
const { utils } = require("ethers");

async function main() {
  
  const FileSpace = await hre.ethers.getContractFactory("FileSpace");
  const fileSpace = await FileSpace.deploy();

  await fileSpace.deployed();

  console.log("FileSpace deployed to:", fileSpace.address);

  fs.writeFileSync(`fileSpaceAddress.txt`, `${fileSpace.address}`);
  //fs.writeFileSync(`contract.json`, nesttract);

  // console.log(new Date());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });