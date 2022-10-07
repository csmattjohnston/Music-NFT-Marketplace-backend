// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MusicNFTs is Ownable, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public artist;
    uint256 public royaltyFee;

    struct MusicTrack {
        uint256 tokenId;
        uint256 price;
        address payable seller;
    }
    MusicTrack[] public musicTracks;

    /** Constructor */
    constructor(uint256 _royaltyFee, address _artist) ERC721("MusicNFT", "MW") {
        royaltyFee = _royaltyFee;
        artist = _artist;
    }

    function mint(string memory _tokenURI, uint256 _price) external onlyOwner {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        musicTracks.push(MusicTrack(newItemId, _price, payable(msg.sender)));
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
    }


    function getAllTracks() external view onlyOwner returns (MusicTrack[] memory) {
        return musicTracks;
    }

    function getCounter() external view onlyOwner returns (uint256) {
        return _tokenIds.current();
    }
    // function withdraw() external onlyOwner {
    //     uint256 amount = address(this).balance;
    //     (bool success, ) = payable(msg.sender).call{value: amount}("");
    //     require(success, "Transfer failed");
    // }
}
