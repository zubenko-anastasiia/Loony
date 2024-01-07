import aboutUs from "../images/aboutUs.png";
const AboutUs = () => {
return(
<section className="flex items-center  xl:h-screen font-poppins dark:bg-gray-800 ">
        <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
            <div className="flex flex-wrap ">
                <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                    <img src={aboutUs} alt="Anastasiia"
                        className="relative z-40 object-cover w-full h-96 rounded-3xl"/>
                </div>
                <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
                    <h2 className="mb-4 text-4xl font-semibold text-color-[#72569c]">
                        About Us
                    </h2>
                    <p className="mb-10 text-base leading-7 text-gray-700 ">
                    Loony складається з однієї Настюшки, яка працює днями і ночами, щоб створити найкращий продукт і надати його на оцінку своїй улюбленій комісії і отримати найвищий бал серед усіх! Адже Настюшка також дуже красива дівчинка, і не варто було б пропустити цей факт при оцінці її проекту

Приєднуйтеся до Loony і відкрийте для себе майбутнє криптовалютних торгів - безпечне, ефективне і доступне для всіх. Ми пишаємося тим, що робимо, і готові надати вам ключі до світу децентралізованих фінансів."
                    </p>
                    
                </div>
            </div>
        </div>
    </section>
    )
    };
export default AboutUs;