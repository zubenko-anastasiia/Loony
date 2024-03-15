import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { SingleSwapABI, singleSwapAddress } from "../utils/constantsSwap";

export const SwapContext = React.createContext();

const { ethereum } = window;
const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const swapContract = new ethers.Contract(singleSwapAddress, SingleSwapABI, signer);
  return swapContract;
};

export const SwapProvider = ({ children }) => {

  const [formData, setformData] = useState({amountIn: ""});
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const routerAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
  const linkAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
  const wethAddress = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  
////////////////////////////////////////////////////////////////////////////////////////
const swapExactInputSingle = async (amountIn) => {
  try {
    setIsLoading(true);

    const parsedAmount = ethers.utils.parseEther(amountIn);


    const swapContract = createEthereumContract();
    
    const tx = await swapContract.swapExactInputSingle(
      parsedAmount,
      linkAddress,
      wethAddress
    );
    const receipt = await tx.wait();
    
    const event = receipt.events.find(e => e.event === "Transfer");
    const amountOut = ethers.utils.formatEther(event.args.value);

    console.log('Swap successful!');

    return amountOut;
  } catch (error) {
    console.error('Error during swapExactInputSingle:', error.message);
    throw error;
  } finally {
    setIsLoading(false);
  }
};
////////////////////////////////////////////////////////////////////////////////////////
const sendOutputBack = async (amount) => {
  try {
    setIsLoading(true);
    const parsedAmount = ethers.utils.parseEther(amount);
    const swapContract = createEthereumContract();
    return await swapContract.sendOutputBack(parsedAmount, wethAddress);
  } catch (error) {
    console.error('Error during sending output back:', error.message);
    throw error;
  } finally {
    setIsLoading(false);
  }
};
////////////////////////////////////////////////////////////////////////////////////////
const approveLink = async (amount) => {
  try {
    setIsLoading(true);
    const parsedAmount = ethers.utils.parseEther(amount);
    const swapContract = createEthereumContract();
    return await swapContract.approveLink(parsedAmount);
  } catch (error) {
    console.error('Error during approving Link:', error.message);
    throw error;
  } finally {
    setIsLoading(false);
  }
};
////////////////////////////////////////////////////////////////////////////////////////
const sendLinkIn = async (amount) => {
  try {
    setIsLoading(true);
    const parsedAmount = ethers.utils.parseEther(amount);

    const swapContract = createEthereumContract();
    return await swapContract.sendLinkIn(parsedAmount);
  } catch (error) {
    console.error('Error during sending Link in:', error.message);
    throw error;
  } finally {
    setIsLoading(false);
  }
};
////////////////////////////////////////////////////////////////////////////////////////

  return (
    <SwapContext.Provider
      value={{
        isLoading,
        swapExactInputSingle,
        handleChange,
        formData,
        sendOutputBack,
        approveLink,
        sendLinkIn
      }}
    >
      {children}
    </SwapContext.Provider>
  );
}