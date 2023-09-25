/* eslint-disable react/prop-types */

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
	FaClock,
	FaHeart,
	FaMapMarkerAlt,
	FaRegComment,
	FaShare,
	FaShoppingCart,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import { set } from "react-hook-form";
import Modal from "../../components/Modal/Modal";
import MainProduct from "../../components/ProductCart/MainProduct";
import { api } from "../../lib/api";
import CommentModal from "./CommentModal";

const PostUi = ({ postData }) => {
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
	}, []);

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

	return (
		<div className="space-mb--20">
			<div className="rounded-lg border bg-white">
				<div className="p-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							{shopperInfo.map((shopperinfo) => (
								<img
									key={Math.random()}
									className="h-10 w-10 rounded-full"
									src={shopperinfo.image}
									alt=""
								/>
							))}
							<div>
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
								<p className="text-sm text-gray-500">
									{formattedTime}{" "}
									<span className="text-gray-400">
										{formattedDate}
									</span>
								</p>
							</div>
						</div>
						<div className="">
							<Rating
								style={{ maxWidth: 150 }}
								readOnly
								orientation="horizontal"
								value={rating}
							/>
						</div>
					</div>
				</div>
				{shopperProducts &&
					shopperProducts.map((shopperproduct) => (
						<MainProduct
							key={shopperproduct.id}
							shopperProduct={shopperproduct}
						/>
					))}

				<div className="px-4 py-2">
					<div className="mb-4">
						{shopperProducts ? (
							<div>
								<p className="text-sm">{post_content}</p>
								{post_img && (
									<img
										className="mt-2 h-64 w-full object-cover"
										src={`${
											import.meta.env.VITE_APP_IMG_URL
										}/newsimage/${post_img}`}
										alt=""
									/>
								)}
							</div>
						) : (
							<>
								{" "}
								<p className="text-sm">
									<span className="text-primary">
										<FaShoppingCart className="inline-block align-text-top" />
									</span>{" "}
									{discount}
								</p>
								<p className="mt-1 text-sm">
									<span className="text-primary">
										<FaClock className="inline-block align-text-top" />
									</span>{" "}
									{duration}
								</p>
								<p className="text-sm">
									<span className="text-primary">
										<FaMapMarkerAlt className="inline-block align-text-top" />
									</span>{" "}
									{location}
								</p>
							</>
						)}
					</div>
					<hr className="my-2" />
					<div className="flex justify-between">
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
											console.log(res, "res");
											setIsLiked(true);
											setLikeId(res.data.id);
											api.post(
												`/news/increaseLikeCount/${id}`
											);
											// window.location.reload();
										});
									}}
								>
									<FaHeart className="text-black-500 text-lg" />
								</button>
							)}
						</div>
						<div className="flex flex-col items-center justify-center">
							<div className="text-xs">
								<p className="text-sm">
									{comment_count} comments
								</p>
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
							<FaShare className="text-lg" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostUi;
