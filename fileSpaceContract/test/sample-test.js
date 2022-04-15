
const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");
const { utils } = require("ethers");

use(solidity);

describe("FileSpace", function () {
  it("Should set file ID and upload metadata", async () => {
    const FileSpace = await hre.ethers.getContractFactory("FileSpace");
    const fileSpace = await FileSpace.deploy();

    await fileSpace.deployed();

    let files = await fileSpace.retrieveFiles();

    expect(files.length).to.equal(0);

    await fileSpace.uploadFile('QmXy', 'The File', '2021-10-18', false);

    files = await fileSpace.retrieveFiles();

    expect(files.length).to.equal(1);
    expect(files[0].id).to.equal(1);
    expect(files[0].isPrivate).to.equal(false);

    await fileSpace.uploadFile('QmJy', 'The New File', '2021-10-18', true);

    files = await fileSpace.retrieveFiles();

    expect(files.length).to.equal(2);
    expect(files[1].id).to.equal(2);
    expect(files[1].isPrivate).to.equal(true);

  });

  it("Should retrieve files", async () => {
    const FileSpace = await hre.ethers.getContractFactory("FileSpace");
    const fileSpace = await FileSpace.deploy();

    await fileSpace.deployed();

    await fileSpace.uploadFile('QmXy', 'The File', '2021-10-18', false);
    await fileSpace.uploadFile('QmJy', 'The New File', '2021-10-18', true);

    const files = await fileSpace.retrieveFiles();

    expect(files.length).to.equal(2);
    let [k, m] = files.map((file) => file.fileName);

    expect(k).to.equal('The File');
    expect(m).to.equal('The New File');

  });


  it("Should share files", async () => {
    const FileSpace = await hre.ethers.getContractFactory("FileSpace");
    const fileSpace = await FileSpace.deploy();

    await fileSpace.deployed();

    await fileSpace.uploadFile('QmJy', 'The New File', '2021-10-18', true);

    await fileSpace.shareFile(1, '0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f');

    const files = await fileSpace.retrieveFiles();

    let uploader = files[0].uploadedBy;

    let check = false;

    for (let add of files[0].sharedWith) {
      if (add.toLowerCase() === '0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f') check = true; return;
    }

    expect(uploader.toLowerCase()).to.equal('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266');
    expect(check).to.equal(true);

  });


  it("Should make file private", async () => {
    const FileSpace = await hre.ethers.getContractFactory("FileSpace");
    const fileSpace = await FileSpace.deploy();

    await fileSpace.deployed();

    await fileSpace.uploadFile('QmXy', 'The File', '2021-10-18', false);

    await fileSpace.privatizeFile(1);

    const file = await fileSpace.retrieveFiles();



    expect(file[0].isPrivate).to.equal(true);

  });


  it("Should make file public", async () => {
    const FileSpace = await hre.ethers.getContractFactory("FileSpace");
    const fileSpace = await FileSpace.deploy();

    await fileSpace.deployed();

    await fileSpace.uploadFile('QmXy', 'The File', '2021-10-18', true);

    await fileSpace.publicizeFile(1);

    const file = await fileSpace.retrieveFiles();



    expect(file[0].isPrivate).to.equal(false);

  });
  
})