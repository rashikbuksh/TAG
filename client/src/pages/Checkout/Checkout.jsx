import { getDiscountPrice } from "@helpers/product";
import { api } from "@lib/api";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { toast } from "react-toastify";

const Checkout = () => {
	const navigate = useNavigate();

	let cartTotalPrice = 0;
	const { cartItems } = useSelector((state) => state.cart);

	const id = localStorage.getItem("user-id");

	const dispatch = useDispatch();

	if (id === null) {
		window.location.href = "/login";
	}

	const [userdata, setUserdata] = useState({});
	const [itemID, setItemID] = useState();

	//get user data
	useEffect(() => {
		api.get(`/profile/get_profile/${id}`).then((response) => {
			setUserdata(response.data[0]);
		});
	}, []);

	var orderedItem = "";
	var discountedItem = "";
	var quantityItem = "";
	var weightItem = "";

	function getItemID() {
		let i = 0;
		while (cartItems[i] != null) {
			orderedItem += cartItems[i].id;
			discountedItem += cartItems[i].discount;
			quantityItem += cartItems[i].quantity;
			weightItem += cartItems[i].weight;
			if (cartItems[i + 1] != null) {
				orderedItem += ",";
				discountedItem += ",";
				quantityItem += ",";
				weightItem += ",";
			}
			i++;
		}
	}
	const settingState = (state) => {
		dispatch({
			type: "change",
			name: state.cart,
			value: "",
		});
	};

	const handleSubmit = () => {
		if (weightItem == "") {
			weightItem = "0";
		}
		getItemID();
		api.post(`/order/add-order`, {
			product_id: orderedItem,
			quantity: quantityItem,
			weight: weightItem,
			price: Number(cartTotalPrice),
			discount: discountedItem,
			order_status: "pending",
			customer_profile_id: Number(id),
		})
			.then((response) => {})
			.catch((error) => {
				toast(error);
			});
	};

	return (
		<div
			className={clsx(
				"body-wrapper",
				cartItems && cartItems.length >= 1 && "bg-color--gradient",
				" "
			)}
		>
			{cartItems && cartItems.length > 0 ? (
				<div className="checkout-body space-mt--30">
					<div className="container">
						<div className="row">
							<div className="col-12">
								{/* checkout form */}
								<div className="checkout-form">
									<form onSubmit={handleSubmit}>
										<div className="checkout-form__single-field space-mb--30">
											<label htmlFor="fullName">
												Full Name
											</label>
											<input
												type="text"
												name="fullName"
												id="fullName"
												placeholder="Enter Full Name"
												value={userdata?.name}
											/>
										</div>
										<div className="checkout-form__single-field space-mb--30">
											<label htmlFor="userName">
												User Name
											</label>
											<input
												type="text"
												name="userName"
												id="userName"
												placeholder="Enter User Name"
												value={userdata?.username}
											/>
										</div>
										<div className="checkout-form__single-field space-mb--30">
											<label htmlFor="phoneNo">
												Phone
											</label>
											<input
												type="text"
												name="phoneNo"
												id="phoneNo"
												placeholder="Enter Phone Number"
												value={userdata?.phone}
											/>
										</div>
										<div className="checkout-form__single-field space-mb--30">
											<label htmlFor="emailAddress">
												Email Address
											</label>
											<input
												type="text"
												name="emailAddress"
												id="emailAddress"
												placeholder="Enter Email Address"
												value={userdata?.email}
											/>
										</div>
										<div className="checkout-form__single-field space-mb--30">
											<label htmlFor="shippingAddress">
												Shipping Address
											</label>
											<textarea
												name="shippingAddress"
												id="shippingAddress"
												cols={30}
												rows={5}
												placeholder="Enter Shipping Address"
												defaultValue={""}
												value={
													userdata?.shipping_address
												}
											/>
										</div>
										<div className="checkout-form__single-field space-mb--30">
											<label htmlFor="orderNotes">
												Order Notes
											</label>
											<textarea
												name="orderNotes"
												id="orderNotes"
												cols={30}
												rows={5}
												placeholder="Enter Order Notes"
												defaultValue={""}
											/>
										</div>
										<div className="your-order-area space-mb--30">
											<h3>Your order</h3>
											<div className="your-order-wrap gray-bg-4">
												<div className="your-order-product-info">
													<div className="your-order-top">
														<ul>
															<li>Product</li>
															<li>Total</li>
														</ul>
													</div>
													<div className="your-order-middle">
														<ul>
															{cartItems.map(
																(
																	cartItem,
																	key
																) => {
																	const discountedPrice =
																		getDiscountPrice(
																			cartItem.price,
																			cartItem.discount
																		);

																	discountedPrice !=
																	null
																		? (cartTotalPrice +=
																				discountedPrice *
																				cartItem.quantity)
																		: (cartTotalPrice +=
																				cartItem.price *
																				cartItem.quantity);
																	return (
																		<li
																			key={
																				key
																			}
																		>
																			<span className="order-middle-left">
																				{
																					cartItem.name
																				}{" "}
																				X{" "}
																				{
																					cartItem.quantity
																				}
																			</span>{" "}
																			<span className="order-price">
																				{discountedPrice !==
																				null
																					? "$" +
																					  (
																							discountedPrice *
																							cartItem.quantity
																					  ).toFixed(
																							2
																					  )
																					: "$" +
																					  (
																							cartItem.price *
																							cartItem.quantity
																					  ).toFixed(
																							2
																					  )}
																			</span>
																		</li>
																	);
																}
															)}
														</ul>
													</div>
													<div className="your-order-bottom">
														<ul>
															<li className="your-order-shipping">
																Shipping
															</li>
															<li>
																Free shipping
															</li>
														</ul>
													</div>
													<div className="your-order-total">
														<ul>
															<li className="order-total">
																Total
															</li>
															<li>
																$
																{cartTotalPrice.toFixed(
																	2
																)}
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
										{/* button not showing.. dummy button */}
										<button
											type="submit"
											className="btn btn-primary btn-outline btn-lg sm:btn-sm md:btn-md lg:btn-lg"
										>
											Place Order
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="no-items-found">
					<div className="no-items-found__image">
						<ReactSVG
							src={
								import.meta.env.VITE_API_PUBLIC_URL +
								"/assets/img/icons/money.svg"
							}
						/>
					</div>
					<div className="no-items-found__content">
						<p>
							No Items in the cart to checkout.{" "}
							<Link
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/shop"
								}
							>
								Add Some
							</Link>
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Checkout;
