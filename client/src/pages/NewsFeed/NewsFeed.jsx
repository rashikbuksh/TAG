import Axios from "axios";
import React, { useEffect, useState } from "react";
import NewsFeedInput from "../../components/NewsFeedInput/NewsFeedInput";
import { api } from "../../lib/api";
import PostUi from "../PostUi/PostUi";
import TagNewsUi from "../PostUi/TagNewsUi";

const NewsFeed = () => {
	const [posts, setPosts] = useState([]);
	const [isOpen,setIsOpen]=useState(false)
	useEffect(() => {
		api.get("/news/getnews")
			.then((res) => {
				// console.log(res.data);
				setPosts(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [posts]);
const handelNewsInput=()=>{
	setIsOpen(!isOpen)
}
	return (
		<div className="mt-20">
			<div className="mx-auto w-[90%]">
				<h1 className="text-center text-2xl font-bold">News</h1>
				<div className="divider"></div>
				<div className="lg:grid lg:grid-cols-12 ">
					<div className="lg:col-span-3"></div>
					<div className="lg:col-span-6">

					<div onClick={handelNewsInput} className="w-full bg-white border rounded p-4 shadow-md mb-4" >
					{"write Post"}
					</div>
				
						<NewsFeedInput isOpen={isOpen} setIsOpen={setIsOpen}></NewsFeedInput>
						<div>
							{posts.map((postData, index) =>
								postData.category === "regular" ? (
									<PostUi key={index} postData={postData} />
								) : (
									<TagNewsUi
										key={index}
										postData={postData}
									/>
								)
							)}
						</div>
					</div>
					<div className="lg:col-span-3"></div>
				</div>
			</div>
			<div className="h-24"></div>
		</div>
	);
};

export default NewsFeed;
