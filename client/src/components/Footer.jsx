import { useTranslation } from 'react-i18next';

import logo from "../images/logo.png";
import { Typography } from "@material-tailwind/react";
 
const Footer=()=> {
  const { t, i18n } = useTranslation();
  return (
    <footer className=" inset-x-0 bottom-0 ">
      <div className="w-full backdrop-filter backdrop-blur-lg bg-opacity-20 p-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12  text-center md:justify-between">
        <img src={logo} alt="logo" className="w-12" />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-purple-500 focus:text-blue-500"
            >
              {t('footer.about')}
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-purple-500 focus:text-blue-500"
            >
              {t('footer.license')}
            </Typography>
          </li>
          
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-purple-500 focus:text-blue-500"
            >
              {t('footer.support')}
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="white" className="text-center font-normal">
        &copy; 2023 Loony
      </Typography>
      </div>
    </footer>

  //   <div className="w-full bg-[#c4d1f7] backdrop-filter backdrop-blur-lg bg-opacity-0.5 flex md:justify-center justify-between items-center flex-col p-4  ">
  //   <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
  //     <div className="flex flex-[0.5] justify-center items-center">
  //       <img src={logo} alt="logo" className="w-12" />
  //     </div>
  //     <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
  //       <p className="text-white text-base text-center mx-2 cursor-pointer">Market</p>
  //       <p className="text-white text-base text-center mx-2 cursor-pointer">Exchange</p>
  //       <p className="text-white text-base text-center mx-2 cursor-pointer">Tutorials</p>
  //       <p className="text-white text-base text-center mx-2 cursor-pointer">Wallets</p>
  //     </div>
  //   </div>

  //   <div className="flex justify-center items-center flex-col mt-5">
  //     <p className="text-white text-sm text-center">Come join us and hear for the unexpected miracle</p>
  //     <p className="text-white text-sm text-center font-medium mt-2">info@kryptomastery.com</p>
  //   </div>

  //   <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

  //   <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
  //     <p className="text-white text-left text-xs">@kryptomastery2022</p>
  //     <p className="text-white text-right text-xs">All rights reserved</p>
  //   </div>
  // </div>
  );
}

export default Footer;
