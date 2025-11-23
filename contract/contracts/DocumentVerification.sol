// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DocumentVerification {
    struct Document {
        address uploader;
        uint256 timestamp;
    }

    mapping(bytes32 => Document) public documents;

    event DocumentStored(bytes32 indexed docHash, address indexed uploader, uint256 timestamp);

    function storeDocument(bytes32 docHash) external {
        require(documents[docHash].timestamp == 0, "Document already exists");
        documents[docHash] = Document(msg.sender, block.timestamp);
        emit DocumentStored(docHash, msg.sender, block.timestamp);
    }

   function verifyDocument(bytes32 fileHash) public view returns (bool, address, uint256) {
    if(documents[fileHash].uploader == address(0)) return (false, address(0), 0);
    Document memory doc = documents[fileHash];
    return (true, doc.uploader, doc.timestamp);
}

}
