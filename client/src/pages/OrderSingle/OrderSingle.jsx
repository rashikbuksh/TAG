import Axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { get, set } from "react-hook-form";
import { FaRedo, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Breadcrumb, ErrorMessage, Preloader } from "../../components";
import { getDiscountPrice } from "../../helpers/product";
import useFetch from "../../hooks/use-fetch";

const OrderSingle = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// get userid from local storage
	const customer_profile_id = localStorage.getItem("user-id");
	const [productInfo, setProductInfo] = useState([]);

	useEffect(() => {
		// get order from database
		Axios.get(
			`${
				import.meta.env.VITE_APP_API_URL
			}/order/getorder/${customer_profile_id}`
		)
			.then((response) => {
				setData(response.data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
		Axios.get(
			`${
				import.meta.env.VITE_APP_API_URL
			}/shopperproduct/getshopperproduct`
		)
			.then((response) => {
				setProductInfo(response.data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
	}, [customer_profile_id]);

	return (
		<div className="body-wrapper space-pt--70 space-pb--120">
			<Breadcrumb pageTitle="Orders" prevUrl="/home" />
			<div className="order-product-area">
				{data?.map((single) => {
					console.log(productInfo);
					return (
						<div
							className="cart-product border-bottom--medium"
							key={single.id}
						>
							<div className="cart-product__image">
								<img
									src={
										import.meta.env.VITE_API_PUBLIC_URL +
										single.productImage
									}
									className="img-fluid"
									alt=""
								/>
							</div>
							<div className="cart-product__content">
								<Link
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										`/order/${single.id}`
									}
								>
									{" "}
									Order Number #{single.id}{" "}
								</Link>
								<span className="category">
									{single.productCategory}
								</span>
								<div className="price">
									{
										<span className="discounted-price">{`$${single.price}`}</span>
									}
								</div>
							</div>
							<div className="cart-product__status">
								<p>
									<span>
										{single.order_status === "completed" ? (
											<FaRegCheckCircle />
										) : single.order_status ===
										  "cancelled" ? (
											<FaRegTimesCircle />
										) : (
											<FaRedo />
										)}
									</span>{" "}
									{single.order_status}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default OrderSingle;
