// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MyNFT is ERC721Enumerable {
    struct MetaData {
        string liveUrl;
        address liverAddress;
        string timeStamp;
        uint256 amount;
    }

    mapping(uint256 => MetaData) public tokenMetaData;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    function mintNFT(
        address recipient, 
        uint256 tokenId, 
        string memory liveUrl, 
        address liverAddress, 
        string memory timeStamp
    ) public payable {
        require(msg.value > 0, "Eth amount must be greater than 0");

        _mint(recipient, tokenId);
        tokenMetaData[tokenId] = MetaData(liveUrl, liverAddress, timeStamp, msg.value);

        (bool sent, ) = liverAddress.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

    function mintEchoNFT(uint256 parentTokenId, uint256 echoTokenId1, uint256 echoTokenId2, address recipient) public {
        require(_exists(parentTokenId), "Parent NFT does not exist");

        MetaData memory parentMetaData = tokenMetaData[parentTokenId];

        // Mint first Echo NFT to recipient
        _mint(recipient, echoTokenId1);
        tokenMetaData[echoTokenId1] = MetaData(
            parentMetaData.liveUrl,
            parentMetaData.liverAddress,
            parentMetaData.timeStamp,
            0 // No ETH amount associated with Echo NFT
        );

        // Mint second Echo NFT to owner of parent NFT
        address parentOwner = ownerOf(parentTokenId);
        _mint(parentOwner, echoTokenId2);
        tokenMetaData[echoTokenId2] = MetaData(
            parentMetaData.liveUrl,
            parentMetaData.liverAddress,
            parentMetaData.timeStamp,
            0 // No ETH amount associated with Echo NFT
        );
    }

    function getNFTs(address owner) public view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(owner, i);
        }
        return tokenIds;
    }

    function getMetaData(uint256 tokenId) public view returns (MetaData memory) {
        require(_exists(tokenId), "Token ID does not exist");
        return tokenMetaData[tokenId];
    }
}
