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


