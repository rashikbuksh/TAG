import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";
import { cartItemStock, getDiscountPrice } from "../../helpers/product";
import { api } from "../../lib/api";
import {
	addToCart,
	decreaseQuantity,
	deleteFromCart,
	increaseQuantity,
} from "../../store/slices/cart-slice";
import { FaTrash } from "react-icons/fa";
import { Takaicon } from "../../SvgHub/SocialIcon";
import cogoToast from "@hasanm95/cogo-toast";

const Cart = () => {
	const {
		totalSeconds,
		seconds,
		minutes,
		hours,
		days,
		isRunning,
		start,
		pause,
		reset,
	} = useStopwatch({ autoStart: false });
	const dispatch = useDispatch();

	const userID = localStorage.getItem("user-id");
	const { cartItems } = useSelector((state) => state.cart);
	const [shoppers, setShoppers] = useState([]); // Maintain an array of shoppers
	const [buyStates, setBuyStates] = useState({}); // Initialize a separate buy state for each shop
	const [totals, setTotals] = useState({}); // Store totals for each shopper
	const [productQuantities, setProductQuantities] = useState({});
	const [productDiscounts, setProductDiscounts] = useState({});
	const productDiscount = useRef({});
	const productQuantity = useRef({});
	const productPrice = useRef({});
	const [clickedState, setClickedState] = useState(true);
	const timeoutIdRef = useRef(null);

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

	const redirectTimer = async (shopperId) => {
		// console.log(clickedState);
		if (clickedState === true) {
			// Store the timeout ID in a variable
			const timeoutId = setTimeout(() => {
				addOrder(shopperId);
				pause()
			}, 120000);

			timeoutIdRef.current = timeoutId;
			// Clear the timeout when "Cancel1" is clicked
			return () => {
				reset();
				clearTimeout(timeoutId);
			};
		}
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
	}, [cartItems, buyStates, shoppers, productDiscounts]);

	const addOrder = (shopperId) => {
		// Check if productDiscounts[shopperId] is defined, if not, set it as an empty object
		
		const productIds =
			cartItems
				.filter((cartItem) => cartItem.shopper_id === shopperId)
				.map((cartItem) => cartItem.id) || {};

		const quantities = productQuantity || {};
		const discounts = productDiscount || {};
		const prices = productPrice || {};

		var discount = Object.entries(discounts).map(([key, value]) => {
			return value;
		});
		var productid = Object.entries(quantities).map(([key, value]) => {
			return key;
		});
		var quantity = Object.entries(quantities).map(([key, value]) => {
			return value;
		});
		discount.pop();
		productid.pop();
		quantity.pop();

		discount = discount.join(",");
		productid = productid.join(",");
		quantity = quantity.join(",");

		let total = 0;
		productIds.forEach((productId) => {
			const cartItem = cartItems.find((item) => item.id === productId);
			if (cartItem) {
				const quantity = quantities[productId] || 0;
				const discount = discounts[productId] || 0;
				const price = prices[productId];
				total += getDiscountPrice(price, discount) * quantity;
			}
		});

		// console.log(total, "total");

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
				if (res.data.status === 201) {
					api.get("/order/getLastOrder").then((res) => {
						last_order_id = res.data[0].id;
						api.post("/notification/addnotification", {
							notification_content:
								"You have a new order. Order Number is #" +
								last_order_id +
								".",
							notification_time: new Date()
								.toISOString()
								.slice(0, 19)
								.replace("T", " "),
							not_from: shopperId,
							not_to: userID,
							status: 0,
						}).then((res) => {
							if (res.data.status === 201) {
								// alert("Notification Added Successfully");
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
		if (!productDiscounts[shopperId]) {
			// console.log(discount, productid, quantity, "all");
			setProductDiscounts({
				...productDiscounts,
				[shopperId]: {},
			});
		}
	};

	const handleBuyClick = (shopperId) => {
		// console.log(clickedState, "handle buy");
		// Toggle the buy state for the specific shop
		setBuyStates((prevBuyStates) => ({
			...prevBuyStates,
			[shopperId]: !prevBuyStates[shopperId],
		}));

		const discounts = {};
		cartItems.forEach((cartItem) => {
			if (cartItem.shopper_id === shopperId) {
				productDiscount[cartItem.id] = cartItem.discount;
				productQuantity[cartItem.id] = cartItem.quantity;
				productPrice[cartItem.id] = cartItem.price;
				// console.log(cartItem.id, "discount", cartItem.discount);
				discounts[cartItem.id] = cartItem.discount;
			}
		});
		// console.log(productDiscount, "productDiscount");
		// console.log(productQuantity, "productQuantity");
		// console.log(productPrice, "productPrice");

		// Store the discounts in state
		setProductDiscounts((prevDiscounts) => ({
			...prevDiscounts,
			[shopperId]: discounts,
		}));

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
		if (clickedState == true) {
			redirectTimer(shopperId);
			cogoToast.warn("Order auto-submitted after 2 mins.If you want to cancel, click 'Cancel", {
				position: "bottom-left",
			});
		}
	};

	const setClicked = (value) => {
		setClickedState(value);
	};
	const handelCancel = (shopperId) => {
		setBuyStates((prevBuyStates) => ({
			...prevBuyStates,
			[shopperId]: !prevBuyStates[shopperId],
		}));

		const discounts = {};
		cartItems.forEach((cartItem) => {
			if (cartItem.shopper_id === shopperId) {
				productDiscount[cartItem.id] = cartItem.discount;
				productQuantity[cartItem.id] = cartItem.quantity;
				productPrice[cartItem.id] = cartItem.price;
				// console.log(cartItem.id, "discount", cartItem.discount);
				discounts[cartItem.id] = cartItem.discount;
			}
		});
		// console.log(productDiscount, "productDiscount");
		// console.log(productQuantity, "productQuantity");
		// console.log(productPrice, "productPrice");

		// Store the discounts in state
		setProductDiscounts((prevDiscounts) => ({
			...prevDiscounts,
			[shopperId]: discounts,
		}));

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
		clearTimeout(timeoutIdRef.current);
		reset();
	};

	return (
		<>
			<div className="mx-auto my-14 h-full overflow-scroll lg:w-[50%]">
				<h1 className="text-center text-2xl font-bold">Cart</h1>

				{cartItems && cartItems.length > 0 ? (
					shoppers.map((shopper) => (
						<div className="mb-10" key={shopper.id}>
							{cartItems.some(
								(cartItem) => cartItem.shopper_id === shopper.id
							) && (
								<>
									<Link
										to={`../shopkeeperProfileCV/${shopper.id}`}
									>
										<h2 className=" px-4 text-base font-semibold">
											{shopper.name} Store Items
										</h2>
									</Link>
									<div className="mx-auto mb-3 h-[1px] w-[90%] bg-[#EBEBEB]"></div>
								</>
							)}
							{cartItems.map((cartItem) => {
								let cartTotalPrice = 0;
								if (cartItem.shopper_id === shopper.id) {
									return (
										<div
											key={cartItem.id}
											className="mx-auto w-[100%] p-3"
										>
											<div>
												<div className="relative flex items-center justify-between bg-gray-100 p-2">
													<button
														onClick={() =>
															dispatch(
																deleteFromCart(
																	cartItem
																)
															)
														}
														className="absolute right-2 top-2"
													>
														<FaTrash className="text-red-400"></FaTrash>
													</button>
													<img
														className="h-[50px] w-[50px] "
														src={`${
															import.meta.env
																.VITE_APP_IMG_URL
														}/products/${
															cartItem.image
														}`}
														alt="Selected Product"
													/>
													<div>
														<Link
															to={`${
																import.meta.env
																	.VITE_API_PUBLIC_URL
															}/product/${
																cartItem.id
															}`}
														>
															<h1 className="text-sm ">
																{cartItem.name}
															</h1>
														</Link>

														<div className="">
															<h2 className="text-xs">
																{
																	cartItem.weight
																}
															</h2>
															<div className="cart-product__counter">
																<div className="flex items-center justify-center gap-2">
																	<button
																		className="quantity-button bg-[#60abe9]"
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
																		className="w-[30px] bg-gray-100 text-center"
																		type="text"
																		value={
																			cartItem.quantity
																		}
																		readOnly
																	/>
																	<button
																		className="quantity-button primary-background "
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
								<div className="mx-4 my-1 flex items-center justify-between p-1">
									<div className="flex gap-3">
										{buyStates[shopper.id] ? (
											<>
												<button
													onClick={() => {
														setClicked(true),
															handelCancel(
																shopper.id
															);
													}}
													className="h-[24px] w-[48px] rounded bg-[#a92f4e] text-sm text-white"
												>
													Cancel
												</button>{" "}
												<div className="p-1 text-xs">
													<div
														style={{
															fontSize: "15px",
														}}
													>
														<span>{minutes}</span>m
														<span>{seconds}</span>s
													</div>
													<p>
														{isRunning
															? ""
															: "Stop Timer"}
													</p>
												</div>
												<button
													onClick={() =>
														addOrder(shopper.id)
													}
													className="h-[24px] w-[48px] rounded bg-[#2F5BA9] text-sm text-white"
												>
													Buy
												</button>{" "}
											</>
										) : (
											<button
												onClick={() => {
													setClicked(false),
														handleBuyClick(
															shopper.id
														),
														start();
												}}
												className="h-[24px] w-[48px] rounded bg-[#2F5BA9] text-sm text-white"
											>
												Buy
											</button>
										)}
									</div>
									<h2 className="flex items-center justify-center gap-2 text-xs font-bold">
										<Takaicon></Takaicon>
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
