import { NFTStorage, File } from "nft.storage"
import path from "path"
import mime from "mime"
import fs from "fs"
const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY
import { getAudioDurationInSeconds } from "get-audio-duration"
/**
 * Reads an audio file from `audioPath` and stores an NFT with the given name and description.
 * @param {string} audioPath the path to an audio file
 * @param {string} name a name for the NFT
 * @param {string} description a text description for the NFT
 */
export async function uploadToNFTStorage(
    audioPath: string,
    imagePath: string,
    description: string
) {
    const fullAudioPath = path.resolve(audioPath)
    let file = await fileFromPath(fullAudioPath)
    let image = await fileFromPath(imagePath)
    let duration = await getDuration(fullAudioPath)
    const client = new NFTStorage({ token: NFT_STORAGE_KEY! })
    const metadata = await client.store({
        name: file.name,
        description: description,
        image: image,
        properties: {
            audio: file,
            title: "track 2",
            albumTitle: "album 2",
            artist: "Artist",
            bpm: "bpm 1",
            key: "c major",
            releaseDate: "soon",
            previewTimeStamp: "02:23",
            explicit: "false",
            genre: "HipHop",
            duration: duration,
        },
    })
    const cid = metadata.ipnft
    const url = metadata.url
    return { cid, url, file }
}

/**
 * A helper to read a file from a location on disk and return a File object.
 * Note that this reads the entire file into memory and should not be used for
 * very large files.
 * @param {string} filePath the path to a file to store
 * @returns {File} a File object containing the file content
 */
async function fileFromPath(filePath: string) {
    const content = await fs.promises.readFile(filePath)
    const basename = path.basename(filePath)
    // console.log(basename)
    const type = mime.getType(basename)
    // console.log(type)
    return new File([content], basename, { type: type })
}
async function getDuration(audioPath: string) {
    let duration = await getAudioDurationInSeconds(audioPath).then((duration) => {
        // console.log(duration)
        return duration
    })

    return duration
}
