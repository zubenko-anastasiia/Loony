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

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  
////////////////////////////////////////////////////////////////////////////////////////
  


////////////////////////////////////////////////////////////////////////////////////////
const SwapExactInputSingle = async () => {
    try {
      setIsLoading(true);

      const swapContract = createEthereumContract();

      

      const tx = await swapContract.swapExactInputSingle(
        formData.amountIn
      );
      await tx.wait();

      console.log('Swap successful!');
    } catch (error) {
      console.error('Error during swapExactInputSingle:', error.message);
    } finally {
      setIsLoading(false);
    }
  };
 

////////////////////////////////////////////////////////////////////////////////////////

  return (
    <SwapContext.Provider
      value={{
        
        currentAccount,
        isLoading,
        SwapExactInputSingle,
        handleChange,
        formData,
      }}
    >
      {children}
    </SwapContext.Provider>
  );
}