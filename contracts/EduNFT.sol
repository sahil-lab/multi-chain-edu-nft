// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EduNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    constructor() ERC721("EduNFT", "EDU") Ownable() {}

    function mintNFT(
        address student,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _mint(student, tokenId);
        _setTokenURI(tokenId, tokenURI);
        _tokenIdCounter += 1;
        return tokenId;
    }
}
