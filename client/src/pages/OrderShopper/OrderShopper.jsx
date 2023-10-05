import Axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { get, set } from "react-hook-form";
import { FaRedo, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Breadcrumb, ErrorMessage, Preloader } from "../../components";
import { getDiscountPrice } from "../../helpers/product";
import useFetch from "../../hooks/use-fetch";
import { api } from "../../lib/api";
import OrderModal from "./OrderModal";


const OrderShopper = () => {
	const [data, setData] = useState([]);
	const [isOpen,setIsOpen]=useState(false)
	const [order_Id,set_Order_id]=useState("")
	const [order_status,set_order_status]=useState("")
	const [orderData,setOrderData]=useState(null)


	const handelOpenModal=(single)=>{
		setOrderData(single);
		set_order_status(single.order_status)
		set_Order_id(single.id)
		setIsOpen(!isOpen)
	}


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



	return (
		<div className="body-wrapper space-pt--70 space-pb--120">
			<Breadcrumb pageTitle="Orders" prevUrl="/home" />
			<div className="order-product-area">
				{data?.map((single) => { // Generate a unique id for each select element
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
							<div onClick={()=>handelOpenModal(single)} className="cart-product__content">
							
									{" "}
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
							
							
						</div>
					);
				})}
			</div>
			<OrderModal isOpen={isOpen} setIsOpen={setIsOpen} order_Id={order_Id} order_status={order_status} orderData={orderData}></OrderModal>
		</div>
	);
};

export default OrderShopper;
