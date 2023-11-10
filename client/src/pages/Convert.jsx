import TradingViewWidget from '../components/Chart'

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
const Convert =()=>{
  const connectWallet = ()=>{

  }

  const handleSubmit = ()=>{

  }
  return(
      <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <div className="w-fit">
            
            <TradingViewWidget/>
            </div>
            
          </div>
          <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
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

export default Convert;