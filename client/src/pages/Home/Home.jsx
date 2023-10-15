import React, { useState } from "react";
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


	return (
		<div className="body-wrapper space-pt--70 space-pb--120">
			{/* hero slider */}
			<HeroSlider />
			<Refer></Refer>
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
