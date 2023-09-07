import React from "react";
import {
	AllProducts,
	BestSellerProduct,
	CategorySlider,
	HeroSlider,
} from "../../components";
import HotNews from "../../components/HotNews/HotNews";

const Home = () => {
	return (
		<div className="body-wrapper space-pt--70 space-pb--120">
			{/* hero slider */}
			<HeroSlider />
			{/* category slider */}
			{/* <CategorySlider /> */}
			<HotNews></HotNews>
			{/* best seller products */}
			<BestSellerProduct limit={2} type="bestSeller" />
			{/* all products */}
			<AllProducts limit={12} />
		</div>
	);
};

export default Home;
