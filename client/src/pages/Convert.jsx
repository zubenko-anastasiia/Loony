import React, { useState } from 'react';
import TradingViewWidget from '../components/Chart'
import { useTranslation } from 'react-i18next';
import {BsFillArrowDownCircleFill} from "react-icons/bs";


const Input = ({placeholder,name,type,value, handleChange}) =>(
  <input
  placeholder={placeholder}
  type={type}
  step="0.0001"
  value={value}
  onChange={(e)=> handleChange(e, name) }
  className=" w-full h-16 rounded-sm p-2 outline-none bg-transparent text-white placeholder-gray-200 border-none text-sm white-glassmorphism "
  />
);

const locales = {
  en: { title: 'English' },
  ua: { title: 'Українська' },
};
const Convert =()=>{
  const connectWallet = ()=>{

  }

  const handleSubmit = ()=>{

  }
  const { t, i18n } = useTranslation();
  return(
      <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col mt-10 items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <div className="w-fit">
            
            <TradingViewWidget/>
            </div>
            
          </div>
          <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">

          <div className=" justify-center text-center font-bold text-2xl text-gray-700"> {t('system.exchange')}</div>    
          <div class="grid md:grid-cols-2 md:gap-6 mt-6">
            <div class="relative z-0 w-full mb-6 group">
              {/* <Input className="placeholder-white" placeholder="ETH" name="amount" type="number" handleChange={()=>{}}/> */}
              <select   className=" w-full h-16 rounded-sm p-2 outline-none bg-transparent text-black placeholder-gray-200 border-none text-sm white-glassmorphism " name="inChangeCurr">
                <option className="bg-transparent white-glassmorphism">USD</option>
              </select>
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <Input className="placeholder-white" placeholder="Кількість (USD)" name="inChangeAmount" type="number" handleChange={()=>{}}/>
            </div>
          </div>
          <BsFillArrowDownCircleFill fontSize={28} color="#4a5169"/>
          <div class="grid md:grid-cols-2 md:gap-6 mt-3">
          <div class="relative z-0 w-full mb-6 group">
          <select   className=" w-full h-16 rounded-sm p-2 outline-none bg-transparent text-black placeholder-gray-200 border-none text-sm white-glassmorphism " name="outChangeCurr">
                <option className="bg-transparent white-glassmorphism">BTC</option>
                <option className="bg-transparent white-glassmorphism">ETH</option>
                <option className="bg-transparent white-glassmorphism">SOL</option>
                <option className="bg-transparent white-glassmorphism">DOT</option>
              </select>          
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <Input className="placeholder-white" placeholder="Кількість" name="outChangeAmount" type="number" handleChange={()=>{}}/>
            <p class=" ml-4 text-xs text-gray-600">
              Fee:0.002
            </p></div>
            
          </div>
          <div className="h-[1px] w-full bg-white my-2"/>
                            
                            {false ? (
                                <Loader/>
                            ) : (
                                <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#be8defd5] rounded-md cursor-pointer  hover:bg-[#be8defd5] btn-glassmorphism">
                                    {t('buttons.convert')}
                                </button>
                            )}
             </div>
        </div>
      </div>
    </div>
  );
}

export default Convert;