import cogoToast from "@hasanm95/cogo-toast";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Takaicon } from "../../SvgHub/SocialIcon";
import { useAuth } from "../../context/auth";
import GetDateTime from "../../helpers/GetDateTime";
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
	const { user } = useAuth();
	const { cartItems } = useSelector((state) => state.cart);
	const [shoppers, setShoppers] = useState([]); // Maintain an array of shoppers
	const [buyStates, setBuyStates] = useState({}); // Initialize a separate buy state for each shop
	const [clickedState, setClickedState] = useState(true);
	const [countdown, setCountdown] = useState(120); // Countdown timer in seconds
	const [shopperId, setshopperId] = useState(null); // Countdown timer in seconds
	const [timerStarted, setTimerStarted] = useState(false);
	const [runningTimerShopperId, setRunningTimerShopperId] = useState(null);
	const [intervalId, setIntervalId] = useState(null);
	const productDiscount = useRef({});
	const productQuantity = useRef({});
	const productPrice = useRef({});

	// cart_order_timer
	const cart_order_timer = "cart_order_timer";
	const [cart_order_timer_value, setCart_order_timer_value] = useState();

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
		api.get(`/util/getUtil/${cart_order_timer}`).then((res) => {
			setCart_order_timer_value(res.data[0].value);
		});
	}, []);

	useEffect(() => {
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [shopperId]);
	const redirectTimer = async (shopperId) => {
		setRunningTimerShopperId(shopperId);
		setTimerStarted(true);
		setCountdown(cart_order_timer_value); // Reset countdown to 120 seconds when Buy button is clicked

		if (intervalId) {
			clearInterval(intervalId);
		}

		const interval = setInterval(() => {
			setCountdown((prevCountdown) => {
				if (prevCountdown > 0) {
					return prevCountdown - 1;
				} else {
					clearInterval(interval);
					return prevCountdown;
				}
			});
		}, 1000);

		setIntervalId(interval);

		setTimeout(() => {
			if (countdown > 0 && timerStarted == true) {
				clearInterval(interval);
				setRunningTimerShopperId(null);
				addOrder(shopperId); // Perform action after countdown completes
			}
		}, 12000);
	};
	useEffect(() => {
		if (timerStarted && countdown === 0) {
			addOrder(shopperId);
			// Perform action after countdown completes
		}
	}, [countdown, timerStarted]);

	const calculatedTotals = useMemo(() => {
		// Calculate and set totals when cartItems or buyStates change
		const totals = {};
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
			totals[shopper.id] = parseFloat(shopperTotal).toFixed(2);
		});
		return totals;
	}, [cartItems, buyStates, shoppers]);

	const navigate = useNavigate();
	const addOrder = (shopperId) => {
		// Check if productDiscounts[shopperId] is defined, if not, set it as an empty object

		const productIds =
			cartItems
				?.filter((cartItem) => cartItem.shopper_id === shopperId)
				?.map((cartItem) => cartItem) || {};

		const total = calculatedTotals[shopperId] || 0;

		const wantobuy = window.confirm("Are you sure you want to buy?");
		if (!wantobuy) {
			return;
		} else {
			addOrderToDB(productIds, total);
			// remove the items from the cart
			productIds.forEach((productId) => {
				cartItems.forEach((cartItem) => {
					if (cartItem.id === productId) {
						dispatch(deleteFromCart(cartItem, shopperId));
					}
				});
			});
		}
		navigate("/orderStatus");
	};

	const addOrderToDB = async (productIds, total) => {
		try {
			const orderRes = await api.post("/order/add-order", {
				customer_profile_id: user.id,
				shopper_id: shopperId,
				order_status: "pending",
				order_time: GetDateTime(),
				price: total,
			});
			if (orderRes.status == 201) {
				const lastOrderRes = await api.get(
					`/order/getLastOrder/${user.id}`
				);
				if (lastOrderRes.status == 200) {
					let last_order_id = lastOrderRes.data[0].id;

					const notificationRes = await api.post(
						"/notification/addnotification",
						{
							notification_content:
								"You have a new order. Order Number is #" +
								last_order_id +
								".",
							notification_time: GetDateTime(),
							not_from: shopperId,
							not_to: user.id,
							status: 1,
						}
					);
					if (notificationRes.status == 201) {
						const productPromises = productIds.map((product) => {
							const productid = product.id;
							const quantity = product.quantity;
							const discount = product.discount;
							const price = product.price;
							const weight = product.weight || 0;

							return api.post(
								`/ordered-product/add-ordered-product`,
								{
									order_id: last_order_id,
									product_id: productid,
									quantity: quantity,
									discount: discount,
									price: price,
									weight: weight,
								}
							);
						});

						const responses = await Promise.all(productPromises);
					}
				}
			}
		} catch (error) {
			// At least one API call failed
			cogoToast.error("Order failed", {
				position: "bottom-left",
			});
		}
	};

	const handleBuyClick = (shopperId) => {
		if (
			runningTimerShopperId !== null &&
			runningTimerShopperId !== shopperId
		) {
			// If a timer is already running for another shopper, return without starting a new timer
			cogoToast.warn("Please wait for the current timer to complete", {
				position: "bottom-left",
			});
			return;
		}
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
				discounts[cartItem.id] = cartItem.discount;
			}
		});
		const quantities = {};
		cartItems.forEach((cartItem) => {
			if (cartItem.shopper_id === shopperId) {
				quantities[cartItem.id] = cartItem.quantity;
			}
		});
		if (clickedState == true) {
			redirectTimer(shopperId);
			cogoToast.warn(
				"Order auto-submitted after 2 mins.If you want to cancel, click 'Cancel",
				{
					position: "bottom-left",
				}
			);
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

		setTimerStarted(false);

		// const discounts = {};
		// cartItems.forEach((cartItem) => {
		// 	if (cartItem.shopper_id === shopperId) {
		// 		productDiscount[cartItem.id] = cartItem.discount;
		// 		productQuantity[cartItem.id] = cartItem.quantity;
		// 		productPrice[cartItem.id] = cartItem.price;
		// 		discounts[cartItem.id] = cartItem.discount;
		// 	}
		// });
		// const quantities = {};
		// cartItems.forEach((cartItem) => {
		// 	if (cartItem.shopper_id === shopperId) {
		// 		quantities[cartItem.id] = cartItem.quantity;
		// 	}
		// });
		setRunningTimerShopperId(null);
	};

	return (
		<>
			<div className="mx-auto my-14 h-full overflow-scroll lg:w-[50%]">
				<h1 className="text-center text-2xl font-bold">Cart</h1>
				<Link to={"/orderStatus"} className="mr-6 flex justify-end">
					<p className="primary-text link">See Order Status</p>
				</Link>

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
											{shopper.name}
										</h2>
									</Link>
									<div className="mx-auto mb-3 h-[1px] w-[90%] bg-[#EBEBEB]"></div>
								</>
							)}
							{cartItems.map((cartItem) => {
								if (cartItem.shopper_id === shopper.id) {
									return (
										<div
											key={cartItem.id}
											className="mx-auto w-[100%] p-2"
										>
											<div>
												<div className="relative  bg-gray-100 px-2 py-3">
													<button
														onClick={() =>
															dispatch(
																deleteFromCart(
																	cartItem
																)
															)
														}
														className="absolute right-4 top-3"
													>
														<FaTrash className="text-red-400"></FaTrash>
													</button>
													<img
														className="absolute top-2 h-[60px]  w-[60px] "
														src={`${
															import.meta.env
																.VITE_APP_IMG_URL
														}/products/${
															cartItem.image
														}`}
														alt="Selected Product"
													/>
													<div className="ms-auto flex w-[80%] items-start gap-3">
														<Link
															to={`${
																import.meta.env
																	.VITE_API_PUBLIC_URL
															}/product/${
																cartItem.id
															}`}
															className="w-full"
														>
															<h1 className="text-sm ">
																{cartItem.name}
															</h1>
														</Link>
													</div>
													<div className="my-1 ms-auto flex w-[80%] items-center justify-center gap-6">
														<div>
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

														<div className="flex-grow">
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

														<div className="">
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
																	calculatedTotals[
																		shopper
																			.id
																	] || 0
																}
															/>
														</div>
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
									{runningTimerShopperId === shopper.id && (
										<div className="p-1 text-xs">
											<div
												style={{
													fontSize: "15px",
												}}
											>
												<span>
													{Math.floor(countdown / 60)}
													m
												</span>
												<span>{countdown % 60}s</span>
											</div>
										</div>
									)}

									<div className="flex gap-3">
										{buyStates[shopper.id] ? (
											<>
												<button
													onClick={() => {
														setClicked(true);
														handelCancel(
															shopper.id
														);
													}}
													className="h-[24px] w-[48px] rounded bg-[#a92f4e] text-xs text-white"
												>
													Cancel
												</button>{" "}
												<button
													onClick={() => {
														addOrder(shopper.id);
														setshopperId(
															shopper.id
														);
													}}
													className="h-[24px] w-[48px] rounded bg-[#2F5BA9] text-sm text-white"
												>
													Buy2
												</button>{" "}
											</>
										) : (
											<button
												onClick={() => {
													setClicked(false),
														handleBuyClick(
															shopper.id
														),
														setshopperId(
															shopper.id
														);
												}}
												disabled={
													runningTimerShopperId !==
														null &&
													runningTimerShopperId !==
														shopper.id
												}
												className="h-[24px] w-[48px] rounded bg-[#2F5BA9] text-sm text-white"
											>
												Buy1
											</button>
										)}
									</div>
									<h2 className="flex items-center justify-center gap-2 text-xs font-bold">
										<Takaicon></Takaicon>
										{parseFloat(
											calculatedTotals[shopper.id]
										).toFixed(2)}
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
