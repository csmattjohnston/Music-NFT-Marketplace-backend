Decentralized Music Website 👍


Install Steps
1. Download NPM/Yarn (I use Yarn)
2. Install Hardhat - "yarn add hardhat" or "npx install hardhat"
3. In the terminal, run "npx install" in VS Code or "yarn" to install project depdencies from package.json
4. Create a .env file that stores the NFT_STORAGE_KEY used in utils/uploadToNFTStorage.ts (example file (.envexample) provided)
5. Start a Hardhat node by running "yarn hardhat node" in terminal. This will spin up fake etherum accounts to use in localhost
6. Create a new tab in the terminal (keep the node running from step 5) and run "yarn hardhat run scripts/uploadAndMintAsset.ts --network localhost"
7. This will upload an asset to NFT Storage and also mint it to the deployer account (first account from step 5)
8. Currently, thats all this app does at the moment






Developer Notes:

1. Create NFT contract ✅
2. Create NFT Metadata ✅
    Modularize the metadata for tracks
    Modularize the metadata for website content✅
3. Upload a track to NFT STorage 



Website Content 

Assets
    Content
        Logo
    Videos
        Video 1
            Metadata
        Video 2
            Metadata
        Video 3
            Metadata
    Tracks
        Track 1
            Metadata
        Track 2 
            Metadata
        Track 3
            Metadata














Front End - Pages:


Home (Public) - Display a card layout of recent tracks
    1. Users can mint a track for 0.001 ETH to listen to full track

How To Page (Public) - Page to show users how to listen to the track by installing metamask

About (Public) - Display an image and a paragraph description

Upload (Admin) - Ability to upload new NFTs to the website and add them to a queue
1. Ability to upload audio file, description, and image to Pinata 
2. Create meta data from the information
3. Set the owner to myself

Site can be goverened by a DAO:
    1. Release the track automatically by using a chainlink keepers 
    2. DAO should look in the queue for new items


  enum Genres {
        HIPHOP,
        POP,
        DUBSTEP,
        BALLAD
    }
    
    //Track
    struct SingleTrack {
        uint256 tokenId;
        uint256 price;
        string description;
        string title;
        string albumTitle;
        address artist;
        TrackProperties properties;
    }

    struct TrackProperties {
        uint256 bpm;
        uint256 key;
        uint256 releaseDate;
        uint256 previewTimeStamp;
        bool explicit;
        Genres genre;
    }






1. For each file in the assets folder, upload a single audio file to Pinata/NFT Storage and get or create the ipfs url
2. Create a corresponding json file for each file

  logo.json

    {
    "name": "Logo",
    "description": "Logo",
    "image": "https://bafybeibmgxo7bylbqbkcnd2l7hvfg3f6bvf2ranijz6nsygeonk5aqpk7y.ipfs.nftstorage.link/"
    }


    FX.json

    {
    "name": "FX",
    "description": "Music Track",
    "audio": "https://bafybeibmgxo7bylbqbkcnd2l7hvfg3f6bvf2ranijz6nsygeonk5aqpk7y.ipfs.nftstorage.link/"
    }

3. Create a CAR file by combining the newly created json files
4. Upload the CAR file to NFT Storage and retreive the url
5. This url can be stored on chain in the smart contract tokenURI

