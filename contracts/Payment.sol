// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Payment {
    function pay(address token, address recipient, uint256 amount) external {
        IERC20(token).transferFrom(msg.sender, recipient, amount);
    }
}
