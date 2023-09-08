import Axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

	const handleBuyClick = (shopperId) => {
		// Toggle the buy state for the specific shop
		setBuyStates((prevBuyStates) => ({
			...prevBuyStates,
			[shopperId]: !prevBuyStates[shopperId],
		}));
	};
	var total = 0;

	return (
		<div className="full-height my-32 overflow-scroll">
			<h1 className="text-center text-3xl font-bold">Cart</h1>
			<div className="divider"></div>
			{cartItems && cartItems.length > 0 ? (
				shoppers.map((shopper) => (
					<div key={shopper.id}>
						{cartItems.some(
							(cartItem) => cartItem.shopper_id === shopper.id
						) && (
							<Link to={`../shopkeeperProfileCV/${shopper.id}`}>
								<h2 className="mt-4 text-xl font-bold">
									{shopper.name}'s Cart
								</h2>
							</Link>
						)}
						{cartItems.map((cartItem) => {
							let cartTotalPrice = 0;
							if (cartItem.shopper_id === shopper.id) {
								return (
									<div
										key={cartItem.id}
										className="mx-auto w-[90%] border p-3"
									>
										<div>
											<div className="flex items-center justify-between border p-2">
												<div>
													<h1 className="text-base font-bold">
														<Link
															to={
																import.meta.env
																	.VITE_API_PUBLIC_URL +
																`/product/${cartItem.id}`
															}
														>
															{cartItem.name}
														</Link>
													</h1>
													<div className="">
														<h2 className="text-xs">
															{cartItem.weight}
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
														X {cartItem.quantity}
													</h2>
												</div>

												<div>
													<h2 className="text-xs">
														{getDiscountPrice(
															cartItem.price,
															cartItem.discount
														) * cartItem.quantity}
													</h2>
													<input
														type="hidden"
														value={
															(total +=
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
							}
							return null;
						})}
						{cartItems.some(
							(cartItem) => cartItem.shopper_id === shopper.id
						) && (
							<div>
								<h2>Total: {total}</h2>
								<div className="flex gap-3">
									{buyStates[shopper.id] ? (
										<>
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
										</>
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
								</div>
							</div>
						)}
						<input type="hidden" value={(total = 0)} />
					</div>
				))
			) : (
				<div>No items in cart</div>
			)}
		</div>
	);
};

export default Cart;
