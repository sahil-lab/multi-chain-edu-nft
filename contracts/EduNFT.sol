pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EduNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("EduNFT", "EDU") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function createNFT(address student, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newItemId = tokenCounter;
        _mint(student, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenCounter++;
        return newItemId;
    }
}