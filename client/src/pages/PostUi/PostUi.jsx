/* eslint-disable react/prop-types */

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";
import {
	FaClock,
	FaHeart,
	FaMapMarkerAlt,
	FaRegComment,
	FaShare,
	FaShoppingCart,
	FaTrash,
} from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { Link } from "react-router-dom";
import demoProfile from "../../../src/assets/img/Tag-logo-blue-get_50_50.png";
import Modal from "../../components/Modal/Modal";
import MainProduct from "../../components/ProductCart/MainProduct";
import { useAuth } from "../../context/auth";
import { api } from "../../lib/api";
import CommentModal from "./CommentModal";
import { FaX } from "react-icons/fa6";
const PostUi = ({ postData }) => {
	const { user } = useAuth();
	const userid = localStorage.getItem("user-id");
	const [shopperProducts, setShopperProduct] = useState([]);
	const [shopperInfo, setShopperInfo] = useState([]);

	const {
		id,
		shopper_product_id,
		shop_id,
		date,
		discount,
		duration,
		location,
		like_count,
		comment_count,
		share_count,
		rating,
		category,
		post_content,
		post_img,
	} = postData;

	useEffect(() => {
		if (shopper_product_id == null) {
		} else {
			api.get(
				`/shopperproduct/getshopperproduct/${shopper_product_id}}`
			).then((res) => {
				setShopperProduct(res.data);
			});
		}

		api.get(`/auth/getUserInfo/${shop_id}}`).then((res) => {
			setShopperInfo(res.data);
		});
	}, [postData]);

	const currentDate = new Date(date);
	const formattedTime = currentDate.toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit",
	});
	const formattedDate = currentDate.toLocaleDateString();

	// check if post is liked by user
	const [isLiked, setIsLiked] = useState(false);
	const [likeId, setLikeId] = useState(null);
	const [newsid, setNewsid] = useState([]);

	useEffect(() => {
		api.get(`/newslike/getlike/${userid}`).then((res) => {
			if (res.data.length > 0) {
				setNewsid(res.data);
				setIsLiked(true);
				setLikeId(res.data[0].id);
			} else {
				setIsLiked(false);
			}
		});
	}, [likeId]);

	let [isOpen, setIsOpen] = useState(false);
	let [commentId, setcommentId] = useState("");

	function openModal(id) {
		if (id == 0) {
			return;
		}
		setcommentId(id);
		setIsOpen(true);
	}

	const handleNewsDelete = () => {
		const confirm = window.confirm("Are you sure you want to delete?");
		if (!confirm) return;
		api.delete(`/news/deletenews/${id}`)
			.then((res) => {
				alert("News Deleted Successfully");
			})
			.catch((error) => {
				alert(error);
			});
	};

	return (
		<div className="my-6">
			<div className="rounded-lg ">
				<div className="">
					<div className="flex items-center justify-between ">
						<div className="mx-auto flex w-full items-center justify-between gap-3 rounded-lg border p-2 ">
							{shopperInfo.map((shopperinfo) => (
								<img
									key={Math.random()}
									className="h-10 w-10 rounded-full"
									src={
										shopperinfo.image
											? shopperinfo.image
											: demoProfile
									}
									alt=""
								/>
							))}
							<div>
								<div className="flex items-center gap-3">
									<Link
										to={`${
											import.meta.env.VITE_API_PUBLIC_URL
										}/shopkeeperProfileCV/${shop_id}`}
									>
										{shopperInfo.map((shopperinfo) => (
											<div key={shop_id} className="flex">
												<h4 className="text-lg font-semibold">
													{shopperinfo.name}
												</h4>
												<p className="ml-1 text-gray-500">
													{shopperinfo.user_name}
												</p>
											</div>
										))}
									</Link>
									<div className="flex">
										<div>
											<Rating
												style={{ maxWidth: 80 }}
												readOnly
												orientation="horizontal"
												value={rating}
											/>
										</div>
										
									</div>
								</div>
							
								<p className="text-sm text-gray-500">
									{formattedTime}{" "}
									<span className="text-gray-400">
										{formattedDate}
									</span>
								</p>
							</div>
							<div className="flex justify-end">
											{shop_id == userid ||
											user.access == "admin" ? (
												<button
													className="text-xs text-gray-500"
													onClick={handleNewsDelete}
												>
													<FaX size={20}/>
												</button>
											) : (
												""
											)}
										</div>
						</div>
						
					</div>
					
				</div>
				{shopper_product_id && (
					<div className="border-top-0  mx-auto mt-2 rounded-lg border ">
						{shopperProducts &&
							shopperProducts.map((shopperproduct) => (
								<MainProduct
									key={shopperproduct.id}
									shopperProduct={shopperproduct}
								/>
							))}
					</div>
				)}

				{shopper_product_id ? (
					""
				) : (
					<div className="border-top-0 my-1 rounded-lg border">
						{shopperProducts ? (
							<div>
								{shopper_product_id ? (
									""
								) : (
									<div className="">
										<p className="mx-4 my-3 text-base">
											{post_content}
										</p>
									</div>
								)}

								{shopper_product_id
									? ""
									: post_img && (
											<img
												className="mx-auto my-2  h-1/2 object-cover lg:w-1/2"
												src={`${
													import.meta.env
														.VITE_APP_IMG_URL
												}/newsimage/${post_img}`}
												alt=""
											/>
									  )}
							</div>
						) : (
							""
						)}
					</div>
				)}

				<div className="my-2 flex justify-between rounded-lg border p-2">
					<div className="flex flex-col items-center justify-center">
						<div className="text-xs">
							<p className="text-sm">{like_count} Likes</p>
						</div>
						{newsid.find((news) => news.news_id == id) &&
						isLiked ? (
							<button
								onClick={() => {
									api.delete(
										`/newslike/deletelike/${likeId}`
									).then((res) => {
										setIsLiked(false);
										api.post(
											`/news/decreaseLikeCount/${id}`
										);
										// window.location.reload();
									});
								}}
							>
								<FaHeart className="text-lg text-red-500" />
							</button>
						) : (
							<button
								onClick={() => {
									api.post("/newslike/addLike", {
										news_id: id,
										liked_by: Number(userid),
									}).then((res) => {
										setIsLiked(true);
										setLikeId(res.data.id);
										api.post(
											`/news/increaseLikeCount/${id}`
										);
									});
								}}
							>
								<FaHeart className="text-black-500 text-lg" />
							</button>
						)}
					</div>
					<div className="flex flex-col items-center justify-center">
						<div className="text-xs">
							<p className="text-sm">{comment_count} comments</p>
						</div>
						<button type="button" onClick={() => openModal(id)}>
							<FaRegComment className="text-lg" />
						</button>
					</div>
					<CommentModal
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						title={"comments"}
						id={id}
						setcommentId={setcommentId}
					>
						Hi
					</CommentModal>
					<div className="flex flex-col items-center justify-center">
						<div className="text-xs">
							<p className="text-sm">{share_count} share</p>
						</div>
						<PiShareFat className="text-lg" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostUi;
