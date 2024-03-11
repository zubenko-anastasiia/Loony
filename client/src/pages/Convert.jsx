import React, { useEffect, useState, useRef, useContext } from 'react'


import { CogIcon, ArrowSmDownIcon } from '@heroicons/react/outline'
import SwapField from '../components/swapComponents/SwapField'
import TransactionStatus from '../components/swapComponents/TransactionStatus'
import toast, { Toaster } from 'react-hot-toast'
import { DEFAULT_VALUE, ETH } from '../components/swapComponents/SupportedCoins'
import { SwapContext } from '../context/SwapContext';
import { TransactionContext } from '../context/TransactionContext';


import {currentAddress} from '../utils/ShortAddress'

import TradingViewWidget from '../components/Chart'

import { useTranslation } from 'react-i18next';

const locales = {
  en: { title: 'English' },
  ua: { title: 'Українська' },
};


export const SwapComponent = ({children}) => {
  const {
  connectWallet,
  isLoading,
  SwapExactInputSingle,
  handleChange,
  formData,} = useContext(SwapContext);
  const {currentAccount } = useContext(TransactionContext);
  
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

const SWAP = 'system.swap'

const { t, i18n } = useTranslation();

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

  const [txPending, setTxPending] = useState(false)

  const notifyError = msg => toast.error(msg, { duration: 6000 })
  const notifySuccess = () => toast.success('Transaction completed.')

  useEffect(() => {
    if (
      document.activeElement !== outputValueRef.current &&
      document.activeElement.ariaLabel !== 'srcToken' &&
      !isReversed.current
    )
    

    setSrcTokenComp(<SwapField obj={srcTokenObj} ref={inputValueRef} />)

    if (inputValue?.length === 0) setOutputValue('')
  }, [inputValue, destToken])

  useEffect(() => {
    if (
      document.activeElement !== inputValueRef.current &&
      document.activeElement.ariaLabel !== 'destToken' &&
      !isReversed.current
    )
      

    setDestTokenComp(<SwapField obj={destTokenObj} ref={outputValueRef} />)

    if (outputValue?.length === 0) setInputValue('')

    if (isReversed.current) isReversed.current = false
  }, [outputValue, srcToken])


return (
    
      <div>
  <div className="flex w-full h-screen justify-center items-center">
    <div className="flex mf:flex-row flex-col  items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
           <div className="w-fit">
           
              <TradingViewWidget srcToken={srcToken} destToken={destToken} />
            
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

      {!currentAccount ? (
                                <button
                                type="button"
                                onClick={connectWallet}
                                className="text-white w-full mt-2  p-2 bg-[#72569c] rounded-full cursor-pointer  hover:bg-[#be8defd5] ">
                                    {t('system.connectAWallet')}
                                </button>
                            ) : (
                                <button
                                type="button"
                                onClick={SwapExactInputSingle}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#be8defd5] rounded-full cursor-pointer  hover:bg-[#be8defd5] ">
                                    {t('buttons.sendTo')}
                                </button>
                            )}
      

      {txPending && <TransactionStatus />}

      <Toaster />
    </div>
    </div>
    </div>
    </div>
    
  )



  function handleReverseExchange(e) {
    isReversed.current = true


    setInputValue(outputValue)
    setOutputValue(inputValue)

    setSrcToken(destToken)
    setDestToken(srcToken)
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

  
}


export default SwapComponent;



















































