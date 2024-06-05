const { expect } = require("chai");

describe("EduNFT", function () {
    let EduNFT, eduNFT, owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        EduNFT = await ethers.getContractFactory("EduNFT");
        eduNFT = await EduNFT.deploy();
        await eduNFT.deployed();
    });

    it("Should create and assign an NFT", async function () {
        const tokenURI = "https://example.com/nft/1";
        await eduNFT.createNFT(owner.address, tokenURI);
        expect(await eduNFT.tokenCounter()).to.equal(1);
        expect(await eduNFT.tokenURI(0)).to.equal(tokenURI);
    });

    it("Should only allow the owner to create an NFT", async function () {
        const tokenURI = "https://example.com/nft/2";
        await expect(
            eduNFT.connect(addr1).createNFT(addr1.address, tokenURI)
        ).to.be.revertedWith("Ownable: caller is not the owner");
    });
});
