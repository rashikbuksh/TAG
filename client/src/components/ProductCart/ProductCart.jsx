/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import MainProduct from "./MainProduct";
import logo from "../../../public/assets/img/Tag-logo-blue-get_50_50.png";

const ProductCart = ({ product }) => {
	const divStyle = {
		borderRadius: "6px",
		border: "0.5px solid #E4E4E4",
		background: "#FFF",
	};
	// console.log(product,"productCart");
	const shopper_id = product.shopper_id;

	const [shopper, setShopper] = useState([]);

	useEffect(() => {
		api.get(`/auth/getUserInfo/${shopper_id}`).then((res) => {
			setShopper(res.data);
			// console.log(res.data);
		});
	}, []);

	// console.log(shopper, "shopper in pc");

	return (
		<div
			className="border border-[#ffffffec] rounded"
			style={{ boxShadow: "0px 8px 32px 0px rgba(184, 184, 184, 0.10)" }}
		>
			{shopper.map((shopper) => (
				<div key={shopper_id} className="">
					<div
						style={divStyle}
						className="flex items-center gap-3 p-2  "
					>
						<div className="">
							<Link
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									`/shopkeeperProfileCV/${shopper_id}`
								}
							>
								<img
									className="h-6 w-6 rounded-full"
									src={
										shopper.profile_picture
											? `${
													import.meta.env
														.VITE_APP_IMG_URL
											  }/usersProfilePic/${
													shopper.profile_picture
											  }`
											: logo
									}
									alt=""
								/>
							</Link>
						</div>
						<div className="">
							<div>
								<Link
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										`/shopkeeperProfileCV/${shopper_id}`
									}
								>
									<div className="flex">
										<h4 className="flex h-[30px] w-full items-center text-xs font-semibold ">
											{shopper.name}
										</h4>
									</div>
								</Link>
							</div>
							<Rating
								style={{ maxWidth: 60 }}
								readOnly
								orientation="horizontal"
								value={shopper.review_count}
							/>
						</div>
					</div>
					<MainProduct
						product={product}
						shoperName={shopper.name}
						shopper_id={shopper_id}
						height={150}
						width={150}
					></MainProduct>
				</div>
			))}
		</div>
	);
};

export default ProductCart;
