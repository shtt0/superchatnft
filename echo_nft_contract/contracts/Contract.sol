// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC721Base.sol";
import "@thirdweb-dev/contracts/extension/PermissionsEnumerable.sol";

contract EchoNFT is ERC721Base, PermissionsEnumerable {
    struct MetaData {
        address parentTokenContract;
        uint256 parentTokenId;
        string echoData;
    }

    mapping(uint256 => MetaData) public tokenMetaData;

    constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
    ) ERC721Base(_defaultAdmin, _name, _symbol, _royaltyRecipient, _royaltyBps) {
        _setupRole(DEFAULT_ADMIN_ROLE, _defaultAdmin);
    }

    function mintEchoNFT(address recipient, uint256 tokenId, address parentTokenContract, uint256 parentTokenId, string memory echoData) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _mint(recipient, tokenId);
        tokenMetaData[tokenId] = MetaData(parentTokenContract, parentTokenId, echoData);
    }
}
