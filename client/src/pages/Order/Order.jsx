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

const Order = () => {
	const [data, setData] = useState([]);
	const [isOpen,setIsOpen]=useState(false)
	const [order_Id,set_Order_id]=useState("")

	const handelOpenModal=(id)=>{
		set_Order_id(id)
		setIsOpen(!isOpen)

	}

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
							<div onClick={()=>handelOpenModal(single.id)} className="cart-product__content">
									Order Number #{single.id}{" "}
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
				<OrderModal isOpen={isOpen} setIsOpen={setIsOpen} order_Id={order_Id}></OrderModal>
		</div>
	);
};

export default Order;
