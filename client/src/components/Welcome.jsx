import React, {useContext, useRef} from "react";
import { useTranslation } from 'react-i18next';

import {ArrowSmDownIcon } from '@heroicons/react/outline'

import Services from "./Services";
import Card from "../components/Card"
import {Loader}  from "./";

import { TransactionContext } from "../context/TransactionContext";

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
        const { t, i18n } = useTranslation();
    const {
        connectWallet,
        currentAccount,
        setIsLoading,
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
    
    const targetRef = useRef(null);

    const handleScroll = () => {
      targetRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    };
    
return(
<>
    <div className="mx-auto w-11/12 sm:py-48">
    <div className="py-12 sm:py-0"></div>
    <div className="h-screen inset-0 text-center">
    <div className="mt-0 sm:mt-9"></div>
    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        {t('welcome.opening')}
    </h1>
    <p className="mt-6 text-lg leading-8 text-white">           
        {t('welcome.underOpening')}
    </p>
    <div className="mt-10 flex items-center justify-center gap-x-6">
        {!currentAccount &&
        (
        <button type="button" onClick={connectWallet} className="rounded-md bg-[#72569c] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <p className="text-white text-base font-semibold">{t('system.connectAWallet')}</p>
        </button>
        )}
    </div>
    <div className="mt-5 flex items-center justify-center ">
        <ArrowSmDownIcon
            className=' h-7 p-0.5 bg-[#72569c40] border-1 border-[#72569c] text-[#72569c] rounded-xl cursor-pointer hover:scale-110'
            onClick={handleScroll}
            />
    </div>
    </div>
    <div ref={targetRef} className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
    <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="text-white text-center sm:text-left text-3xl sm:text-5xl py-2 ">
            {t('welcome.sendingTitle.1')}
            <br/>
            {t('welcome.sendingTitle.2')}
            {t('welcome.sendingTitle.3')}
        </h1>
        <p className="text-center my-0 sm:my-2 text-white font-light md:w-9/12 sm:text-left w-11/12 text-base">
        <div className="hidden sm:flex">
            {t('welcome.sendingText')}
        </div>
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
                onClick={() => {
                setIsLoading(true); 
                handleSubmit(); 
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
            </div>
        </div>
    </div>
    <div  className="h-screen inset-0 " >
        <Services />
    </div>
    <div className="py-48 sm:py-0"></div>
    </div>
</>
);
}

export default Welcome;