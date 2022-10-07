export interface networkConfigItem {
    filePath?: string
    defaultImagePath?: string
    blockConfirmations?: number
}

export interface networkConfigInfo {
    [key: string]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    localhost: {
        filePath: "assets/samples/FX3.wav",
        defaultImagePath: "assets/content/pexel.jpeg",
    },
    goerli: {},
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    // Default one is ETH/USD contract on Kovan
    kovan: {
        blockConfirmations: 6,
    },
}

export const developmentChains = ["hardhat", "localhost"]
export const frontEndContractsDir = "../static-website/src/frontend/contractsData"
export const frontEndJsonFile = "../static-website/src/frontend/contractsData/deployedAssets.json"
