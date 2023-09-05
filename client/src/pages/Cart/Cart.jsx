import Axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { FaCross, FaTimes } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { Breadcrumb } from "../../components";
import { cartItemStock, getDiscountPrice } from "../../helpers/product";
import { api } from "../../lib/api";
import {
	addToCart,
	decreaseQuantity,
	increaseQuantity,
} from "../../store/slices/cart-slice";

const Cart = () => {
	const dispatch = useDispatch();
	const { cartItems } = useSelector((state) => state.cart);
	const [shoppers, setShoppers] = useState([]); // Maintain an array of shoppers

	// Initialize a separate buy state for each shop
	const [buyStates, setBuyStates] = useState({});

	useEffect(() => {
		api.get("/auth/getShopperInfo").then((res) => {
			setShoppers(res.data);
			// Initialize the buy states with default values (false for each shop)
			const initialBuyStates = {};
			res.data.forEach((shopper) => {
				initialBuyStates[shopper.id] = false;
			});
			setBuyStates(initialBuyStates);
		});
	}, []);

	console.log(shoppers, "shoppers");
	console.log(cartItems, "cartItems");
	var current_id;

	const handleBuyClick = (shopperId) => {
		// Toggle the buy state for the specific shop
		setBuyStates((prevBuyStates) => ({
			...prevBuyStates,
			[shopperId]: !prevBuyStates[shopperId],
		}));
	};

	return (
		<div className="my-32">
			<h1 className="text-center text-3xl font-bold">Cart</h1>
			<div className="divider"></div>
			{shoppers ? (
				shoppers.map((shopper) => {
					let cartTotalPrice = 0;
					return (
						<div
							key={shopper.id}
							className="mx-auto w-[90%] border p-3"
						>
							{cartItems &&
								cartItems.map((cartItem, key) => {
									if (cartItem.shopper_id === shopper.id) {
										return (
											<div
												key={cartItem.id}
												className="my-4"
											>
												<div className="flex items-center gap-6">
													<h3 className="text-base">
														<Link
															to={
																import.meta.env
																	.VITE_API_PUBLIC_URL +
																`/shopkeeperProfileCV/${shopper.id}`
															}
														>
															{shopper.id}
														</Link>
													</h3>
													<h3 className="text-xl font-bold">
														{shopper.name}
													</h3>
												</div>
												<div>
													<div className="flex items-center justify-between border p-2">
														<div>
															<h1 className="text-base font-bold">
																<Link
																	to={
																		import.meta
																			.env
																			.VITE_API_PUBLIC_URL +
																		`/product/${cartItem.id}`
																	}
																>
																	{
																		cartItem.name
																	}
																</Link>
															</h1>
															<div className="">
																<h2 className="text-xs">
																	{
																		cartItem.weight
																	}
																</h2>
																<div className="cart-product__counter">
																	<div className="cart-plus-minus">
																		<button
																			className="dec qtybutton"
																			onClick={() =>
																				dispatch(
																					decreaseQuantity(
																						cartItem
																					)
																				)
																			}
																		>
																			-
																		</button>
																		<input
																			className="cart-plus-minus-box"
																			type="text"
																			value={
																				cartItem.quantity
																			}
																			readOnly
																		/>
																		<button
																			className="inc qtybutton"
																			onClick={() =>
																				dispatch(
																					increaseQuantity(
																						{
																							cartItem,
																							quantity:
																								cartItem.quantity,
																						}
																					)
																				)
																			}
																			disabled={
																				cartItem !==
																					undefined &&
																				cartItem.quantity &&
																				cartItem.quantity >=
																					cartItemStock(
																						cartItem
																					)
																			}
																		>
																			+
																		</button>
																	</div>
																</div>
															</div>
														</div>

														<div>
															<h2 className="text-xs">
																{getDiscountPrice(
																	cartItem.price,
																	cartItem.discount
																)}{" "}
																X{" "}
																{
																	cartItem.quantity
																}
															</h2>
														</div>

														<div>
															<h2 className="text-xs">
																{getDiscountPrice(
																	cartItem.price,
																	cartItem.discount
																) *
																	cartItem.quantity}
															</h2>
															<input
																type="hidden"
																value={
																	(cartTotalPrice +=
																		getDiscountPrice(
																			cartItem.price,
																			cartItem.discount
																		) *
																		cartItem.quantity)
																}
															/>
														</div>
													</div>
												</div>
											</div>
										);
									} else {
										return <div key={Math.random()}></div>;
									}
								})}
							<div className="flex items-center justify-between p-1">
								{buyStates[shopper.id] ? (
									<div className="flex gap-3">
										<button
											onClick={() =>
												handleBuyClick(shopper.id)
											}
											className="bg-red-400 px-3 py-1"
										>
											Cancel
										</button>{" "}
										<div className="border px-3 py-1">
											2 minutes remaining
										</div>
									</div>
								) : (
									<button
										onClick={() =>
											handleBuyClick(shopper.id)
										}
										className="bg-green-400 px-3 py-1"
									>
										Buy
									</button>
								)}

								<div>{cartTotalPrice}</div>
							</div>
						</div>
					);
				})
			) : (
				<div> No items in cart</div>
			)}
		</div>
	);
};

export default Cart;
