import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { transactionsABI, transactionsAddress } from "../utils/constantsTransaction";
import { getBalanceABI, getBalanceAddress } from "../utils/constantsBalance";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumTransactionContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(transactionsAddress, transactionsABI, signer);

  return transactionsContract;
};
const createEthereumBalanceContract = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  await provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();
  const balanceContract = new ethers.Contract(getBalanceAddress, getBalanceABI, signer);

  return balanceContract;
};
export const TransactionsProvider = ({ children }) => {

  const [formData, setformData] = useState({ addressTo: "", amount: "",message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [wETHBalance, setWETHBalance] = useState();
  const [linkBalance, setLinkBalance] = useState();
  const [clientBalance, setClientBalance] = useState(0);


  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  
////////////////////////////////////////////////////////////////////////////////////////
  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };
////////////////////////////////////////////////////////////////////////////////////////
  
////////////////////////////////////////////////////////////////////////////////////////
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      
      window.location.reload();
      const balanceContract = createEthereumBalanceContract();
        const initialWETHBalance = await balanceContract.getWETHBalanceClient();
        const ititialLINKBalance = await balanceContract.getLINKBalanceClient();
        setWETHBalance(initialWETHBalance.toString());
        setLinkBalance(ititialLINKBalance.toString());
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };
////////////////////////////////////////////////////////////////////////////////////////
const disconnectWallet = async () => {
  try {
      setCurrentAccount(null);
      window.location.reload(); 
  } catch (error) {
      console.log(error);
      throw new Error("Error disconnecting wallet");
  }
};
////////////////////////////////////////////////////////////////////////////////////////
  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount,message } = formData;
        const transactionsContract = createEthereumTransactionContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          }],
        });

        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    
  });
////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////BALANCES/////////////////////////////////////////////////
useEffect(() => {
  const fetchBalances = async () => {
    try {
      if (ethereum) {
        const balanceContract = createEthereumBalanceContract();
        const initialWETHBalance = await balanceContract.getWETHBalanceClient();
        const initialLINKBalance = await balanceContract.getLINKBalanceClient();
        setWETHBalance(initialWETHBalance.toString());
        setLinkBalance(initialLINKBalance.toString());
      }
    } catch (error) {
      console.error('Error fetching balances:', error.message);
    }
  };

  fetchBalances();
}, []);

  

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        setIsLoading,
        sendTransaction,
        handleChange,
        formData,
        disconnectWallet,
        wETHBalance,
        linkBalance,
        clientBalance
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};