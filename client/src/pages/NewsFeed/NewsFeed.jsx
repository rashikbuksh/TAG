import Axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import NewsFeedInput from "../../components/NewsFeedInput/NewsFeedInput";
import { api } from "../../lib/api";
import PostUi from "../PostUi/PostUi";
import TagNewsUi from "../PostUi/TagNewsUi";
import ShowCartIcon from "../../components/ShowCartIcon/ShowCartIcon";
import { useAuth } from "../../context/auth";

const NewsFeed = () => {
	const [posts, setPosts] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [showScrollButton, setShowScrollButton] = useState(false);

	const handleNewsInput = () => {
		setIsOpen(!isOpen);
	};

	const handleSmoothScroll = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		api.get("/news/getnews")
			.then((res) => {
				setPosts(res.data);
			})
			.catch((err) => {
				// console.log(err);
			});

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
	}, [posts]);
	const { user } = useAuth();
	return (
		<div className="mt-20">
			<div className="mx-auto w-[90%]">
				<h1 className="text-center text-2xl font-bold">News Feed</h1>
				<div className="divider my-0"></div>
				<div className="lg:grid lg:grid-cols-12 ">
					<div className="lg:col-span-3"></div>
					<div className="lg:col-span-6">
						<ShowCartIcon></ShowCartIcon>
						{user.access === "customer" ? (
							""
						) : (
							<>
								<div
									onClick={handleNewsInput}
									className="mb-4 w-full rounded border bg-white p-4 shadow-md"
								>
									{"Write Post"}
								</div>
								<NewsFeedInput
									isOpen={isOpen}
									setIsOpen={setIsOpen}
								></NewsFeedInput>
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
