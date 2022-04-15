//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileSpace {
    /**
    Implementation of the FileSpace contract.
    BlockChain database for the Decentralized File System Metastore.
     */

    /// Struct to define the structure of a file metadata record entity.
    struct fileInfo {
        uint id;
        string CID;
        string fileName;
        string uploadDate;
        address uploadedBy;
        bool isPrivate;
        address[] sharedWith;
    }

    /// Definition of array to hold all records
    fileInfo[] private allFiles;

    event SharedFile(uint indexed fileID, string CID, address to);
    event UploadedFile(uint indexed fileID, string CID, string fileName);
    event MadePublic(uint fileID, string CID, string fileName);
    event MadePrivate(uint fileID, string CID, string fileName);


    constructor() {
    }


    /// upload file metadata after getting CID from IPFS on the Front End
    function uploadFile(string memory _CID, string memory _fileName, string memory _uploadDate, bool _isPrivate) public {
        uint id_ = allFiles.length + 1;
        allFiles.push(fileInfo({id: id_, CID: _CID, fileName: _fileName, uploadDate: _uploadDate, uploadedBy: msg.sender, isPrivate: _isPrivate, sharedWith: new address[](0)}));
        emit UploadedFile(id_, _CID, _fileName);
    }

    /// Share files that are private to user to other users, but not the same user.
    function shareFile(uint fileID, address to) public {
        require(allFiles[fileID - 1].isPrivate == true, "Only private files can be shared");
        require(msg.sender != to, "You can't share to yourself");
        allFiles[fileID - 1].sharedWith.push(to);
        emit SharedFile(fileID, allFiles[fileID - 1].CID, to);
    }

    /// return all file metadata
    function retrieveFiles() public view returns (fileInfo[] memory) {
        return allFiles;
    }

    /// function for updating boolean contract states
    function updateBool(uint fileID, bool val) private {
        allFiles[fileID - 1].isPrivate = val;
    }

    /// Change a public file to Private Visibility
    function privatizeFile(uint fileID) public {
        require(allFiles[fileID - 1].isPrivate == false, "This file is already private");
        updateBool(fileID, true);
        emit MadePrivate(fileID, allFiles[fileID - 1].CID, allFiles[fileID].fileName);
    }

    /// Change a private file to Public visibility. Will also unshare from previously shared users.
    function publicizeFile(uint fileID) public {
        require(allFiles[fileID - 1].isPrivate == true, "This file is already public");
        allFiles[fileID - 1].sharedWith = new address[](0);
        updateBool(fileID, false);
        emit MadePublic(fileID, allFiles[fileID - 1].CID, allFiles[fileID].fileName);
    }


    


}