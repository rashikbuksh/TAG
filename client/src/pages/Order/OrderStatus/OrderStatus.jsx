import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Takaicon } from "../../../SvgHub/SocialIcon";
import { useAuth } from "../../../context/auth";
import { getDiscountPrice } from "../../../helpers/product";
import { api } from "../../../lib/api";
// import { FaDotCircle } from "react-icons/fa";
import { FaCircle, FaPersonWalking } from "react-icons/fa6";
import { ChatIcon } from "../../../SvgHub/Icons";
import { Breadcrumb } from "../../../components";

const OrderStatus = () => {
	const [pendingOrders, setPendingOrders] = useState([]);
	const [products, setProducts] = useState([]);
	const [timers, setTimers] = useState({});
	const { user } = useAuth();
	const customer_profile_id = user.id;
	useEffect(() => {
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
		const productPromises = pendingOrders.map(async (order) => {
			try {
				const response = await api.get(
					`/order/getProductbyid/${order.id}`
				);
				return response.data;
			} catch (error) {
				return [];
			}
		});

		Promise.all(productPromises).then((productData) => {
			setProducts(productData);
		});
	}, [pendingOrders]);

	const orderProducts = useMemo(() => {
		return pendingOrders.map((order) => ({
			...order,
			products: products.filter((productList) =>
				productList.some((product) => product.order_id == order.id)
			),
		}));
	}, [products, pendingOrders]);

	const statusColors = {
		accepted: "text-green-500",
		pending: "text-yellow-500",
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
			<Breadcrumb pageTitle={"Order Status"} prevUrl={"/cart"}></Breadcrumb>
			{orderProducts.map(
				({ id, shopper_name, order_status, price, products }) => (
					<div key={id} className="my-10">
						<div className="flex items-center justify-between">
							<h1 className="text-xl">
								{shopper_name}{" "}
								<span className="ml-4 text-sm">
									Order no: {id}
								</span>
							</h1>
							<div className="flex items-center gap-2">
								<p>Status</p>
								<span>
									<FaCircle
										className={statusColors[order_status]}
									/>
								</span>
							</div>
						</div>
						<hr />
						{products.map((productList) => (
							<div
								className="mx-auto w-[100%] p-2"
								key={productList.pid}
							>
								{productList.map(
									({
										pid,
										product_image,
										name,
										price,
										discount,
										quantity,
									}) => (
										<div key={pid}>
											<div className="relative my-2 h-[80px] bg-gray-100 p-2">
												<img
													className="absolute top-2 h-[60px] w-[60px]"
													src={`${
														import.meta.env
															.VITE_APP_IMG_URL
													}/products/${product_image}`}
													alt="Selected Product"
												/>
												<div className="ms-auto h-fit w-[75%]">
													<Link
														to={`${
															import.meta.env
																.VITE_API_PUBLIC_URL
														}/product/${pid}`}
													>
														<h1 className="text-sm">
															{name}
														</h1>
													</Link>
												</div>
												<div className="ms-auto mt-3 flex w-[90%] justify-end gap-5">
													<div>
														<h2 className="text-xs">
															{getDiscountPrice(
																price,
																discount
															)}{" "}
															X {quantity}
														</h2>
													</div>
													<div>
														<h2 className="flex items-center gap-1 text-xs">
															<Takaicon></Takaicon>{" "}
															{parseFloat(
																getDiscountPrice(
																	price,
																	discount
																) * quantity
															).toFixed(2)}
														</h2>
													</div>
												</div>
											</div>
										</div>
									)
								)}

								<div className="divider my-0"></div>
								<div className="flex justify-between px-3">
									<div className="flex items-center gap-4 text-[#FF2A2A]">
										<div>
											<p>Within 1 hr Collect</p>
											<p>Your Products</p>
										</div>
										<FaPersonWalking
											color="green"
											size={20}
										/>
									</div>

									<p className="flex items-center gap-2 ">
										<span className="text-sm">Total:</span>{" "}
										<Takaicon></Takaicon>{" "}
										{price}
									</p>
								</div>
							</div>
						))}
					</div>
				)
			)}
			<button className="fixed bottom-24 right-5 z-20 flex flex-col  items-center rounded-full  border-4 border-blue-900 bg-white p-2 shadow-lg ">
				<ChatIcon />
				<span className="text-xs text-black">Live Chat</span>
			</button>

			<div className="h-14"></div>
		</div>
	);
};

export default OrderStatus;
