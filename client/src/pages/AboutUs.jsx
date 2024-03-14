import aboutMe from "../images/aboutMe.png";
import { useTranslation } from 'react-i18next';


const locales = {
    en: { title: 'English' },
    ua: { title: 'Українська' },
  };

const AboutUs = () => {
const { t, i18n } = useTranslation();

return(
<section className="flex items-center  xl:h-screen font-poppins  ">
   <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
      <div className="flex flex-wrap ">
         <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
            <img src={aboutMe} alt="Anastasiia"
               className="relative z-40 object-cover w-full h-100 rounded-3xl"/>
         </div>
         <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
            <h2 className="mb-4 text-4xl font-semibold text-gray-900">
               {t('aboutUs.title')}
            </h2>
            <p className="mb-10 text-base leading-7 text-gray-900 ">
               {t('aboutUs.subtitle')}
            </p>
         </div>
      </div>
   </div>
</section>
)};
export default AboutUs;