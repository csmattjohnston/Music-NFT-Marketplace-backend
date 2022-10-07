//@ts-ignore
import { network } from "hardhat"

function sleep(timeInMs: number) {
    return new Promise((resolve) => setTimeout(resolve, timeInMs))
}

export async function moveBlocks(amount: number, sleepAmount = 0) {
    if (network.config.chainId == 31337) {
        console.log("Moving blocks...")
        for (let index = 0; index < amount; index++) {
            await network.provider.request({
                method: "evm_mine",
                params: [],
            })
            if (sleepAmount) {
                console.log(`Sleeping for ${sleepAmount}`)
                await sleep(sleepAmount)
            }
        }
        console.log(`Moved ${amount} blocks`)
    }
}
