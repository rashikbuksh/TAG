import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Takaicon } from "../../SvgHub/SocialIcon";
import { useAuth } from "../../context/auth";
import { getDiscountPrice } from "../../helpers/product";
import { api } from "../../lib/api";
// import { FaDotCircle } from "react-icons/fa";
import { check } from "prettier";
import { FaCircle } from "react-icons/fa6";

const OrderStatus = () => {
	const [pendingOrders, setPendingOrders] = useState([]);
	const [products, setProducts] = useState([]);
	const [timers, setTimers] = useState({});
	const { user } = useAuth();
	const fetchUpdatedOrders = () => {
		// Fetch updated orders from the backend
		const customer_profile_id = user.id;
		api.get(`/order/getPendingorder/${customer_profile_id}`)
			.then((response) => {
				const newPendingOrders = response.data;
				setPendingOrders(newPendingOrders);
			})
			.catch((error) => {
				console.error(error);
			});
	};
	useEffect(() => {
		const customer_profile_id = user.id;
		api.get(`/order/getPendingorder/${customer_profile_id}`)
			.then((response) => {
				const newPendingOrders = response.data;
				setPendingOrders(newPendingOrders);
			})
			.catch((error) => {
				console.error(error);
				setPendingOrders([]);
			});
	}, [user.id]);

	useEffect(() => {
		// Make the API calls for each pending order and collect the products
		const productPromises = pendingOrders.map((order) => {
			return api
				.get(`/order/getProductbyid/${order.id}`)
				.then((response) => response.data)
				.catch((error) => {
					// console.error(error);
					return [];
				});
		});

		Promise.all(productPromises).then((productData) => {
			setProducts(productData);
		});
	}, [pendingOrders]);

	const startTimer = (orderId) => {
		fetchUpdatedOrders();
		if (!timers[orderId]) {
			let timer = 100; // 10 seconds for demonstration

			const interval = setInterval(() => {
				timer--;

				if (timer >= 0) {
					setTimers((prevTimers) => ({
						...prevTimers,
						[orderId]: timer,
					}));
				} else {
					clearInterval(interval);
					// Remove the timer from state when it ends
					setTimers((prevTimers) => {
						const updatedTimers = { ...prevTimers };
						delete updatedTimers[orderId];
						return updatedTimers;
					});

					// Check order status after timer ends
					checkOrderStatus(orderId);
				}
			}, 1000);

			// Initialize the timer in state
			setTimers((prevTimers) => ({
				...prevTimers,
				[orderId]: timer,
			}));
		}
	};

	const checkOrderStatus = (orderId) => {
		const id = orderId;
		api.get(`/order/getorder_by_id/${id}`)
			.then((response) => {
				const orderStatus = response.data[0].order_status;
				if (orderStatus === "pending") {
					// Update order status to canceled
					api.post(`/order/ordertimeoutStatus/${id}`, {
						order_status: "cancelled",
						cancel_report: "Time Out",
					})
						.then(() => {
							// Set a timeout for cancel report
							setTimeout(() => {}, 5000); // Adjust timeout duration as needed
						})
						.catch((error) => {
							console.error("Error updating status:", error);
						});
				}
			})
			.catch((error) => {
				console.error("Error fetching order status:", error);
			});
	};

	return (
		<div className="mt-20 ">
			<h1 className="text-center text-xl font-semibold">Order Status</h1>
			{pendingOrders.map((order) => (
				<div key={order.id} className="my-10">
					<div className="flex items-center justify-between">
						<h1 className="text-xl">
							{" "}
							{order.shopper_name}{" "}
							<span className="ml-4 text-sm">
								{" "}
								Order no: {order.id}
							</span>{" "}
						</h1>
						<div className="flex items-center gap-2">
							<p>Status</p>{" "}
							{order.order_status === "accepted" ? (
								<span>
									<FaCircle className="text-green-500" />
								</span>
							) : order.order_status === "pending" ? (
								<span>
									<FaCircle className="text-yellow-500" />
								</span>
							) : (
								""
							)}
						</div>
					</div>
					<hr />
					{products
						.filter((productList) =>
							productList.some(
								(product) => product.id === order.id
							)
						)
						.map((productList) => (
							<div key={productList[0].order_id}>
								<div className="mx-auto w-[100%] p-2">
									<div>
										{productList.map((product) => (
											<>
												<div key={product.id}>
													<div className="relative my-2 h-[80px] bg-gray-100 p-2">
														<img
															className="absolute top-2 h-[60px] w-[60px]"
															src={`${
																import.meta.env
																	.VITE_APP_IMG_URL
															}/products/${
																product.product_image
															}`}
															alt="Selected Product"
														/>
														<div className="ms-auto h-fit w-[75%]">
															<Link
																to={`${
																	import.meta
																		.env
																		.VITE_API_PUBLIC_URL
																}/product/${
																	product.pid
																}`}
															>
																<h1 className="text-sm">
																	{
																		product.name
																	}
																</h1>
															</Link>
														</div>
														<div className="ms-auto mt-3 flex w-[90%] justify-end gap-5">
															<div>
																<h2 className="text-xs">
																	{getDiscountPrice(
																		product.product_Price,
																		product.product_discounted_price
																	)}{" "}
																	X{" "}
																	{
																		product.product_quantity
																	}
																</h2>
															</div>
															<div>
																<h2 className="flex items-center gap-1 text-xs">
																	<Takaicon></Takaicon>{" "}
																	{parseFloat(
																		getDiscountPrice(
																			product.product_Price,
																			product.product_discounted_price
																		) *
																			product.product_quantity
																	).toFixed(
																		2
																	)}
																</h2>
															</div>
														</div>
													</div>
												</div>
											</>
										))}
									</div>

									<div className="divider my-0"></div>
									<div className="flex justify-between px-3">
										<p className="text-base">
											{timers[order.id] ? (
												<>
													{Math.floor(
														timers[order.id] / 60
													)}{" "}
													minutes{" "}
													{timers[order.id] % 60}{" "}
													seconds Remaining
												</>
											) : (
												"Timer ended"
											)}
										</p>
										<p className="flex items-center gap-2 ">
											<span className="text-sm">
												Total:
											</span>{" "}
											<Takaicon></Takaicon> {order.price}
											<button
												onClick={() =>
													startTimer(order.id)
												}
												className="btn"
											>
												{order.id}
											</button>
										</p>
									</div>
								</div>
							</div>
						))}
				</div>
			))}
			<div className="h-14"></div>
		</div>
	);
};

export default OrderStatus;
