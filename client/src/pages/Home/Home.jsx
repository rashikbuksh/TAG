import Cookies from "js-cookie";
import { useEffect, useState } from "react";
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
import { api } from "../../lib/api";
import FooterSection from "../FooterSection/FooterSection";
import Refer from "../Refer/Refer";
import AllShop from "../../components/Shop/AllShop";
import TagShop from "../../components/TagShop/TagShop";
import { useNotification } from "../../context/NotificationProvider";

const Home = () => {
	const { user, Logout } = useAuth();

	const [showScrollButton, setShowScrollButton] = useState(false);
	const [sliderDataTop, setSliderDataTop] = useState([]);
	const [sliderDataMiddel, setSliderDataMiddel] = useState([]);
	const [sliderDataBottom, setSliderDataBottom] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false); // New state variable

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

		// Simulating the completion of data loading
		setTimeout(() => {
			setDataLoaded(true);
		}, 2000); // You may replace this with your actual data loading logic

		if (!user) {
			localStorage.removeItem("user-id");
			Cookies.remove("user");
			Cookies.remove("auth");
		}
	}, []);
	const { notifications } = useNotification();
	console.log("🚀 ~ Home ~ notifications:", notifications);
	return (
		<div className="px-3">
			<Header />
			<Footer />
			<ShowCartIcon />
			<div className="body-wrapper mb-20 mt-12">
				{/* <Helmet>
					<title>Home-TAG</title>
				</Helmet> */}
				<HeroSlider sliderData={sliderDataTop} />
				{user ? <Refer /> : ""}
				<HotNews />
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
				<AllShop />
				<TagShop />
				{dataLoaded && <FooterSection />}{" "}
				{/* Conditionally render the FooterSection */}
			</div>
		</div>
	);
};

export default Home;
