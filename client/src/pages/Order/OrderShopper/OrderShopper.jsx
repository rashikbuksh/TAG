import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Takaicon } from "../../../SvgHub/SocialIcon";
import { Breadcrumb } from "../../../components";
import { api } from "../../../lib/api";

const OrderShopper = () => {
	const [data, setData] = useState([]);

	// Get user ID from local storage
	const shopper_id = localStorage.getItem("user-id");

	useEffect(() => {
		api.get(`/order/getordershopper/${shopper_id}`)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [shopper_id]);

	return (
		<div className="body-wrapper space-pt--70 space-pb--120">
			<Breadcrumb pageTitle="Orders" prevUrl="/home" />
			<div className="order-product-area">
				{data?.map((single) => {
					return (
						<div
							className="cart-product border-bottom--medium flex items-center justify-between"
							key={single.id}
						>
							<Link
								// onClick={() => handelOpenModal(single)}
								to={`/orderShoperDetails/${single.id}`}
								className="font-s text-lg"
							>
								Order Number #{single.id}{" "}
								<span className="category">
									{single.productCategory}
								</span>
								<div className="text-xs">
									<span>2 jan 2023 </span> <span>8:30</span>
								</div>
								<div>
									<span className="text-xs">
										{" "}
										Customer Id:
									</span>{" "}
									<span className="text-sm font-bold">
										{single.customer_profile_id}
									</span>
								</div>
							</Link>

							<div>
								<div className="price">
									{
										<span className="discounted-price flex items-center gap-2 text-base">
											<Takaicon></Takaicon>
											{`${single.price}`}
										</span>
									}
								</div>

								<div className="mx-auto">
									<p className="flex items-center gap-2">
										<span>
											{single.order_status ==
											"completed" ? (
												<span className="text-green-500">
													{single.order_status}
												</span>
											) : single.order_status ==
											  "cancelled" ? (
												<span className="text-red-500">
													{single.order_status}
												</span>
											) : single.order_status ==
											  "accepted" ? (
												<span className="primary-text text-lg font-bold">
													{single.order_status}
												</span>
											) : (
												<span className="text-yellow-500">
													{single.order_status}
												</span>
											)}
										</span>{" "}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default OrderShopper;
