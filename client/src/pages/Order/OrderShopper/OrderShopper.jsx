import { Takaicon } from "@SvgHub/SocialIcon";
import { Breadcrumb } from "@components";
import { useAuth } from "@context/auth";
import FormattedTime from "@helpers/FormattedTime";
import { api } from "@lib/api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrderShopper = () => {
	const [data, setData] = useState([]);

	const { user } = useAuth();

	useEffect(() => {
		const shopper_id = user.id;
		api.get(`/order/getordershopper/${shopper_id}`)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [user.id]);

	const statusClasses = {
		completed: "text-blue-500",
		cancelled: "text-red-500",
		accepted: "text-green-500 text-lg font-bold",
		default: "text-yellow-500",
	};

	return (
		<div className="body-wrapper  ">
			<Breadcrumb pageTitle="Orders" prevUrl="/shopkeeperDashboard" />
			<div className="order-product-area">
				{data?.map((single) => {
					const statusClass =
						statusClasses[single?.order_status] ||
						statusClasses.default;
					return (
						<div
							className="cart-product border-bottom--medium flex items-center justify-between active:bg-gray-200"
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
									{FormattedTime({
										time: single.order_time,
										format: "hh:mm A DD/MM/YY",
									})}
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
										<span className={statusClass}>
											{single.order_status}
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
