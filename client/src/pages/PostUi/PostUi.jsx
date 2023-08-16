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

import MainProduct from "../../components/ProductCart/MainProduct";

const PostUi = ({ postData }) => {
	console.log(postData);

	const [shopperProduct, setShopperProduct] = useState([]);
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
		Axios.get(
			`${
				import.meta.env.VITE_APP_API_URL
			}/shopperproduct/getshopperproduct/${shopper_product_id}}`
		).then((res) => {
			console.log(res.data);
			setShopperProduct(res.data);
		});
		Axios.get(
			`${import.meta.env.VITE_APP_API_URL}/auth/getUserInfo/${shop_id}}`
		).then((res) => {
			console.log(res.data);
			setShopperInfo(res.data);
		});
	}, []);

	const currentDate = new Date(date);
	const formattedTime = currentDate.toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit",
	});
	const formattedDate = currentDate.toLocaleDateString();

	return (
		<div className="space-mb--20">
			<div className="bg-white border rounded-lg">
				<div className="p-4">
					<div className="flex items-center justify-between">
						<div className="flex gap-3 items-center">
							{shopperInfo.map((shopperinfo) => (
								<img
									className="w-10 h-10 rounded-full"
									src={shopperinfo.image}
									alt=""
								/>
							))}
							<div>
								<Link
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										`/product/${shopper_product_id}`
									}
								>
									{shopperInfo.map((shopperinfo) => (
										<div className="flex">
											<h4 className="text-lg font-semibold">
												{shopperinfo.name}
											</h4>
											<p className="text-gray-500 ml-1">
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
				{shopperProduct &&
					shopperProduct.map((shopperproduct) => (
						<MainProduct
							key={shopperproduct.id}
							productImage={shopperproduct.image}
							productName={shopperproduct.name}
							shopperProduct_id={shopperproduct.id}
							shopperProductPrice={shopperproduct.price}
							shopperProductDiscount={shopperproduct.discount}
						/>
					))}

				<div className="px-4 py-2">
					<div className="mb-4">
						{shopperProduct ? (
							""
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
							<FaHeart className="text-red-500 text-lg" />
						</div>
						<div className="flex flex-col items-center justify-center">
							<div className="text-xs">
								<p className="text-sm">
									{comment_count} comments
								</p>
							</div>
							<FaRegComment className="text-lg" />
						</div>
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
