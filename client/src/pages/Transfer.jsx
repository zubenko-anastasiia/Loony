const Transfer =()=>{
  return(
      <>
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
            
      </>
  );
}

export default Transfer;