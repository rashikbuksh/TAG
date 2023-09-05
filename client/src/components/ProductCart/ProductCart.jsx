/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import MainProduct from "./MainProduct";

const ProductCart = ({ product }) => {
	const shopper_id = product.shopper_id;

	const [shopper, setShopper] = useState([]);

	useEffect(() => {
		api.get(`/auth/getUserInfo/${shopper_id}`).then((res) => {
			setShopper(res.data);
		});
	}, []);

	return (
		<div className="mx-auto w-[300px] rounded-md border border-gray-100">
			{shopper.map((shopper, key) => (
				<div key={shopper_id} className="">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3 px-2 py-2">
							<Link
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									`/shopkeeperProfileCV/${shopper_id}`
								}
							>
								<img
									className="h-10 w-10 rounded-full"
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
