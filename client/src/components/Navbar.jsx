import React, {useContext} from "react";
import { Link } from 'react-router-dom';

import { HiMenuAlt4 }  from "react-icons/hi";
import { AiOutlineClose }  from "react-icons/ai";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useTranslation } from 'react-i18next';

import { TransactionContext } from "../context/TransactionContext";
import {shortenAddress} from "../utils/ShortAddress";

import logo from "../images/logo.png";

const locales = {
  en: { title: 'English' },
  ua: { title: 'Українська' },
};

const Navbar = () => {
const [toggleMenu, setToggleMenu] = React.useState(false);
const {connectWallet,currentAccount, disconnectWallet} = useContext(TransactionContext);

const { t, i18n } = useTranslation();
  return (
    <header className="sticky inset-x-0 top-5 z-50 ">
   <nav className=" rounded-full bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 ms-20 me-20">
      <div className=" flex justify-between  items-center px-10 ">
         <div className="flex items-start">
            <Link to="/">
            <img src={logo} alt="logo" className="w-20  cursor-pointer" />
            </Link>
         </div>
         <div className="flex items-center space-x-4">
            <ul className="hidden md:flex space-x-4 justify-between text-white">
               <li className="mx-4 rounded-full text-lg cursor-pointer hover:bg-[#d0bfe83a] hover:shadow-xl">
                  <Link to="/transfer">
                  {t('system.transfer')}</Link>
               </li>
               <li className="mx-4 rounded-full text-lg cursor-pointer hover:bg-[#d0bfe83a] hover:shadow-xl">
                  <Link to="/convert">
                  {t('system.exchange')}</Link>
               </li>
               <li className="mx-4 rounded-full text-lg cursor-pointer hover:bg-[#d0bfe83a] hover:shadow-xl">
                  <a href="https://github.com/zubenko-anastasiia/Loony">GitHub</a>
               </li>
               <li className="mx-4 rounded-full text-lg cursor-pointer hover:bg-[#d0bfe83a] hover:shadow-xl">
                  <Link to="/support">
                  {t('system.support')}</Link>
               </li>
            </ul>
            <div className="ml-10">
               {!currentAccount ? (
               <button type="button" onClick={connectWallet} className="bg-[#72569c] py-2 px-7 text-white rounded-full cursor-pointer hover:bg-[#be8defd5]">
               {t('system.connectAWallet')}
               </button>
               ) : (
               <button type="button" onClick={disconnectWallet} className="bg-[#72569c] py-2 px-7 text-white rounded-full cursor-pointer hover:bg-[#be8defd5]">
               {shortenAddress(currentAccount)}
               </button>
               )}
            </div>
            <div className="ml-7 hidden md:flex">
               <Dropdown>
                  <DropdownTrigger>
                     <button className="text-white mr-24">{t('system.language')}</button>
                  </DropdownTrigger>
                  <DropdownMenu className="backdrop-blur-lg bg-opacity-20">
                     {Object.keys(locales).map((locale) => (
                     <DropdownItem
                     key={locale}
                     className="text-white"
                     style={{ fontWeight: i18n.resolvedLanguage === locale ? 'bold' : 'normal' }}
                     type="submit"
                     onClick={() => i18n.changeLanguage(locale)}
                     >
                     {locales[locale].title}
                     </DropdownItem>
                     ))}
                  </DropdownMenu>
               </Dropdown>
            </div>
         </div>
         <div className="md:hidden">
            <HiMenuAlt4
               fontSize={28}
               className="text-white cursor-pointer"
               onClick={() =>setToggleMenu(!toggleMenu)}/>
            {toggleMenu && (
            <ul
               className="z-10 fixed -top-0 -right-16 p-3  bg-[#e1d3fdc1] shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md  text-white animate-slide-in"
               >
               <li className="text-sm px-0 py-0 ">
                  <AiOutlineClose onClick={() =>
                  setToggleMenu(false)} />
               </li>
               <li className="px-10 py-2 cursor-pointer hover:bg-[#d0bfe83a] hover:shadow-xl">
                  <Link to="/transfer">
                  {t('system.transfer')}</Link>
               </li>
               <li className="px-10 py-2 cursor-pointer hover:bg-[#d0bfe83a] hover:shadow-xl">
                  <Link to="/convert">
                  {t('system.exchange')}</Link>
               </li>
               <li className="px-10 py-2 cursor-pointer hover:bg-[#d0bfe83a] hover:shadow-xl">
                  <a href="https://github.com/zubenko-anastasiia/Loony">GitHub</a>
               </li>
               <li className="px-10 py-2 cursor-pointer hover:bg-[#d0bfe83a] hover:shadow-xl">
                  <Link to="/support">
                  {t('system.support')}</Link>
               </li>
               <li className="px-10 py-2 cursor-pointer hover:bg-[#d0bfe83a] hover:shadow-xl">
                  <div className="">
                     <Dropdown>
                        <DropdownTrigger>
                           <button className="text-white">{t('system.language')}</button>
                        </DropdownTrigger>
                        <DropdownMenu className="backdrop-blur-lg bg-opacity-20">
                           {Object.keys(locales).map((locale) => (
                           <DropdownItem
                           key={locale}
                           className="text-white"
                           style={{ fontWeight: i18n.resolvedLanguage === locale ? 'bold' : 'normal' }}
                           type="submit"
                           onClick={() => i18n.changeLanguage(locale)}
                           >
                           {locales[locale].title}
                           </DropdownItem>
                           ))}
                        </DropdownMenu>
                     </Dropdown>
                  </div>
               </li>
            </ul>
            )}
         </div>
      </div>
   </nav>
</header>
)};

export default Navbar;
