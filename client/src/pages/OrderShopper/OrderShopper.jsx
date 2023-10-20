import React, { useEffect, useState } from "react";
import { Breadcrumb } from "../../components";
import { api } from "../../lib/api";
import OrderModal from "./OrderModal";

const OrderShopper = () => {
	const [data, setData] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [order_Id, setOrder_Id] = useState("");
	const [order_status, setOrder_status] = useState("");
	const [orderData, setOrderData] = useState(null);
	const [totalPrice, setTotalPrice] = useState(null);

	// Get user ID from local storage
	const shopper_id = localStorage.getItem("user-id");

	useEffect(() => {
		api.get(`/order/getordershopper/${shopper_id}`)
			.then((response) => {
				setData(response.data);
				// console.log(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [shopper_id]);

	const handleOpenModal = (single) => {
		setOrderData(single);
		setOrder_status(single.order_status);
		setOrder_Id(single.id);
		setTotalPrice(single.price);
		setIsOpen(true); // Moved setIsOpen here
	};

	return (
		<div className="body-wrapper space-pt--70 space-pb--120">
			<Breadcrumb pageTitle="Orders" prevUrl="/home" />
			<div className="order-product-area">
				{data?.map((single) => (
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
						<div
							onClick={() => handleOpenModal(single)}
							className="cart-product__content"
						>
							Order Number #{single.id}{" "}
							<span className="category">
								{single.productCategory}
							</span>
							<div className="price">
								<span className="discounted-price">{`$${single.price}`}</span>
							</div>
						</div>
					</div>
				))}
			</div>
			<OrderModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				order_Id={order_Id}
				order_status={order_status}
				orderData={orderData}
				totalPrice={totalPrice}
			/>
		</div>
	);
};

export default OrderShopper;
