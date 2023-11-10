import { AiFillAlipayCircle } from "react-icons/ai";
import {SiEthereum } from "react-icons/si";
import {BsInfoCircle} from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import Fade from 'react-reveal/Fade';

import {Loader}  from "./";

//const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-fuchsia-400 text-sm font-light text-white";

const Input = ({placeholder,name,type,value, handleChange}) =>(
    <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e)=> handleChange(e, name) }
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism "
    />
);

const Welcome =()=>{

    const connectWallet = ()=>{}

    const handleSubmit = ()=>{}
    
    const { t, i18n } = useTranslation();
    
    return(
    <>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="inset-0 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        {t('welcome.opening')}
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-white">           
                        {t('welcome.underOpening')}
                    </p>
            
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <button type="button" onClick={connectWallet} className="rounded-md bg-[#8899f2] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <p className="text-white text-base font-semibold">{t('system.connectAWallet')}</p> 
                        </button>
                    </div>  
                </div>  
        
{/* import Fade */}
        <div>
            <Fade top>
              <h1>React Reveal</h1>
            </Fade>
        </div>
        <div className="mx-auto mt-40 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="flex justify-center items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full  p-3">
                <div className="flex justify-between items-start mt-40 ">
                            <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                <SiEthereum fontSize={21} color="#fff"/>
                            </div>
                            <BsInfoCircle fontSize={17} color="#fff"/>
                </div>
                <div>
                    <p className="text-white font-light text-sm">Адреса</p>
                    <p className="text-white font-semibold text-lg mt-1">Ethereum </p>
                </div>
            </div>
            </div>
            

            <div className="sm:w-96 w-full flex flex-col justify-center items-center blue-glassmorphism">
                <Input className="placeholder-white" placeholder="Отримувач" name="addressTo" type="text" handleChange={()=>{}} placeholder-white/>
                <Input className="placeholder-white" placeholder="Кількість (ETH)" name="amount" type="number" handleChange={()=>{}}/>
                <Input className="placeholder-white" placeholder="Повідомлення" name="message" type="text" handleChange={()=>{}}/>
                <div className="h-[1px] w-full bg-white my-2"/>
                            
                            {false ? (
                                <Loader/>
                            ) : (
                                <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#be8defd5] rounded-full cursor-pointer  hover:bg-[#be8defd5] header-glassmorphism">
                                    Надіслати
                                </button>
                            )}
            </div>
        </div>
        
    </div>
</>
);
}

export default Welcome;