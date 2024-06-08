import { Breadcrumb } from "@components";
import NewsFeedInput from "@components/News/NewsFeedInput/NewsFeedInput";
import ShowCartIcon from "@components/ShowCartIcon/ShowCartIcon";
import { useAuth } from "@context/auth";
import { api } from "@lib/api";
import React, { useCallback, useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import PostUi from "../PostUi/PostUi";

const NewsFeed = () => {
	const [posts, setPosts] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [showScrollButton, setShowScrollButton] = useState(false);
	const [isDataFetched, setIsDataFetched] = useState(false); // Track whether data is fetched

	const { user } = useAuth();

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollButton(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await api.get("/news/get-news");
				setPosts(res.data);
				setIsDataFetched(true); // Set flag indicating data is fetched
			} catch (err) {
				console.error(err);
			}
		};

		// Fetch data only if not already fetched
		if (!isDataFetched) {
			fetchPosts();
		}
	}, [isDataFetched]);

	const handleNewsInput = () => {
		setIsOpen(!isOpen);
	};

	const handleSmoothScroll = useCallback(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	return (
		<div className="">
			<div className="mx-auto w-[95%]">
				<ShowCartIcon />
				<Breadcrumb pageTitle={"News Feed"} prevUrl={"/home"} />
				<div className="lg:grid lg:grid-cols-12 ">
					<div className="lg:col-span-3 "></div>
					<div className="lg:col-span-6 ">
						{user.access !== "customer" && (
							<>
								<div
									onClick={handleNewsInput}
									className="my-2 w-full rounded border bg-white p-4 shadow-md"
								>
									{"Write Post"}
								</div>
								<NewsFeedInput
									isOpen={isOpen}
									setIsOpen={setIsOpen}
								/>
							</>
						)}

						<div>
							{posts.map((postData, index) => (
								<PostUi key={index} postData={postData} />
							))}
						</div>
					</div>
					<div className="lg:col-span-3"></div>
				</div>
			</div>
			<div className="h-24"></div>
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

export default NewsFeed;
