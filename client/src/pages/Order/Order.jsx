import { Takaicon } from "@SvgHub/SocialIcon";
import { Breadcrumb } from "@components";
import { api } from "@lib/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { FormatDateInBST, FormatTimeInBST } from "@helpers/GetDateTime";

const Order = () => {
	const [data, setData] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [order_Id, set_Order_id] = useState("");
	const [totalPrice, setTotalPrice] = useState(null);
	const handelOpenModal = (single) => {
		setTotalPrice(single.price);
		set_Order_id(single.id);
		setIsOpen(!isOpen);
	};

	// get userid from local storage
	const customer_profile_id = localStorage.getItem("user-id");

	useEffect(() => {
		api.get(`/order/getorder/${customer_profile_id}`)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				toast(error);
			});
	}, [customer_profile_id]);
	console.log(data.length)
	return (
		<div className="body-wrapper">
			<Breadcrumb pageTitle="Orders" prevUrl="/home" />
			<div className="order-product-area pb-16">
				{data.length > 0 ? (
					
					data?.map((single) => {
						console.log(single);
						return (
							<Link
								to={`/orderDetails/${single.id}`}
								className="cart-product border-bottom--medium  flex items-center justify-between text-xl hover:bg-gray-100 active:bg-gray-200"
								key={single.id}
							>
								<div className="flex flex-col gap-2">
									<span>Order Number #{single.id}</span>
									<span className="text-sm">
										{FormatDateInBST(single.order_time)}{" "}
										<br />
										{FormatTimeInBST(single.order_time)}
									</span>
								</div>

								<div className="text-xs"></div>
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
											<span className="capitalize ">
												{single.order_status ==
												"completed" ? (
													<span className="text-blue-500">
														{single.order_status}
													</span>
												) : single.order_status ==
												  "cancelled" ? (
													<span className="text-red-500">
														{single.order_status}
													</span>
												) : single.order_status ==
												  "accepted" ? (
													<span className="text-green-500">
														{single.order_status}
													</span>
												) : (
													<span className="text-yellow-500">
														{single.order_status}
													</span>
												)}
											</span>
										</p>
									</div>
								</div>
							</Link>
						);
					})
				) : (
					<div className="flex h-[calc(100vh_-_190px)] flex-grow items-start justify-center bg-gray-50">
						<div className="mt-10 rounded-lg bg-white p-8 text-center ">
							<h1 className="mb-4 text-4xl font-bold">
								No Order History
							</h1>
							<p className="text-gray-600">
								Sorry ! Currently you have no order found
							</p>
							<a
								href="/"
								className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
							>
								{" "}
								Go back to Home{" "}
							</a>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Order;
