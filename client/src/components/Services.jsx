import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { useTranslation } from 'react-i18next';


const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row w-auto justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">
        {subtitle}
      </p>
    </div>
  </div>
);

const Services = () => {
  const { t, i18n } = useTranslation();
  return(
  <div className="flex w-full justify-center items-center ">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col  ">
        <div className="w-8/12">
           <h1 className="text-white text-3xl sm:text-5xl py-2  ">
        {t('Services.title')}
        </h1>
        <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
        {t('Services.subtitle')}
        </p>
        </div>
       
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#2952E3]"
          title={t('Services.security')}
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle={t('Services.securityText')}
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title={t('Services.costOpt')}
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
          subtitle={t('Services.costOptText')}
        />
        <ServiceCard
          color="bg-[#F84550]"
          title={t('Services.comperison')}
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle={t('Services.comperisonText')}
        />
      </div>
    </div>
  </div>
);}

export default Services;