import React, {useContext, useRef} from "react";
import { AiFillAlipayCircle } from "react-icons/ai";
import {SiEthereum } from "react-icons/si";
import {BsInfoCircle} from "react-icons/bs";
import {ArrowSmDownIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next';
import Services from "./Services";
 import Card from "../components/Card"

import { TransactionContext } from "../context/TransactionContext";
import {Loader}  from "./";
import {shortenAddress} from "../utils/ShortAddress";

//const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-fuchsia-400 text-sm font-light text-white";

const Input = ({placeholder,name,type,value, handleChange}) =>(
    <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e)=> handleChange(e, name) }
    className="m-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism "
    />
);

const Welcome =()=>{
    const {
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData} = useContext(TransactionContext);


    const handleSubmit = (e)=>{
        const {addressTo, amount, message} = formData;

        e.preventDefault();

        if(!addressTo || !amount || !message) return;

        sendTransaction();
    }
    
    const { t, i18n } = useTranslation();

    const targetRef = useRef(null);

    const handleScroll = () => {
      targetRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    };
    
    return(
    <>
        <div className="mx-auto w-11/12 sm:py-48">
            <div className="h-screen inset-0 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        {t('welcome.opening')}
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-white">           
                        {t('welcome.underOpening')}
                    </p>
            
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        {!currentAccount &&
                        (<button type="button" onClick={connectWallet} className="rounded-md bg-[#72569c] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <p className="text-white text-base font-semibold">{t('system.connectAWallet')}</p> 
                        </button>)}
                        
                    </div>
                    <div className="mt-5 flex items-center justify-center ">
                      <ArrowSmDownIcon
                        className=' h-7 p-0.5 bg-[#72569c40] border-1 border-[#72569c] text-[#72569c] rounded-xl cursor-pointer hover:scale-110'
                        onClick={handleScroll}
                    />
                    </div>
                </div>  
        <div ref={targetRef} className="h-screen inset-0 " >
            <Services />
        </div>
        

<div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
<div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="text-white text-xl sm:text-5xl py-2 ">
        {t('welcome.sendingTitle.1')}
        <br/>
        {t('welcome.sendingTitle.2')}
        {t('welcome.sendingTitle.3')}

        </h1>
        <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
        {t('welcome.sendingText')}
        </p>
      </div>
        
        <div className="">
            <Card/>
                

            <div className="sm:w-96 w-full flex flex-col justify-center items-center blue-glassmorphism">
                <Input className="placeholder-white" placeholder="Отримувач" name="addressTo" type="text" handleChange={handleChange} placeholder-white/>
                <Input className="placeholder-white" placeholder="Кількість (ETH)" name="amount" type="number" handleChange={handleChange}/>
                <Input className="placeholder-white" placeholder="Повідомлення" name="message" type="text" handleChange={handleChange}/>
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


</>
);
}

export default Welcome;