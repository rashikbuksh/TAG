import { useEffect, useState } from "react";
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
				console.log(err);
			});
	}, []);

	// Shuffle and get the first 5 posts
	const shuffledPosts = posts.sort(() => Math.random() - 0.5).slice(0, 5);

	console.log(posts);
	console.log(shuffledPosts, "shuffledPosts");

	return (
		<div className="mx-3 my-10">
			<h1 className="my-2 text-xl">Hot News</h1>
			<div className="">
				<Swiper
					slidesPerView={2}
					spaceBetween={10}
					grabCursor={true}
					pagination={{
						clickable: true,
					}}
					className="mySwiper"
				>
					{shuffledPosts.map((postData, index) => (
						<SwiperSlide key={index}>
							{postData.category === "regular" ? (
								<div className="bg-gray-200 w-44 h-12 rounded p-1">
									<p>{postData.post_content || "This is hot news"}</p>
								</div>
							) : (
								<p>TAg Data</p>
							)}
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default HotNews;
