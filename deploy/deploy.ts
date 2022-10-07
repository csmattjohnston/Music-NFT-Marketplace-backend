import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/dist/types"
import { frontEndContractsDir } from "../helper-hardhat-config"
import "dotenv"
import fs from "fs"

const deployContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    // @ts-ignore
    const { getNamedAccounts, ethers, deployments } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const toWei = (num) => ethers.utils.parseEther(num.toString())
    let royaltyFee = toWei(0.01)
    let args = [royaltyFee, deployer]
    const musicNFTs = await deploy("MusicNFTs", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: 1,
    })
    saveFrontendFiles(musicNFTs, "musicNFTs")
}

function saveFrontendFiles(contract, name) {
    if (!fs.existsSync(frontEndContractsDir)) {
        fs.mkdirSync(frontEndContractsDir)
    }
    fs.writeFileSync(
        frontEndContractsDir + `/${name}-address.json`,
        JSON.stringify({ address: contract.address }, undefined, 2)
    )
    fs.writeFileSync(frontEndContractsDir + `/${name}.json`, JSON.stringify(contract.abi, null, 2))
    console.log("Front End Written!")
}

export default deployContract
deployContract.tags = ["all"]
