import {
    FacebookIcon,
    InstagramIcon,
    Linkedin,
    TwitterIcon,
    WhatsappIcon,
  } from "../../SvgHub/SocialIcon";
  import AppStore from "../../../public/assets/img/AppStore.png";
  import PlayStore from "../../../public/assets/img/PlayStore.png";
  import { useState, useEffect } from "react";
  
  const FooterSection = () => {
    const [currentYear, setCurrentYear] = useState('');
  
    useEffect(() => {
      // Function to get current year
      const getYear = () => {
        const year = new Date().getFullYear();
        setCurrentYear(year);
      };
  
      // Call the function when the component mounts
      getYear();
    }, []);
  
    return (
      <div className="mt-3">
        <h1 className="ml-3 mt-5 text-lg font-semibold">Follow Us</h1>
        <div className="mx-auto mt-5 flex w-[80%] justify-between">
          <FacebookIcon />
          <Linkedin />
          <WhatsappIcon />
          <InstagramIcon />
          <TwitterIcon />
        </div>
        <div className="divider"></div>
  
        <h1 className="my-3 ml-3 mt-2 text-lg font-semibold">
          Download App (In Process)
        </h1>
        <div className="flex items-center justify-center gap-5">
          <img src={PlayStore} alt="" />
          <img src={AppStore} alt="" />
        </div>
  
        <div className="bg-black mt-4 text-white h-[40px] flex items-center justify-center">
          <p>
            Copyright {currentYear} Tagthinkandget.
            <span>All Rights Reserved</span>
          </p>
        </div>
      </div>
    );
  };
  
  export default FooterSection;
  