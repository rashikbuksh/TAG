import cogoToast from "@hasanm95/cogo-toast";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Takaicon } from "../../SvgHub/SocialIcon";
import { useAuth } from "../../context/auth";
import GetDateTime from "../../helpers/GetDateTime";
import { cartItemStock, getDiscountPrice } from "../../helpers/product";
import NoItemInCart from "../../../public/icons/shopping_cart_remove.png";
import { api } from "../../lib/api";
import {
	addToCart,
	decreaseQuantity,
	deleteFromCart,
	increaseQuantity,
} from "../../store/slices/cart-slice";
import { Breadcrumb } from "../../components";
import Swal from "sweetalert2";

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
	const [cart_order_timer_value, setCart_order_timer_value] = useState();
	const cart_order_timer = "cart_order_timer";

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
		// Retrieve countdown timer data from local storage on component mount
		const timerData = JSON.parse(localStorage.getItem("cart_timer_data"));
		console.log("🚀 ~ useEffect ~ timerData:", timerData);
		if (timerData) {
			setCountdown(timerData.countdown);
		}
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
	const localStorageKey = "cart_timer_data";

	// Load timer data from localStorage on component mount
	// useEffect(() => {
	// 	const timerData = JSON.parse(localStorage.getItem(localStorageKey));
	// 	if (timerData) {
	// 		setCountdown(timerData.countdown);
	// 		setTimerStarted(timerData.timerStarted);
	// 		setRunningTimerShopperId(
	// 			timerData.shopperId ? timerData.shopperId : "null"
	// 		);
	// 		console.log(timerData);
	// 	}
	// }, []);
	useEffect(() => {
		if (timerStarted) {
			localStorage.setItem(
				"cart_timer_data",
				JSON.stringify({
					shopperId: runningTimerShopperId,
					countdown,
					timerStarted,
				})
			);
		}
	}, [runningTimerShopperId, countdown, timerStarted]);

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

		Swal.fire({
			title: "Are you sure?",
			text: "Are you sure you want to buy?",
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes",
			cancelButtonText: "No",
		}).then((result) => {
			if (result.isConfirmed) {
				// User clicked 'Yes'
				setCountdown(120);
				addOrderToDB(productIds, total);
				navigate("/orderStatus");
			} else {
				// User clicked 'No' or closed the dialog
				return;
			}
		});
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
						console.log(
							"🚀 ~ file: Cart.jsx:201 ~ addOrderToDB ~ responses:",
							responses
						);
						const isDeleteProduct = responses.every(
							(response) => response.status === 201
						);
						console.log(isDeleteProduct);
						handelCancel(shopperId);
						if (isDeleteProduct) {
							productIds.forEach((productId) => {
								console.log(productId, "productId");
								cartItems.forEach((cartItem) => {
									console.log(
										"🚀 ~ file: Cart.jsx:212 ~ cartItems.forEach ~ cartItem:",
										cartItem
									);
									if (cartItem.id === productId.id) {
										dispatch(
											deleteFromCart(cartItem, shopperId)
										);
									}
								});
							});
						}

						// All API calls were successful
						console.log(responses);
						// navigate("/orderStatus");
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
		setCountdown(cart_order_timer_value);
		// const interval = setInterval(() => {
		// 	setCountdown((prevCountdown) => {
		// 		clearInterval(interval);
		// 		clearInterval(intervalId);
		// 		return prevCountdown;
		// 	});
		// }, 1000);
		clearInterval(intervalId);
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
	const isTimeRunning =
		localStorage.getItem("cart_timer_data") &&
		JSON.parse(localStorage.getItem("cart_timer_data")).timerStarted &&
		JSON.parse(localStorage.getItem("cart_timer_data")).countdown > 0;
	console.log("🚀 ~ Cart ~ isTimeRunning:", isTimeRunning);
	return (
		<>
			<div className="mx-auto mt-8 h-full overflow-scroll lg:w-[50%]">
				<Breadcrumb pageTitle={"Cart"} prevUrl={"/home"}></Breadcrumb>
				<Link to={"/orderStatus"} className="mr-2 flex justify-end">
					<p className="text-md link mt-2 font-bold uppercase text-green-500">
						{" "}
						Order Status
					</p>
				</Link>

				{cartItems && cartItems.length > 0 ? (
					shoppers.map((shopper) => (
						<div className="" key={shopper.id}>
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
									<div className="flex items-center gap-3">
										{isTimeRunning &&
										buyStates[shopper.id] ? (
											<>
												<button
													onClick={() => {
														setClicked(true);
														handelCancel(
															shopper.id
														);
													}}
													className="rounded bg-[#a92f4e] px-3 py-2 text-xs text-white"
												>
													Cancel
												</button>{" "}
												{runningTimerShopperId ===
													shopper.id && (
													<div className="p-1 text-xs">
														<div
															style={{
																fontSize:
																	"15px",
															}}
														>
															<span>
																{Math.floor(
																	countdown /
																		60
																)}
																m
															</span>
															<span>
																{countdown % 60}
																s
															</span>
														</div>
													</div>
												)}
												<button
													onClick={() => {
														addOrder(shopper.id);
														setshopperId(
															shopper.id
														);
													}}
													className=" rounded bg-[#2F5BA9] px-3 py-2 text-sm text-white"
												>
													Confirm
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
												className="rounded bg-[#2F5BA9] px-3 py-2 text-sm text-white"
											>
												Buy
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
					<div className="flex h-[40vh] flex-col items-center justify-center gap-2">
						<img src={NoItemInCart} alt="" />
						<p className="font-bold">No items in cart</p>
					</div>
				)}
			</div>
			<div className="h-14"></div>
		</>
	);
};

export default Cart;
