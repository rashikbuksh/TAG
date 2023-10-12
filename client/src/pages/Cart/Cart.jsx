import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartItemStock, getDiscountPrice } from "../../helpers/product";
import { api } from "../../lib/api";
import {
	addToCart,
	decreaseQuantity,
	deleteFromCart,
	increaseQuantity,
} from "../../store/slices/cart-slice";

const Cart = () => {
	const dispatch = useDispatch();

	const userID = localStorage.getItem("user-id");
	const { cartItems } = useSelector((state) => state.cart);
	const [shoppers, setShoppers] = useState([]); // Maintain an array of shoppers
	const [buyStates, setBuyStates] = useState({}); // Initialize a separate buy state for each shop
	const [totals, setTotals] = useState({}); // Store totals for each shopper
	const [productQuantities, setProductQuantities] = useState({});
	const [productDiscounts, setProductDiscounts] = useState({});

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

		const discounts = {};
		cartItems.forEach((cartItem) => {
			if (cartItem.shopper_id === shopperId) {
				discounts[cartItem.id] = cartItem.discount;
			}
		});

		// Store the discounts in state
		setProductDiscounts({
			...productDiscounts,
			[shopperId]: discounts,
		});

		const quantities = {};
		cartItems.forEach((cartItem) => {
			if (cartItem.shopper_id === shopperId) {
				quantities[cartItem.id] = cartItem.quantity;
			}
		});

		// Store the quantities in state
		setProductQuantities({
			...productQuantities,
			[shopperId]: quantities,
		});
	};

	useEffect(() => {
		// Calculate and set totals when cartItems or buyStates change
		const calculatedTotals = {};
		shoppers.forEach((shopper) => {
			const shopperTotal = cartItems.reduce((total, cartItem) => {
				if (cartItem.shopper_id === shopper.id) {
					return (
						total +
						getDiscountPrice(cartItem.price, cartItem.discount) *
							cartItem.quantity
					);
				}
				return total;
			}, 0);
			calculatedTotals[shopper.id] = parseFloat(shopperTotal).toFixed(2);
		});
		setTotals(calculatedTotals);
	}, [cartItems, buyStates]);

	const addOrder = (shopperId) => {
		const productIds = cartItems
			.filter((cartItem) => cartItem.shopper_id === shopperId)
			.map((cartItem) => cartItem.id);

		const quantities = productQuantities[shopperId];
		const discounts = productDiscounts[shopperId];

		const discount = Object.values(discounts).join(",");
		const productid = Object.keys(quantities).join(",");
		const quantity = Object.values(quantities).join(",");

		let total = 0;
		productIds.forEach((productId) => {
			const cartItem = cartItems.find((item) => item.id === productId);
			if (cartItem) {
				const quantity = quantities[productId] || 0;
				const discount = discounts[productId] || 0;
				const price = cartItem.price;
				total += getDiscountPrice(price, discount) * quantity;
			}
		});

		var last_order_id = 0;
		const wantobuy = window.confirm("Are you sure you want to buy?");
		if (!wantobuy) {
			return;
		} else {
			api.post("/order/add_order", {
				product_id: productid,
				quantity: quantity,
				discount: discount,
				customer_profile_id: userID,
				shopper_id: shopperId,
				price: total,
				order_status: "pending",
				weight: 0,
			}).then((res) => {
				console.log("res", res);
				if (res.data.status === 201) {
					api.get("/order/getLastOrder").then((res) => {
						last_order_id = res.data[0].id;
						console.log("last_order_id", last_order_id);
						api.post("/notification/addnotification", {
							notification_content:
								"You have a new order. Order Number is #" +
								last_order_id +
								".",
							notification_time: new Date()
								.toISOString()
								.slice(0, 19)
								.replace("T", " "), // 2021-08-10 12:00:00
							not_from: shopperId,
							not_to: userID,
							status: 0,
						}).then((res) => {
							console.log("res", res);
							if (res.data.status === 201) {
								alert("Notification Added Successfully");
							}
						});
					});
				}
			});

			// remove the items from the cart
			productIds.forEach((productId) => {
				cartItems.forEach((cartItem) => {
					if (cartItem.id === productId) {
						dispatch(deleteFromCart(cartItem, shopperId));
					}
				});
			});
		}
		setTotals((prevTotals) => ({
			...prevTotals,
			[shopperId]: 0,
		}));
		setProductQuantities({
			...productQuantities,
			[shopperId]: {},
		});
		setProductDiscounts({
			...productDiscounts,
			[shopperId]: {},
		});
	};

	return (
		<>
			<div className="my-24 h-full overflow-scroll">
				<h1 className="text-center text-3xl font-bold">Cart</h1>
				<div className="divider"></div>
				{cartItems && cartItems.length > 0 ? (
					shoppers.map((shopper) => (
						<div className="" key={shopper.id}>
							{cartItems.some(
								(cartItem) => cartItem.shopper_id === shopper.id
							) && (
								<Link
									to={`../shopkeeperProfileCV/${shopper.id}`}
								>
									<h2 className="ml-5 mt-4 text-xl font-bold">
										{shopper.name} Store Cart
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
																	import.meta
																		.env
																		.VITE_API_PUBLIC_URL +
																	`/product/${cartItem.id}`
																}
															>
																{cartItem.name}
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
															{cartItem.quantity}
														</h2>
													</div>

													<div>
														<h2 className="text-xs">
															{parseFloat(
																getDiscountPrice(
																	cartItem.price,
																	cartItem.discount
																) *
																	cartItem.quantity
															).toFixed(2)}
														</h2>
														<input
															type="hidden"
															value={
																totals[
																	shopper.id
																] || 0
															} // Use the calculated total for the shopper
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
								<div className="mx-4 my-1 flex items-center justify-between  p-1">
									<div className="flex gap-3">
										{buyStates[shopper.id] ? (
											<>
												<button
													onClick={() =>
														handleBuyClick(
															shopper.id
														)
													}
													className="bg-red-400 px-3 py-1"
												>
													Cancel
												</button>{" "}
												<div className="border px-3 py-1">
													2 minutes remaining
												</div>
												<button
													onClick={() =>
														addOrder(shopper.id)
													}
													className="bg-green-400 px-3 py-1"
												>
													Buy
												</button>{" "}
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
									<h2 className="text-xl font-bold">
										Total:{" "}
										{parseFloat(totals[shopper.id]).toFixed(
											2
										)}
									</h2>
								</div>
							)}
						</div>
					))
				) : (
					<div>No items in cart</div>
				)}
			</div>
			<div className="h-14"></div>
		</>
	);
};

export default Cart;
