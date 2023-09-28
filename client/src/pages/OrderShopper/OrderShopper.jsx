import Axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { get, set } from "react-hook-form";
import { FaRedo, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Breadcrumb, ErrorMessage, Preloader } from "../../components";
import { getDiscountPrice } from "../../helpers/product";
import useFetch from "../../hooks/use-fetch";
import { api } from "../../lib/api";

const OrderShopper = () => {
	const [data, setData] = useState([]);

	// get userid from local storage
	const shopper_id = localStorage.getItem("user-id");

	useEffect(() => {
		api.get(`/order/getordershopper/${shopper_id}`)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				alert(error);
			});
	}, [shopper_id, data]);

	const handleStatusChange = (id, selectId) => {
		console.log("order_id: ", id);
		const order_status = document.getElementById(selectId).value; // Use selectId to find the correct element
		console.log("order_status: ", order_status);

		api.post(`/order/updateorderstatus/${id}`, {
			order_status: order_status,
		})
			.then((response) => {
				alert(response.data.message);
			})
			.catch((error) => {
				alert(error);
			});
	};

	return (
		<div className="body-wrapper space-pt--70 space-pb--120">
			<Breadcrumb pageTitle="Orders" prevUrl="/home" />
			<div className="order-product-area">
				{data?.map((single) => {
					const selectId = `prod_status_${single.id}`; // Generate a unique id for each select element
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
								<select
									id={selectId} // Use the unique id for this select element
									className="mb-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
									onChange={() =>
										handleStatusChange(single.id, selectId)
									} // Pass the selectId as an argument
									value={single.order_status}
								>
									<option value="pending">
										<FaRedo /> Pending
									</option>
									<option value="completed">
										<FaRegCheckCircle /> Completed
									</option>
									<option value="cancelled">
										<FaRegTimesCircle /> Cancelled
									</option>
									<option value="other">
										<FaRedo /> Other
									</option>
								</select>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default OrderShopper;
