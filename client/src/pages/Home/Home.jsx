import React, { useState, useEffect, useMemo } from "react";
import { FaArrowAltCircleUp, FaArrowUp, FaShoppingBag } from "react-icons/fa";
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
import { useSelector } from "react-redux";
import ShowCartIcon from "../../components/ShowCartIcon/ShowCartIcon";
import AdsComponent from "../../components/AdsComponent/AdsComponent";
import { Helmet } from "react-helmet";

const Home = () => {
	const [showScrollButton, setShowScrollButton] = useState(false);

	const handleSmoothScroll = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
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

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Use useMemo to update memoizedCartItems when cartItems change

	return (
		<div className="body-wrapper space-pt--70 space-pb--120">
			<Helmet>
				<meta charSet="utf-8" />
				<meta
					name="google-adsense-account"
					content="ca-pub-2753570933185281"
				></meta>
				<title>Home-TAG</title>
				{/* <link rel="canonical" href="http://mysite.com/example" /> */}
			</Helmet>
			<HeroSlider />
			<Refer></Refer>
			<HotNews></HotNews>
			{/* <AdsComponent dataAdSlot="8283119048" /> */}
			{/* <ShowCartIcon></ShowCartIcon> */}
			<BestSellerProduct limit={2} type="bestSeller" />
			<AllProducts limit={12} />
			{showScrollButton && (
				<button
					className="fixed bottom-24 right-5 z-20 rounded-full bg-white bg-opacity-50 p-2 shadow-lg"
					onClick={handleSmoothScroll}
				>
					<FaArrowUp className="text-3xl text-gray-200"></FaArrowUp>
				</button>
			)}
		</div>
	);
};

export default Home;
