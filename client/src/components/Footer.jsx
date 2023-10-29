import { useTranslation } from 'react-i18next';

import logo from "../images/logo.png";
import { Typography } from "@material-tailwind/react";
 
const Footer=()=> {
  const { t, i18n } = useTranslation();
  return (
    <footer className="w-full bg-[#c4d1f7] backdrop-filter backdrop-blur-lg bg-opacity-0 p-8">
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
    </footer>
  );
}

export default Footer;
