import {
	AllProducts,
	BestSellerProduct,
	Footer,
	Header,
	HeroSlider,
} from "@components";
import LoadingPage from "@components/LoadingPage/LoadingPage";
import HotNews from "@components/News/HotNews/HotNews";
import AllShop from "@components/Shop/AllShop";
import ShowCartIcon from "@components/ShowCartIcon/ShowCartIcon";
import TagShop from "@components/TagShop/TagShop";
import { useNotification } from "@context/NotificationProvider";
import { useAuth } from "@context/auth";
import { api } from "@lib/api";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import FooterSection from "../FooterSection/FooterSection";
import Refer from "../Refer/Refer";

const Home = () => {
	const { user } = useAuth(); // Assuming useAuth hook exists and provides user data

	const [showScrollButton, setShowScrollButton] = useState(false);
	const [sliderData, setSliderData] = useState({
		top: [],
		middle: [],
		bottom: [],
	});
	const [loading, setLoading] = useState(true);

	const handleSmoothScroll = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollButton(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [topResponse, middleResponse, bottomResponse] =
					await Promise.all([
						api
							.get("/hero-slider/get-slider/top")
							.catch((error) => null),
						api
							.get("/hero-slider/get-slider/middle")
							.catch((error) => {
								console.log(error);
							}),
						api
							.get("/hero-slider/get-slider/bottom")
							.catch((error) => null),
					]);
				const sliderData = {
					top: topResponse ? topResponse.data : [],
					middle: middleResponse ? middleResponse.data : [],
					bottom: bottomResponse ? bottomResponse.data : [],
				};

				setSliderData(sliderData);
			} catch (error) {
				console.error("Error fetching slider data:", error);
				setSliderData({
					top: [],
					middle: [],
					bottom: [],
				});
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return <LoadingPage />; // Replace LoadingPage with your loading indicator component
	}

	return (
		<div className="px-3">
			<Header />
			<Footer />
			<ShowCartIcon />
			<div className="body-wrapper mb-20 mt-12">
				<HeroSlider sliderData={sliderData.top} />
				{user && <Refer />}
				<HotNews />
				<BestSellerProduct limit={2} type="bestSeller" />
				<AllProducts limit={12} sliderData={sliderData.middle} />
				{showScrollButton && (
					<button
						className="fixed bottom-24 right-5 z-20 rounded-full bg-white bg-opacity-50 p-2 shadow-lg"
						onClick={handleSmoothScroll}
					>
						<FaArrowUp className="text-3xl " color="#90e0ef" />
					</button>
				)}
				<AllShop />
				<div className="my-2">
					<HeroSlider sliderData={sliderData.bottom} />
				</div>
				<TagShop />
				<FooterSection />
			</div>
		</div>
	);
};

export default Home;
