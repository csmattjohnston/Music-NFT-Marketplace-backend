import { networkConfig, frontEndJsonFile } from "../helper-hardhat-config"
import { uploadToNFTStorage } from "../utils/uploadToNFTStorage"
import { moveBlocks } from "../utils/move-blocks"
//@ts-ignore
import { getNamedAccounts, ethers, network } from "hardhat"
import fs from "fs-extra"

const AUDIO_PATH = networkConfig[network.name!.toString()].filePath!
const IMAGE_PATH = networkConfig[network.name!.toString()].defaultImagePath!

enum ASSET_TYPE {
    VIDEO = "Video",
    TRACK = "Track",
}
export async function uploadAndMintAsset() {
    let num = await getRandomInt(100)
    let { cid, url, file } = await uploadToNFTStorage(AUDIO_PATH, IMAGE_PATH, num)
    await saveAssetToJSON(url, file.name, ASSET_TYPE.TRACK)
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max).toString()
}

async function saveAssetToJSON(metadataUrl: string, fileName: string, assetType: string) {
    if (metadataUrl) {
        let deployedAssets = fs.readJsonSync(frontEndJsonFile, { throws: false })
        let json = JSON.stringify({ type: assetType, filename: fileName, url: metadataUrl })
        let jsonFiles: Array<string> = []
        const toWei = (num) => ethers.utils.parseEther(num.toString())
        let trackPrice = toWei(0.01)

        if (deployedAssets == null || !deployedAssets.includes(json)) {
            jsonFiles.push(json)
            deployedAssets.push(...jsonFiles)
            fs.writeFileSync(frontEndJsonFile, JSON.stringify(deployedAssets), (err) => {
                console.log("ERROR: ", err)
            })
            console.log(`Yay! ${json} written to json`)
            await mintAsset(metadataUrl, trackPrice.toString(), assetType)
        } else {
            console.log(`${json} already exists`)
        }
    }
}

async function mintAsset(metadataUrl: string, price: string, assetType: string) {
    const { deployer } = await getNamedAccounts()
    let musicNFTcontract = await ethers.getContract("MusicNFTs", deployer)
    let receipt = await (await musicNFTcontract.mint(metadataUrl, price)).wait(1)
    await moveBlocks(1, 1000)
    console.log(`${assetType} minted to: ${receipt.events[0].args.to}`)
    console.log(`Token ID: ${receipt.events[0].args.tokenId}`)
}

uploadAndMintAsset()
    .then(() => process.exit(0))
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })
