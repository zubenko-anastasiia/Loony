// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";


interface IERC20 {
    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract SingleSwap {
    address public constant routerAddress =
        0xE592427A0AEce92De3Edee1F18E0157C05861564;
    ISwapRouter public immutable swapRouter = ISwapRouter(routerAddress);

    address public constant LINK = 0x326C977E6efc84E512bB9C30f76E30c160eD06FB;
    address public constant WETH = 0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6;
    address public constant UNI = 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984;
    address public constant DAI = 0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844;


    event Transfer(address token, address from, address to, uint256 value);

    IERC20 public wethToken = IERC20(WETH);
    IERC20 public linkToken = IERC20(LINK);
    IERC20 public uniToken = IERC20(UNI);
    IERC20 public daiToken = IERC20(DAI);



    bool public isApproved;

    uint24 public constant poolFee = 3000;

    constructor() {}

    function swapExactInputSingle(uint256 amountIn, address tokenIn, address tokenOut)
        external
        returns (uint256 amountOut)
    {
        linkToken.approve(address(swapRouter), amountIn);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                fee: poolFee,
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        amountOut = swapRouter.exactInputSingle(params);
    }

    
    
    function getWETHBalance() external view returns (uint256) {
        return IERC20(WETH).balanceOf(address(this));
    }
    function getLINKBalance() external view returns (uint256) {
        return IERC20(LINK).balanceOf(address(this));
    }
    

    function getWETHBalanceClient() external view returns (uint256) {
        return IERC20(WETH).balanceOf(msg.sender);
    }
    function getLINKBalanceClient() external view returns (uint256) {
        return IERC20(LINK).balanceOf(msg.sender);
    }
    

    function sendOutputBack(uint256 amount, address token) external {
        require(IERC20(token).balanceOf(address(this)) >= amount, "Insufficient balance");
        IERC20(token).transfer(msg.sender, amount);
    }


    function approveLink(uint256 amount) external {
        linkToken.approve(address(this), amount);
        isApproved = true;
    }


    function sendLinkIn(uint256 amount) external payable  {
        require(isApproved, "Approval not received yet");
        require(linkToken.balanceOf(msg.sender) >= amount, "Insufficient balance");
        linkToken.transferFrom(msg.sender, address(this), amount);
    }

    struct TransferStruct{
        address sender;
        address receiver;
        uint amount; 
    }

    TransferStruct[] transactions;

    function transferIn(address token, uint256 value)external payable  {
        transactions.push(TransferStruct(msg.sender, address(this), value));

        emit Transfer(token, msg.sender, address(this), value);
    }  
    
    function transferToken(address token, uint256 value) external payable  {
    IERC20(token).transfer(address(this), value);
    emit Transfer(token, msg.sender, address(this), value); 
    }
}