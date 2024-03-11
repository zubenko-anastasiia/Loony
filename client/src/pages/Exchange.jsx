import { useTranslation } from 'react-i18next';
import React, {useContext} from "react";

import {ArrowSmDownIcon } from '@heroicons/react/outline'

import { SwapContext } from '../context/SwapContext';


const Input = ({placeholder,name,type,value, handleChange, required}) =>(
    <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e)=> handleChange(e, name) }
    required= {required}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism "
    />
  );
  const locales = {
    en: { title: 'English' },
    ua: { title: 'Українська' },
  };

  const Exchange =()=>{
    const {connectWallet,
        currentAccount,
        isLoading,
        swapExactInputSingle,
        handleChange,
        formData,} = useContext(SwapContext);


    const handleSubmit = (e)=>{
        const {amountIn} = formData;

        e.preventDefault();

        if(!amountIn) return;

        swapExactInputSingle();
    }
    
    const { t, i18n } = useTranslation();
    return(
      <div className="flex w-full h-screen justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
          
            <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
           
      {/* <section className="flex items-center  xl:h-screen font-poppins ">
      <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
          <div className="flex flex-wrap ">
              <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0"> */}
                
            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
              <div className=" justify-center text-center font-bold text-2xl text-gray-700"> {t('system.transfer')}</div>
                <Input className="placeholder-white" placeholder="Кількість (ETH)" name="amountIn" type="number" handleChange={handleChange}/>
                <div className="h-[1px] w-full bg-white my-2"/>
                                       {!currentAccount ? (
                                <button
                                type="button"
                                onClick={connectWallet}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#be8defd5] rounded-full cursor-pointer  hover:bg-[#be8defd5] header-glassmorphism">
                                    {t('system.connectAWallet')}
                                </button>
                            ) : (
                                <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#be8defd5] rounded-full cursor-pointer  hover:bg-[#be8defd5] ">
                                    {t('buttons.sendTo')}
                                </button>
                            )}
               </div>
            </div>
            </div>
            
            </div>
    
    );
  }
  
  export default Exchange;