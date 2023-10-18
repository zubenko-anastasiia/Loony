import React from "react";
import  { HiMenuAlt4 }  from "react-icons/hi";
import  { AiOutlineClose }  from "react-icons/ai";
import { Link } from 'react-router-dom';

import logo from "../images/logo.png";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 rounded-full cursor-pointer ${classprops} hover:bg-[#d0bfe83a]`}>{title}</li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="sticky top-3 items-center w-9/12 rounded-full bg-white backdrop-filter backdrop-blur-lg bg-opacity-20">
    <div className=' flex md:justify-center justify-between  items-center object-top p-4 h-16 '>
      
      <div className='md:flex-[0.5] flex-initial justify-center items-center'>
       <Link to="/"> <img src={logo} alt="logo" className="w-20 cursor-pointer" /></Link>
      </div>
      
      <ul className= "flex space-x-4 justify-between items-center  text-white  " >
        {/* {["Переказ", "Обмін", "GitHub", "Підтримка"].map((item, index) => (
          <NavBarItem key={item + index} title={item}  />
        ))} */}
        <li className="mx-4 rounded-full cursor-pointer hover:bg-[#d0bfe83a]">
          <Link to="/transfer">Переказ</Link>
        </li>
        <li className="mx-4 rounded-full cursor-pointer hover:bg-[#d0bfe83a]">
          <Link to="/convert">Обмін</Link>
        </li>
        <li className="mx-4 rounded-full cursor-pointer hover:bg-[#d0bfe83a]">
          <Link to="/Github">GitHub</Link>
        </li>
        <li className="mx-4 rounded-full cursor-pointer hover:bg-[#d0bfe83a]">
          <Link to="/support">Підтримка</Link>
        </li>

        
        <li className="bg-[#8899f2] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Під'єднати гаманець
        </li>
        
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["Перевод", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}
          </ul>
        )}
      </div>
      </div>
    </nav>

  )
};

export default Navbar;
