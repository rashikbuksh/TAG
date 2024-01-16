import clsx from "clsx";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaArrowUp } from "react-icons/fa";
import {
	AllProducts,
	BestSellerProduct,
	Footer,
	Header,
	HeroSlider,
} from "../../components";
import HotNews from "../../components/News/HotNews/HotNews";
import ShowCartIcon from "../../components/ShowCartIcon/ShowCartIcon";
import { useAuth } from "../../context/auth";
import NotificationSound from "../../helpers/NotificationSound";
import { api } from "../../lib/api";
import FooterSection from "../FooterSection/FooterSection";
import Refer from "../Refer/Refer";

const Home = () => {
	const { user, Logout } = useAuth();
	const [showScrollButton, setShowScrollButton] = useState(false);
	const [sliderDataTop, setSliderDataTop] = useState([]);
	const [sliderDataMiddel, setSliderDataMiddel] = useState([]);
	const [sliderDataBottom, setSliderDataBottom] = useState([]);
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

	useEffect(() => {
		api.get("/heroslider/getslider/top")
			.then((res) => {
				setSliderDataTop(res.data);
			})
			.catch((err) => {
				// console.error(err);
			});
		api.get("/heroslider/getslider/middle")
			.then((res) => {
				setSliderDataMiddel(res.data);
			})
			.catch((err) => {
				// console.error(err);
			});
		api.get("/heroslider/getslider/bottom")
			.then((res) => {
				setSliderDataBottom(res.data);
			})
			.catch((err) => {
				// console.error(err);
			});
		if (!user) {
			localStorage.removeItem("user-id");
			Cookies.remove("user");
			Cookies.remove("auth");
		}
	}, []);

	return (
		<div className="px-3">
			<Header />
			<Footer />
			<ShowCartIcon></ShowCartIcon>
			<div className="body-wrapper mb-20 mt-12">
				<Helmet>
					<meta charSet="utf-8" />
					<meta
						name="google-adsense-account"
						content="ca-pub-2753570933185281"
					></meta>
					<title>Home-TAG</title>
					{/* <link rel="canonical" href="http://mysite.com/example" /> */}
				</Helmet>
				<HeroSlider sliderData={sliderDataTop} />
				{user ? <Refer /> : ""}
				<HotNews></HotNews>
				{/* <AdsComponent dataAdSlot="8283119048" /> */}
				{/* <ShowCartIcon></ShowCartIcon> */}
				<BestSellerProduct limit={2} type="bestSeller" />
				<AllProducts limit={12} sliderData={sliderDataMiddel} />
				{showScrollButton && (
					<button
						className="fixed bottom-24 right-5 z-20 rounded-full bg-white bg-opacity-50 p-2 shadow-lg"
						onClick={handleSmoothScroll}
					>
						<FaArrowUp className="text-3xl text-gray-200"></FaArrowUp>
					</button>
				)}
				{sliderDataTop && <FooterSection />}
			</div>
		</div>
	);
};

export default Home;
