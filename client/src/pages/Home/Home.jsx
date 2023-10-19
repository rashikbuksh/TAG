import React, { useState, useEffect } from "react";
import { FaArrowAltCircleUp, FaArrowUp } from "react-icons/fa";
import {
  AllProducts,
  BestSellerProduct,
  CategorySlider,
  HeroSlider,
} from "../../components";
import HotNews from "../../components/HotNews/HotNews";
import { useAuth } from "../../context/auth";
import { api } from "../../lib/api";
import Refer from "../Refer/Refer";

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0, // Scroll to the top of the page
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="body-wrapper space-pt--70 space-pb--120">
      <HeroSlider />
      <Refer></Refer>
      <HotNews></HotNews>
      <BestSellerProduct limit={2} type="bestSeller" />
      <AllProducts limit={12} />
      {showScrollButton && (
        <button
          className='fixed right-5 bottom-24 z-20 bg-white bg-opacity-50 p-2 rounded-full shadow-lg'
          onClick={handleSmoothScroll}
        >
          <FaArrowUp className='text-3xl text-gray-200'></FaArrowUp>
        </button>
      )}
    </div>
  );
};

export default Home;
