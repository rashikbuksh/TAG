import Axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { get, set } from "react-hook-form";
import { FaRedo, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Breadcrumb, ErrorMessage, Preloader } from "../../components";
import { getDiscountPrice } from "../../helpers/product";
import useFetch from "../../hooks/use-fetch";
import { api } from "../../lib/api";
import OrderModal from "./OrderModal/OrderModal";
import { Takaicon } from "../../SvgHub/SocialIcon";

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
				alert(error);
			});
	}, [customer_profile_id]);

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
								to={`/orderDetails/${single.id}`}
								className="font-s text-lg"
							>
								Order Number #{single.id}{" "}
								<span className="category">
									{single.productCategory}
								</span>
								<div className="text-xs">
									<span>2 jan 2023 </span> <span>8:30</span>
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

export default Order;
