import React, { useState } from 'react';
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

const Support =()=>{
    const [show, setShow] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const handleButtonClick = () => {
      setModalOpen(!modalOpen);
    };

    

    return(
    <div className="container my-24 mx-auto md:px-6">
        <section className="mb-32">
            <div className="flex flex-wrap">

            <div className="grid-cols-1 sm:grid md:grid-cols-3 ">

                <div className="mx-3 mt-6 flex flex-col rounded-lg bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 sm:shrink-0 sm:grow sm:basis-0 ">
                    <div className="p-6">
                        <h5
                            className="mb-2 text-center text-xl leading-tight text-white ">
                            Card title
                        </h5>
                        <p className="mb-4 text-center text-neutral-800">
                            This is a longer card with supporting text below as a natural
                            lead-in to additional content. This content is a little bit
                            longer.
                        </p>
                    </div>
                </div>
                <div className="mx-3 mt-6 flex flex-col rounded-lg bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 sm:shrink-0 sm:grow sm:basis-0 ">
                    <div className="p-6">
                        <h5
                            className="mb-2 text-center text-xl leading-tight text-white ">
                            Card title
                        </h5>
                        <p className="mb-4 text-center text-neutral-800">
                            This is a longer card with supporting text below as a natural
                            lead-in to additional content. This content is a little bit
                            longer.
                        </p>
                    </div>
                </div>
                <div className="mx-3 mt-6 flex flex-col rounded-lg bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 sm:shrink-0 sm:grow sm:basis-0 ">
                    <div className="p-6">
                        <h5
                            className="mb-2 text-center text-xl leading-tight text-white ">
                            Card title
                        </h5>
                        <p className="mb-4 text-center text-neutral-800">
                            This is a longer card with supporting text below as a natural
                            lead-in to additional content. This content is a little bit
                            longer.
                        </p>
                    </div>
                </div>
                <div className="mx-3 mt-6 flex flex-col rounded-lg bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 sm:shrink-0 sm:grow sm:basis-0 ">
                    <div className="p-6">
                        <h5
                            className="mb-2 text-center text-xl leading-tight text-white ">
                            Card title
                        </h5>
                        <p className="mb-4 text-center text-neutral-800">
                            This is a longer card with supporting text below as a natural
                            lead-in to additional content. This content is a little bit
                            longer.
                        </p>
                    </div>
                </div>
                <div className="mx-3 mt-6 flex flex-col rounded-lg bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 sm:shrink-0 sm:grow sm:basis-0 ">
                    <div className="p-6">
                        <h5
                            className="mb-2 text-center text-xl leading-tight text-white ">
                            Card title
                        </h5>
                        <p className="mb-4 text-center text-neutral-800">
                            This is a longer card with supporting text below as a natural
                            lead-in to additional content. This content is a little bit
                            longer.
                        </p>
                    </div>
                </div>
                <div className="mx-3 mt-6 flex flex-col rounded-lg bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 sm:shrink-0 sm:grow sm:basis-0 ">
                    <div className="p-6">
                        <h5
                            className="mb-2 text-center text-xl leading-tight text-white ">
                            Cant find answer on your question?
                        </h5>
                        <p className="mb-4 text-center text-neutral-800">
                            Write down your email and question. Our support team will answer you in one hour.
                        </p>
                         <button onClick={handleButtonClick} className="rounded-md bg-[#f2daf8] mb-5 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Открыть форму</button>
                         
                         {modalOpen && (
                          
                          <form>
                          <div className="relative mb-6" data-te-input-wrapper-init>
                          <input type="text" className="peer block min-h-[auto] w-full rounded border-1 bg-white py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" id="exampleInput90" placeholder="Name" />
                            <label className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary" for="exampleInput90">Name
                            </label>
                          </div> 
                          <div className="relative mb-6" data-te-input-wrapper-init>
                            <input type="email" className="peer block min-h-[auto] w-full rounded border-0 bg-white py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" id="exampleInput91" placeholder="Email address" />
                            <label className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary" for="exampleInput91">Email address
                            </label>
                          </div>
                          <div className="relative mb-6" data-te-input-wrapper-init>
                            <textarea className="peer block min-h-[auto] w-full rounded border-0 bg-white py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" id="exampleFormControlTextarea1" rows="3" placeholder="Your message"></textarea>
                            <label for="exampleFormControlTextarea1" className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Message</label>
                          </div>
                          
                          <button onClick={handleButtonClick} type="button" data-te-ripple-init data-te-ripple-color="light"
                            className="mb-6 inline-block w-full rounded-full bg-[#8899f2] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#3725bd] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            Send
                          </button>
                
                        </form>
                        
                         )}
                    </div>
                </div>

            </div>
    
        
      
     </div>
  </section>
  
</div>
    );
  }
  
  export default Support;