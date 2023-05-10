//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./ERC721OnChainMetadata.sol";

contract OnChainToken is ERC721OnChainMetadata {
    constructor() ERC721OnChainMetadata("ERC721OnChainMetadata Example 1", "Ex1") {}

    function mint(uint256 tokenId, string memory name, string memory description, string memory image, string memory url) public {
        _setValue(tokenId, key_token_name, abi.encode(name));
        _setValue(tokenId, key_token_description, abi.encode(description));
        _setValue(tokenId, key_token_image, abi.encode(image));
        _setValue(tokenId, key_token_animation_url, abi.encode(url));

        _safeMint(_msgSender(), tokenId, "");
    }
}
