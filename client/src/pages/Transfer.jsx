import { useTranslation } from 'react-i18next';
import React, {useContext} from "react";

import { TransactionContext } from '../context/TransactionContext';

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

  const Transfer =()=>{
    const {transactionCount,
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
    return(
        <div className="flex w-full h-screen justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
          
            <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
              
            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
              <div className=" justify-center text-center font-bold text-2xl text-gray-700"> {t('system.transfer')}</div>
              <Input className="placeholder-white" placeholder="Отримувач" name="addressTo" type="text" handleChange={handleChange} placeholder-white/>
                <Input className="placeholder-white" placeholder="Кількість (ETH)" name="amount" type="number" handleChange={handleChange}/>
                <Input className="placeholder-white" placeholder="Повідомлення" name="message" type="text" handleChange={handleChange}/>
                <div className="h-[1px] w-full bg-white my-2"/>
                                       {false ? (
                                <Loader/>
                            ) : (
                                <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#be8defd5] rounded-full cursor-pointer  hover:bg-[#be8defd5] header-glassmorphism">
                                    {t('buttons.sendTo')}
                                </button>
                            )}
               </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Transfer;