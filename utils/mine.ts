import { moveBlocks } from "./move-blocks"

const BLOCKS = 5

export async function mine() {
    await moveBlocks(BLOCKS)
}

// mine()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error)
//         process.exit(1)
//     })
