import React, { useEffect, useState, useRef, useContext } from 'react'
import {
  hasValidAllowance,
  increaseAllowance,
  swapEthToToken,
  swapTokenToEth,
  swapTokenToToken,
} from '../utils/queries'

import { CogIcon, ArrowSmDownIcon } from '@heroicons/react/outline'
import SwapField from '../components/swapComponents/SwapField'
import TransactionStatus from '../components/swapComponents/TransactionStatus'
import toast, { Toaster } from 'react-hot-toast'
import { DEFAULT_VALUE, ETH } from '../components/swapComponents/SupportedCoins'
import { toEth, toWei } from '../utils/ether-utils'
import { TransactionContext } from '../context/TransactionContext';
import {currentAddress} from '../utils/ShortAddress'
import TradingViewWidget from '../components/Chart'

import { useTranslation } from 'react-i18next';

const locales = {
  en: { title: 'English' },
  ua: { title: 'Українська' },
};

export const ConnectToChartContext = React.createContext();


export const SwapComponent = ({children}) => {
  const {
  connectWallet,
  currentAccount,
  isLoading,
  sendTransaction,
  handleChange,
  formData} = useContext(TransactionContext);
//////////////////////////////////////////////////////////////
  const  Address = currentAddress(currentAccount) ;
///////////////////////////////////////////////////
  const [srcToken, setSrcToken] = useState(ETH)
  const [destToken, setDestToken] = useState(DEFAULT_VALUE)

  const [inputValue, setInputValue] = useState()
  const [outputValue, setOutputValue] = useState()

  const inputValueRef = useRef()
  const outputValueRef = useRef()

  const isReversed = useRef(false)

  const INCREASE_ALLOWANCE = 'Increase allowance'
  const ENTER_AMOUNT = 'Enter an amount'
  const CONNECT_WALLET = 'Connect wallet'
  const SWAP = 'Swap'

  const srcTokenObj = {
    id: 'srcToken',
    value: inputValue,
    setValue: setInputValue,
    defaultValue: srcToken,
    ignoreValue: destToken,
    setToken: setSrcToken,
  }

  const destTokenObj = {
    id: 'destToken',
    value: outputValue,
    setValue: setOutputValue,
    defaultValue: destToken,
    ignoreValue: srcToken,
    setToken: setDestToken,
  }

  const [srcTokenComp, setSrcTokenComp] = useState()
  const [destTokenComp, setDestTokenComp] = useState()

  const [swapBtnText, setSwapBtnText] = useState(ENTER_AMOUNT)
  const [txPending, setTxPending] = useState(false)

  const notifyError = msg => toast.error(msg, { duration: 6000 })
  const notifySuccess = () => toast.success('Transaction completed.')


  useEffect(() => {

    if (!currentAccount) setSwapBtnText(CONNECT_WALLET)
    else if (!inputValue || !outputValue) setSwapBtnText(ENTER_AMOUNT)
    else setSwapBtnText(SWAP)
  }, [inputValue, outputValue, Address])

  useEffect(() => {
    if (
      document.activeElement !== outputValueRef.current &&
      document.activeElement.ariaLabel !== 'srcToken' &&
      !isReversed.current
    )
      populateOutputValue(inputValue)

    setSrcTokenComp(<SwapField obj={srcTokenObj} ref={inputValueRef} />)

    if (inputValue?.length === 0) setOutputValue('')
  }, [inputValue, destToken])

  useEffect(() => {
    if (
      document.activeElement !== inputValueRef.current &&
      document.activeElement.ariaLabel !== 'destToken' &&
      !isReversed.current
    )
      populateInputValue(outputValue)

    setDestTokenComp(<SwapField obj={destTokenObj} ref={outputValueRef} />)

    if (outputValue?.length === 0) setInputValue('')

    if (isReversed.current) isReversed.current = false
  }, [outputValue, srcToken])

  const { t, i18n } = useTranslation();

  return (
    <ConnectToChartContext.Provider value={{srcToken, destToken}}>
      <div>
  <div className="flex w-full h-screen justify-center items-center">
    <div className="flex mf:flex-row flex-col  items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
           <div className="w-fit">
            
              <TradingViewWidget/>
            </div>
          </div>


    <div className='blue-glassmorphism w-[35%] p-4 px-6 rounded-xl'>
      
      <div className="p-5 justify-center text-center font-bold text-2xl text-zinc-800">{t('system.exchange')}</div>

        
      
      <div className='relative bg-[#2124291d] p-8 py-6 rounded-xl mb-2 border-[2px] border-transparent hover:border-gray-700'>
        {srcTokenComp}

        <ArrowSmDownIcon
          className='absolute left-1/2 -translate-x-1/2 -bottom-6 h-10 p-1 bg-[#212429] border-4 border-zinc-900 text-zinc-300 rounded-xl cursor-pointer hover:scale-110'
          onClick={handleReverseExchange}
        />
      </div>

      <div className='bg-[#2124291d] p-8 py-6 rounded-xl mt-2 border-[2px] border-transparent hover:border-gray-700'>
        {destTokenComp}
      </div>

      <button
        className={getSwapBtnClassName()}
        onClick={() => {
          if (swapBtnText === INCREASE_ALLOWANCE) handleIncreaseAllowance()
          else if (swapBtnText === SWAP) handleSwap()
        }}
      >
        {swapBtnText}
      </button>
      

      {txPending && <TransactionStatus />}

      <Toaster />
    </div>
    </div>
    </div>
    </div>
    </ConnectToChartContext.Provider>
  )

  async function handleSwap() {
    if (srcToken === ETH && destToken !== ETH) {
      performSwap()
    } else {
      setTxPending(true)
      const result = await hasValidAllowance(Address, srcToken, inputValue)
      setTxPending(false)

      if (result) performSwap()
      else handleInsufficientAllowance()
    }
  }

  async function handleIncreaseAllowance() {
    setTxPending(true)
    await increaseAllowance(srcToken, inputValue)
    setTxPending(false)

    setSwapBtnText(SWAP)
  }

  function handleReverseExchange(e) {
    isReversed.current = true


    setInputValue(outputValue)
    setOutputValue(inputValue)

    setSrcToken(destToken)
    setDestToken(srcToken)
  }

  function getSwapBtnClassName() {
    let className = 'p-4 w-full my-2 rounded-xl'
    className +=
      swapBtnText === ENTER_AMOUNT || swapBtnText === CONNECT_WALLET
        ? ' text-zinc-400 bg-zinc-800 pointer-events-none'
        : ' bg-blue-700'
    className += swapBtnText === INCREASE_ALLOWANCE ? ' bg-yellow-600' : ''
    return className
  }

  function populateOutputValue() {
    if (
      destToken === DEFAULT_VALUE ||
      srcToken === DEFAULT_VALUE ||
      !inputValue
    )
      return

    try {
      if (srcToken !== ETH && destToken !== ETH) setOutputValue(inputValue)
      else if (srcToken === ETH && destToken !== ETH) {
        const outValue = toEth(toWei(inputValue), 14)
        setOutputValue(outValue)
      } else if (srcToken !== ETH && destToken === ETH) {
        const outValue = toEth(toWei(inputValue, 14))
        setOutputValue(outValue)
      }
    } catch (error) {
      setOutputValue('0')
    }
  }

  function populateInputValue() {
    if (
      destToken === DEFAULT_VALUE ||
      srcToken === DEFAULT_VALUE ||
      !outputValue
    )
      return

    try {
      if (srcToken !== ETH && destToken !== ETH) setInputValue(outputValue)
      else if (srcToken === ETH && destToken !== ETH) {
        const outValue = toEth(toWei(outputValue, 14))
        setInputValue(outValue)
      } else if (srcToken !== ETH && destToken === ETH) {
        const outValue = toEth(toWei(outputValue), 14)
        setInputValue(outValue)
      }
    } catch (error) {
      setInputValue('0')
    }
  }

  async function performSwap() {
    setTxPending(true)

    let receipt

    if (srcToken === ETH && destToken !== ETH)
      receipt = await swapEthToToken(destToken, inputValue)
    else if (srcToken !== ETH && destToken === ETH)
      receipt = await swapTokenToEth(srcToken, inputValue)
    else receipt = await swapTokenToToken(srcToken, destToken, inputValue)

    setTxPending(false)

    if (receipt && !receipt.hasOwnProperty('transactionHash'))
      notifyError(receipt)
    else notifySuccess()
  }

  function handleInsufficientAllowance() {
    notifyError(
      "Insufficient allowance. Click 'Increase allowance' to increase it.",
    )
    setSwapBtnText(INCREASE_ALLOWANCE)
  }
}

export const connectToChart=(tokenA, tokenB)=>{
  let chart
  if(tokenA=='ETH'&&tokenB=='USDT')
    chart='ETHUSDT'
  else if(tokenA=='ETH'&&tokenB=='USDT')
  chart='ETHUSDT'
  else if(tokenA=='ETH'&&tokenB=='USDT')
  chart='ETHUSDT'
}

export default SwapComponent;



















































