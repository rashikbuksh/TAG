import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { api } from "../../lib/api";
import PostUi from "../../pages/PostUi/PostUi";
import TagNewsUi from "../../pages/PostUi/TagNewsUi";

const HotNews = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		api.get("/news/getnews")
			.then((res) => {
				setPosts(res.data);
			})
			.catch((err) => {
				// console.log(err);
			});
	}, []);

	// Function to generate a random color
	const getRandomLightColor = () => {
		const randomChannel = () => Math.floor(Math.random() * 128) + 128; // Generate values between 128 and 255
		const red = randomChannel().toString(16).padStart(2, "0"); // Convert to hexadecimal and ensure 2-digit format
		const green = randomChannel().toString(16).padStart(2, "0");
		const blue = randomChannel().toString(16).padStart(2, "0");
		return `#${red}${green}${blue}`;
	
	};
	const productPost = posts.filter((post) => post.shopper_product_id !== null);
	// Shuffle and get the first 5 posts
	const shuffledPosts = productPost.sort(() => Math.random() - 0.5).slice(0, 5);

	return (
		<div className="mx-auto my-10 max-w-7xl">
			<h1 className="my-2 text-xl">Hot News</h1>
			<div className="">
				<Swiper
					slidesPerView={1.5}
					spaceBetween={10}
					grabCursor={true}
					pagination={{
						clickable: true,
					}}
					className="mySwiper"
				>
					{shuffledPosts.map((postData, index) => {
						// Generate a random background color for each div
						const randomColor = getRandomLightColor();

						return (
							<SwiperSlide key={index}>
								{postData.category === "regular" ? (
									<Link to={`/newsfeed`}>
										<div
											className="h-16 rounded-xl w-60 px-1 flex items-center justify-center"
											style={{
												backgroundColor: randomColor,
											}}
										>
											<div className="flex items-center  gap-2">
												<div>
													{postData.post_img &&
														(postData.shopper_product_id ? (
															<img
																className="w-[50px] h-[50px] rounded-lg"
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
