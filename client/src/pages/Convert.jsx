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



const SwapComponent = () => {
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
    // Handling the text of the submit button

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

    // Resetting the isReversed value if its set
    if (isReversed.current) isReversed.current = false
  }, [outputValue, srcToken])

  return (
    <div className='bg-zinc-900 w-[35%] p-4 px-6 rounded-xl'>
      <div className='flex items-center justify-between py-4 px-1'>
        <p>Swap</p>
        <CogIcon className='h-6' />
      </div>
      <div className='relative bg-[#212429] p-4 py-6 rounded-xl mb-2 border-[2px] border-transparent hover:border-zinc-600'>
        {srcTokenComp}

        <ArrowSmDownIcon
          className='absolute left-1/2 -translate-x-1/2 -bottom-6 h-10 p-1 bg-[#212429] border-4 border-zinc-900 text-zinc-300 rounded-xl cursor-pointer hover:scale-110'
          onClick={handleReverseExchange}
        />
      </div>

      <div className='bg-[#212429] p-4 py-6 rounded-xl mt-2 border-[2px] border-transparent hover:border-zinc-600'>
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
  )

  async function handleSwap() {
    if (srcToken === ETH && destToken !== ETH) {
      performSwap()
    } else {
      // Check whether there is allowance when the swap deals with tokenToEth/tokenToToken
      setTxPending(true)
      const result = await hasValidAllowance(Address, srcToken, inputValue)
      setTxPending(false)

      if (result) performSwap()
      else handleInsufficientAllowance()
    }
  }

  async function handleIncreaseAllowance() {
    // Increase the allowance
    setTxPending(true)
    await increaseAllowance(srcToken, inputValue)
    setTxPending(false)

    // Set the swapbtn to "Swap" again
    setSwapBtnText(SWAP)
  }

  function handleReverseExchange(e) {
    // Setting the isReversed value to prevent the input/output values
    // being calculated in their respective side - effects
    isReversed.current = true

    // 1. Swap tokens (srcToken <-> destToken)
    // 2. Swap values (inputValue <-> outputValue)

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

export default SwapComponent;





















































// import React, { useState } from 'react';
// import TradingViewWidget from '../components/Chart'
// import { useTranslation } from 'react-i18next';
// import {BsFillArrowDownCircleFill} from "react-icons/bs";

// import SwapField from '../components/swapComponents/SwapField'
// import TransactionStatus from '../components/swapComponents/TransactionStatus'
// import toast, { Toaster } from 'react-hot-toast'
// import { DEFAULT_VALUE, ETH } from '../components/swapComponents/SupportedCoins'
// import { toEth, toWei } from '../utils/ether-utils'
// import { useAccount } from 'wagmi'

// import {
//   hasValidAllowance,
//   increaseAllowance,
//   swapEthToToken,
//   swapTokenToEth,
//   swapTokenToToken,
// } from '../utils/queries'

// const Input = ({placeholder,name,type,value, handleChange}) =>(
//   <input
//   placeholder={placeholder}
//   type={type}
//   step="0.0001"
//   value={value}
//   onChange={(e)=> handleChange(e, name) }
//   className=" w-full h-16 rounded-sm p-2 outline-none bg-transparent text-white placeholder-gray-200 border-none text-sm white-glassmorphism "
//   />
// );

// const locales = {
//   en: { title: 'English' },
//   ua: { title: 'Українська' },
// };
// const Convert =()=>{
//   const [srcToken, setSrcToken] = useState(ETH)
//   const [destToken, setDestToken] = useState(DEFAULT_VALUE)

//   const [inputValue, setInputValue] = useState()
//   const [outputValue, setOutputValue] = useState()

//   const inputValueRef = useRef()
//   const outputValueRef = useRef()

//   const isReversed = useRef(false)

//   const INCREASE_ALLOWANCE = 'Increase allowance'
//   const ENTER_AMOUNT = 'Enter an amount'
//   const CONNECT_WALLET = 'Connect wallet'
//   const SWAP = 'Swap'

//   const srcTokenObj = {
//     id: 'srcToken',
//     value: inputValue,
//     setValue: setInputValue,
//     defaultValue: srcToken,
//     ignoreValue: destToken,
//     setToken: setSrcToken,
//   }

//   const destTokenObj = {
//     id: 'destToken',
//     value: outputValue,
//     setValue: setOutputValue,
//     defaultValue: destToken,
//     ignoreValue: srcToken,
//     setToken: setDestToken,
//   }

//   const [srcTokenComp, setSrcTokenComp] = useState()
//   const [destTokenComp, setDestTokenComp] = useState()

//   const [swapBtnText, setSwapBtnText] = useState(ENTER_AMOUNT)
//   const [txPending, setTxPending] = useState(false)

//   const notifyError = msg => toast.error(msg, { duration: 6000 })
//   const notifySuccess = () => toast.success('Transaction completed.')

//   const { address } = useAccount()

//   useEffect(() => {
//     // Handling the text of the submit button

//     if (!address) setSwapBtnText(CONNECT_WALLET)
//     else if (!inputValue || !outputValue) setSwapBtnText(ENTER_AMOUNT)
//     else setSwapBtnText(SWAP)
//   }, [inputValue, outputValue, address])

//   useEffect(() => {
//     if (
//       document.activeElement !== outputValueRef.current &&
//       document.activeElement.ariaLabel !== 'srcToken' &&
//       !isReversed.current
//     )
//       populateOutputValue(inputValue)

//     setSrcTokenComp(<SwapField obj={srcTokenObj} ref={inputValueRef} />)

//     if (inputValue?.length === 0) setOutputValue('')
//   }, [inputValue, destToken])

//   useEffect(() => {
//     if (
//       document.activeElement !== inputValueRef.current &&
//       document.activeElement.ariaLabel !== 'destToken' &&
//       !isReversed.current
//     )
//       populateInputValue(outputValue)

//     setDestTokenComp(<SwapField obj={destTokenObj} ref={outputValueRef} />)

//     if (outputValue?.length === 0) setInputValue('')
//     if (isReversed.current) isReversed.current = false
//   }, [outputValue, srcToken])
//   const { t, i18n } = useTranslation();
//   return(
//       <div className="flex w-full h-screen justify-center items-center">
//       <div className="flex mf:flex-row flex-col  items-start justify-between md:p-20 py-12 px-4">
//         <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
//           <div className="w-fit">
            
//             <TradingViewWidget/>
//             </div>
            
//           </div>
//           <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 ">
//           <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">

//           <div className=" justify-center text-center font-bold text-2xl text-gray-700"> {t('system.exchange')}</div>    
//           <div class="grid md:grid-cols-2 md:gap-6 mt-6">
//             <div class="relative z-0 w-full mb-6 group">
//               <select   className=" w-full h-16 rounded-sm p-2 outline-none bg-transparent text-black placeholder-gray-200 border-none text-sm white-glassmorphism " name="inChangeCurr">
//                 <option className="bg-transparent white-glassmorphism">USD</option>
//               </select>
//             </div>
//             <div class="relative z-0 w-full mb-6 group">
//               <Input className="placeholder-white" placeholder="Кількість (USD)" name="inChangeAmount" type="number" handleChange={()=>{}}/>
//             </div>
//           </div>
//           <BsFillArrowDownCircleFill fontSize={28} color="#4a5169"/>
//           <div class="grid md:grid-cols-2 md:gap-6 mt-3">
//           <div class="relative z-0 w-full mb-6 group">
//           <select   className=" w-full h-16 rounded-sm p-2 outline-none bg-transparent text-black placeholder-gray-200 border-none text-sm white-glassmorphism " name="outChangeCurr">
//                 <option className="bg-transparent white-glassmorphism">BTC</option>
//                 <option className="bg-transparent white-glassmorphism">ETH</option>
//                 <option className="bg-transparent white-glassmorphism">SOL</option>
//                 <option className="bg-transparent white-glassmorphism">DOT</option>
//               </select>          
//             </div>
//             <div class="relative z-0 w-full mb-6 group">
//               <Input className="placeholder-white" placeholder="Кількість" name="outChangeAmount" type="number" handleChange={()=>{}}/>
//             <p class=" ml-4 text-xs text-gray-600">
//               Fee:0.002
//             </p></div>
            
//           </div>
//           <div className="h-[1px] w-full bg-white my-2"/>
                            
//                             {false ? (
//                                 <Loader/>
//                             ) : (
//                                 <button
//                                 type="button"
//                                 onClick={handleSubmit}
//                                 className="text-white w-full mt-2 border-[1px] p-2 border-[#be8defd5] rounded-md cursor-pointer  hover:bg-[#be8defd5] btn-glassmorphism">
//                                     {t('buttons.convert')}
//                                 </button>
//                             )}
//              </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Convert;