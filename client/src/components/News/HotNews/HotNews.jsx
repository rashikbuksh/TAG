import { useFetchFunc } from "@hooks";
import { api } from "@lib/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const HotNews = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useFetchFunc("/news/getHotNews", 0, setPosts, setLoading, setError);

	// Function to generate a random color
	const getRandomLightColor = () => {
		const randomChannel = () => Math.floor(Math.random() * 128) + 128; // Generate values between 128 and 255
		const red = randomChannel().toString(16).padStart(2, "0"); // Convert to hexadecimal and ensure 2-digit format
		const green = randomChannel().toString(16).padStart(2, "0");
		const blue = randomChannel().toString(16).padStart(2, "0");
		return `#${red}${green}${blue}`;
	};

	const productPost = posts.filter(
		(post) => post.shopper_product_id !== null
	);

	return (
		<div className="mx-auto  max-w-7xl">
			<h1 className="my-2 text-xl font-semibold text-red-600">
				Hot News
			</h1>
			<div className="">
				<Swiper
					slidesPerView={1.5}
					spaceBetween={10}
					grabCursor={true}
					speed={1000}
					modules={[Autoplay, Pagination, Navigation]}
					autoplay={{
						delay: 3500,
						disableOnInteraction: false,
					}}
					breakpoints={{
						260: {
							slidesPerView: 1,
							spaceBetween: 20,
						},
						360: {
							slidesPerView: 1.5,
							spaceBetween: 15,
						},
						768: {
							slidesPerView: 3,
							spaceBetween: 30,
						},
						1024: {
							slidesPerView: 4,
							spaceBetween: 40,
						},
					}}
					className="mySwiper"
				>
					{productPost.map((postData, index) => {
						// Generate a random background color for each div
						const randomColor = getRandomLightColor();

						return (
							<SwiperSlide key={index}>
								{postData.category === "regular" ? (
									<Link
										to={`/product/${
											postData.shopper_product_id
										}/${postData.post_content.replace(
											/\s/g,
											""
										)}`}
									>
										<div
											className="flex h-16 w-60 items-center justify-center rounded-xl px-1"
											style={{
												background:
													"linear-gradient(95deg, rgba(200, 255, 238, 0.60) -11.92%, #E6FFD5 113.41%)",
											}}
										>
											<div className="flex items-center  gap-2">
												<div>
													{postData.post_img &&
														(postData.shopper_product_id ? (
															<img
																className="h-[50px] w-[50px] rounded-lg"
																src={`${
																	import.meta
																		.env
																		.VITE_APP_IMG_URL
																}/products/${
																	postData.post_img
																}`}
																alt=""
															/>
														) : (
															<img
																className="h-[34px] w-[50px] rounded-lg"
																src={`${
																	import.meta
																		.env
																		.VITE_APP_IMG_URL
																}/newsimage/${
																	postData.post_img
																}`}
																alt=""
															/>
														))}
												</div>

												<p className=" text-sx  text-black">
													{postData.post_content ||
														"New Product Added"}
												</p>
											</div>
										</div>
									</Link>
								) : (
									<p>Tag Data</p>
								)}
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</div>
	);
};

export default HotNews;
