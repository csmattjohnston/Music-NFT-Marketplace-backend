import { assert } from "chai"
//@ts-ignore
import { network, deployments, ethers } from "hardhat"
describe("Music NFTs", async () => {
    let deployer, accounts, musicNfts
    beforeEach(async () => {
        accounts = await ethers.getSigners()
        deployer = accounts[0].address
        await deployments.fixture(["all"])
        musicNfts = await ethers.getContract("MusicNFTs", deployer)
        // console.log(musicNfts)
    })
    describe("Construtor", () => {
        it("Sets ERC721 Tokens", async () => {
            assert.equal(await musicNfts.name(), "MusicNFT")
            assert.equal(await musicNfts.symbol(), "MW")
        })
        it("Sets royalty ", async () => {
            const toWei = (num) => ethers.utils.parseEther(num.toString())
            let royaltyFee = toWei(0.01)
            const fee = await musicNfts.royaltyFee()
            assert.equal(fee.toString(), royaltyFee.toString())
        })
        it("Sets artist", async () => {
            const artist = await musicNfts.artist()
            // console.log(artist)
        })
    })
    describe("mint", async () => {
        let price
        beforeEach(async () => {
            const toWei = (num) => ethers.utils.parseEther(num.toString())
            price = toWei(0.01)
            await musicNfts.mint("Test URI", price)
        })
        it("should increment token", async () => {
            const tokenID = await musicNfts.getCounter()
            assert.equal(tokenID, 1)
        })
        it("created new music struct entry", async () => {
            await musicNfts.mint("Test URI2", price)
            const tracks = await musicNfts.getAllTracks()
            assert.equal(tracks.length, 2)
        })
        it("emits a transfer event", async () => {
            let receipt = await (await musicNfts.mint("Test URI2", price)).wait(1)
            assert.equal(receipt.events[0].event, "Transfer")
        })
        it("sets the tokenURI", async () => {
            const tokenID = await musicNfts.getCounter()
            const tokenURI = await musicNfts.tokenURI(tokenID.toString())
            assert.equal(tokenURI, "Test URI")
        })
    })
    describe("getAllTracks", async () => {
        it("get all tracks", async () => {
            const toWei = (num) => ethers.utils.parseEther(num.toString())
            const price = toWei(0.01)
            await musicNfts.mint("Test URI", price)
            let tracks = await musicNfts.getAllTracks()
            assert.equal(tracks.length, 1)
        })
    })
    describe("getCounter", async () => {
        it("gets counter", async () => {
            const toWei = (num) => ethers.utils.parseEther(num.toString())
            const price = toWei(0.01)
            await musicNfts.mint("Test URI", price)
            assert.equal(await musicNfts.getCounter(), 1)
        })
    })
})
