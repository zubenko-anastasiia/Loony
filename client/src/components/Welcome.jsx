import { AiFillAlipayCircle } from "react-icons/ai";
import {SiEthereum } from "react-icons/si";
import {BsInfoCircle} from "react-icons/bs";

//import {Loader} from "./Loader";

const Welcome =()=>{
    return(
        <div className="flex w-full justify-center items-center">
            <div className=" flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 text-white justify-start flex-col md:mr-10">
                    <h1>
                        Send Crypto <br/> across the world
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Welcome;