/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainProduct from "./MainProduct";

const ProductCart = ({ product }) => {
	const shopper_id = product.shopper_id;

	const [shopper, setShopper] = useState([]);

	useEffect(() => {
		Axios.get(
			`${import.meta.env.VITE_APP_API_URL}/auth/getUserInfo/${shopper_id}`
		).then((res) => {
			setShopper(res.data);
		});
	}, []);

	return (
		<div className="w-[300px] border border-gray-100 mx-auto rounded-md">
			{shopper.map((shopper, key) => (
				<div key={shopper_id} className="">
					<div className="flex items-center justify-between">
						<div className="flex gap-3 items-center px-2 py-2">
							<Link
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									`/shopkeeperProfileCV/${shopper_id}`
								}
							>
								<img
									className="w-10 h-10 rounded-full"
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
										<h4 className="text-lg font-semibold">
											{shopper.name}
										</h4>
									</div>
								</Link>
							</div>
						</div>
						<div className="">
							<Rating
								style={{ maxWidth: 75 }}
								readOnly
								orientation="horizontal"
								value={shopper.review_count}
							/>
						</div>
					</div>
				</div>
			))}

			<MainProduct product={product}></MainProduct>
		</div>
	);
};

export default ProductCart;
