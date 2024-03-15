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
    const {connectWallet,
        currentAccount,
        isLoading,
        setIsLoading,
        sendTransaction,
        handleChange,
        formData} = useContext(TransactionContext);


    const handleSubmit = (e)=>{
        const {addressTo, amount, message} = formData;

        //e.preventDefault();

        if(!addressTo || !amount || !message) return;

        sendTransaction();
    }
    
    const { t, i18n } = useTranslation();
    return(
      <div className="flex w-full h-screen justify-center items-center">
        <div className="flex items-center justify-between md:p-20 py-12 px-4">
          
          <div className="flex flex-col flex-1 items-center justify-start w-f mf:mt-0 mt-10">
            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
              <div className=" justify-center text-center font-bold text-2xl text-white"> {t('system.transfer')}</div>
              <Input className="placeholder-white" placeholder="Отримувач" name="addressTo" type="text" handleChange={handleChange} placeholder-white/>
                <Input className="placeholder-white" placeholder="Кількість (ETH)" name="amount" type="number" handleChange={handleChange}/>
                <Input className="placeholder-white" placeholder="Повідомлення" name="message" type="text" handleChange={handleChange}/>
                <div className="h-[1px] w-full bg-white my-2"/>
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
                                  handleSubmit(); 
                              }}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#be8defd5] rounded-full cursor-pointer  hover:bg-[#be8defd5] "
                                disabled={isLoading}
                                >
                                   {isLoading ? (
                                      <div  className="py-2.5 px-5 me-2 text-sm font-medium text-white bg-transparant rounded-full  inline-flex items-center">
                                      <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#820acc"/>
                                      </svg>
                                      Loading...
                                      </div>
                                      ) : (
                                          t('buttons.sendTo') 
                                      )}
                                </button>
                                
                            )}
                 </div>
            </div>
          </div>
            
        </div>
    
    );
  }
  
  export default Transfer;