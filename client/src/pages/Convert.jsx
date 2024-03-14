import React, { useEffect, useState, useRef, useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useTranslation } from 'react-i18next';

import {ArrowSmDownIcon } from '@heroicons/react/outline'

import SwapField from '../components/swapComponents/SwapField'
import TransactionStatus from '../components/swapComponents/TransactionStatus'
import { DEFAULT_VALUE, ETH, LINK} from '../components/swapComponents/SupportedCoins'
import {currentAddress} from '../utils/ShortAddress'

import TradingViewWidget from '../components/Chart'

import { SwapContext } from '../context/SwapContext';
import { TransactionContext } from '../context/TransactionContext';


const locales = {
  en: { title: 'English' },
  ua: { title: 'Українська' },
};


export const SwapComponent = ({children}) => {
 const { t, i18n } = useTranslation(); 
 
 const {
  connectWallet,
  isLoading,
  setIsLoading,
  SwapExactInputSingle,
  sendOutputBack,
   approveLink,
   sendLinkIn} = useContext(SwapContext);
  const {currentAccount, wETHBalance, linkBalance, clientBalance } = useContext(TransactionContext);
    
  const [srcToken, setSrcToken] = useState(LINK)
  const [destToken, setDestToken] = useState(ETH)
  const [inputValue, setInputValue] = useState()
  const [outputValue, setOutputValue] = useState()
  const [srcTokenComp, setSrcTokenComp] = useState()
  const [destTokenComp, setDestTokenComp] = useState()

  const [txPending, setTxPending] = useState(false)

  const inputValueRef = useRef()
  const outputValueRef = useRef()

  const isReversed = useRef(false)

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

  useEffect(() => {
    if (
      document.activeElement !== outputValueRef.current &&
      document.activeElement.ariaLabel !== 'srcToken' &&
      !isReversed.current)
        setSrcTokenComp(<SwapField obj={srcTokenObj} ref={inputValueRef} />)
    if (inputValue?.length === 0) 
      setOutputValue('')
  }, [inputValue, destToken])

  useEffect(() => {
    if (
      document.activeElement !== inputValueRef.current &&
      document.activeElement.ariaLabel !== 'destToken' &&
      !isReversed.current)
        setDestTokenComp(<SwapField obj={destTokenObj} ref={outputValueRef} />)
    if (outputValue?.length === 0) 
      setInputValue('')
    if (isReversed.current) isReversed.current = false
  }, [outputValue, srcToken])

  function handleReverseExchange(e) {
    isReversed.current = true
    setInputValue(outputValue)
    setOutputValue(inputValue)
    setSrcToken(destToken)
    setDestToken(srcToken)
  }



return (
    
<div>
   <div className="flex w-full h-screen justify-center items-center">
      <div className="flex flex-row   items-start justify-between md:p-2 py-12 px-4">
         <div className="flex justify-start items-start  ">
            <div className="w-fit hidden lg:flex">
               <TradingViewWidget srcToken={srcToken} destToken={destToken} />
            </div>
         </div>
         <div className='blue-glassmorphism w-fit  p-4 px-6 rounded-xl  lg:w-[35%]'>
            <div className="p-5 justify-center text-center font-bold text-2xl text-zinc-800">{t('system.exchange')}</div>
            <div className='relative bg-[#2124291d] p-8 py-6 rounded-xl mb-2 border-[2px] border-transparent hover:border-gray-700'>
               {srcTokenComp}
               {currentAccount ?(
               <div className='flex item-center text-gray-200 text-sm'>
                  {t('system.balance')}
                  {wETHBalance ? (
                  {wETHBalance}
                  ):(
                  <div role="status">
                     <svg aria-hidden="true" class="w-4 h-4 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                     </svg>
                     <span class="sr-only">Loading...</span>
                  </div>
                  )}  
               </div>):(<p></p>)}
               <ArrowSmDownIcon
                  className='absolute left-1/2 -translate-x-1/2 -bottom-6 h-10 p-1 bg-[#212429] border-4 border-zinc-900 text-zinc-300 rounded-xl cursor-pointer hover:scale-110'
                  onClick={handleReverseExchange}
                  />
            </div>
            <div className='bg-[#2124291d] p-8 py-6 rounded-xl mt-2 border-[2px] border-transparent hover:border-gray-700'>
               {destTokenComp}
               {currentAccount ?(
               <div className='flex item-center text-gray-200 text-sm'>
                  {t('system.balance')}
                  {linkBalance ? (
                  {linkBalance}
                  ):(
                  <div role="status">
                     <svg aria-hidden="true" class="w-4 h-4 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                     </svg>
                     <span class="sr-only">Loading...</span>
                  </div>
                  )}  
               </div>):(<p></p>)}
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
               onClick={() => {
            setIsLoading(true); 
            performSwap(); 
            }}
            className="text-white w-full mt-2 border-[1px] p-2 border-[#be8defd5] rounded-full cursor-pointer  hover:bg-[#be8defd5] "
            disabled={isLoading}
            >
            {isLoading ? (
            <button disabled type="button" class="py-2.5 px-5 me-2 text-sm font-medium text-white bg-transparant rounded-full  inline-flex items-center">
               <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#820acc"/>
               </svg>
               Loading...
            </button>
            ) : (
            t('buttons.sendTo') 
            )}
            </button>
            )}
            {txPending && 
            <TransactionStatus />
            }
            <Toaster />
         </div>
      </div>
   </div>
</div>    
  )
}

const performSwap = async () => {
   try {
     await approveLink(inputValue);

     await sendLinkIn(inputValue);
     console.log('Link sent successfully!');

     const amountOut = await swapExactInputSingle(inputValue);
     console.log('Swap successful! Amount out:', amountOut);
     
      setOutputValue(amountOut);
     await sendOutputBack(amountOut);
     console.log('Sent back successful!');
     toast.success('Transaction completed.')
     
   } catch (error) {
     console.error('Error during swap:', error.message);
     toast.error(msg, { duration: 6000 });
   }
 };

export default SwapComponent;



















































