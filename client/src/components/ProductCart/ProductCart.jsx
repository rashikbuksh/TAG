/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import MainProduct from "./MainProduct";
import logo from "../../../public/assets/img/logo.png";

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
		});
	}, []);

	return (
		<div
			className="w-[170px]"
			style={{ boxShadow: "0px 8px 32px 0px rgba(184, 184, 184, 0.10)" }}
		>
			{shopper.map((shopper) => (
				<div key={shopper_id} className="">
					<div
						style={divStyle}
						className="flex items-center gap-3 p-2 "
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
									src={shopper.image ? shopper.image : logo}
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
										<h4 className="w-full text-base font-semibold">
											{shopper.name}
										</h4>
									</div>
								</Link>
							</div>
							<Rating
								style={{ maxWidth: 80 }}
								readOnly
								orientation="horizontal"
								value={shopper.review_count}
							/>
						</div>
					</div>
					{/* <div className="flex flex-col justify-between">
						<div className="flex items-center gap-3 px-2 py-2">
							<Link
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									`/shopkeeperProfileCV/${shopper_id}`
								}
							>
								<img
									className="h-6 w-6 rounded-full"
									src={shopper.image}
									alt=""
								/>
							</Link>
							<div>
								<Link
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										`/shopkeeperProfileCV/${shopper_id}`
									}
								>
									<div className="flex">
										<h4 className="text-sm font-semibold">
											{shopper.name}
										</h4>
									</div>
								</Link>
							</div>
						</div>
						<div className="ml-10">
							<Rating
								style={{ maxWidth: 80 }}
								readOnly
								orientation="horizontal"
								value={shopper.review_count}
							/>
						</div>
					</div> */}
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
