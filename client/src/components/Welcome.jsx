import { AiFillAlipayCircle } from "react-icons/ai";
import {SiEthereum } from "react-icons/si";
import {BsInfoCircle} from "react-icons/bs";

import {Loader}  from "./";

const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-fuchsia-400 text-sm font-light text-white";

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

    const connectWallet = ()=>{

    }

    const handleSubmit = ()=>{

    }

    return(
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col justify-between md:p-20 py-12 px-4">
        <div className="basis-1/2 mt-6 justify-between pr-15 ">
            <h1 className="text-3xl  sm:text-5xl py-1 text-gradient">
            Відправляй криптовалюту <br /> з будь-якої точки світу
            </h1>
            <p className="font-serif  mt-5 text-white  md:w-9/12 w-11/12 text-lg">
            Досліджуйте криптосвіт. Легко обмінюйте та пересилайте криптовалюти на Loony.
            </p>
            
                <button type="button" onClick={connectWallet} className="flex justify-center items-center   my-5  bg-[#8899f2] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                <p className="text-white text-base font-semibold">Під'єднати гаманець</p> 
            </button>
            
            

            

            {/* <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10 header-glassmorphism">
                <div className={`rounded-tl-2xl ${commonStyles}`}> Надійність</div>
                <div className={commonStyles}>Безпека</div>
                <div className={`sm:rounded-tr-2xl ${commonStyles}`}>Eфіріум</div>
                <div className={`sm:rounded-bl-2xl ${commonStyles}`}>Веб 3.0</div>
                <div className={commonStyles}>Низькі комісії</div>
                <div className={`rounded-br-2xl ${commonStyles}`}>Блокчейн</div>
            </div> */}
        </div>    

            <div className="basis-1/2 pl-40">
                <div className="p-3  flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
                    <div className="flex justify-between flex-col w-full h-full">
                        <div className="flex justify-between items-start">
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

        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
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
    </div>

);
}

export default Welcome;