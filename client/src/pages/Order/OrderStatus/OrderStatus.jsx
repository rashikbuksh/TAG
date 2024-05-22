import { Takaicon } from "@SvgHub/SocialIcon";
import { Breadcrumb } from "@components";
import { useAuth } from "@context/auth";
import { addOneHour } from "@helpers/FormattedTime";
import { getDiscountPrice } from "@helpers/product";
import { api } from "@lib/api";
import { useEffect, useMemo, useState } from "react";
import { FaCircle, FaPersonWalking } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import chatIconImg from "../../../../src/assets/icons/live-chat.png";
const OrderStatus = () => {
	const [pendingOrders, setPendingOrders] = useState([]);
	const [products, setProducts] = useState([]);
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
					`/ordered-product/get-ordered-product/by/${order.order_uuid}`
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
				productList.some(
					(product) => product.order_uuid == order.order_uuid
				)
			),
		}));
	}, [products, pendingOrders]);

	const statusColors = {
		accepted: "text-green-500",
		pending: "text-yellow-500",
	};

	return (
		<div className="mt-8 px-2">
			<Breadcrumb
				pageTitle={"Order Status"}
				prevUrl={"/cart"}
			></Breadcrumb>
			{orderProducts.map(
				({
					id,
					shopper_name,
					order_status,
					access,
					price,
					products,
					order_time,
				}) => (
					<div key={id} className=" mb-10 mt-2">
						<div className="flex items-center justify-between">
							<h1 className="text-xl">
								{shopper_name}{" "}
								<span className="ml-4 text-sm">
									Order no: {id}
								</span>
							</h1>
							{order_status === "pending" ? (
								<div
									data-tooltip-id="my-tooltip"
									data-tooltip-content="If the seller accepts, it will be green"
									data-tip=""
									className="flex items-center gap-2"
								>
									<p>Status</p>
									<span>
										<FaCircle
											id="my-tooltip"
											className={
												statusColors[order_status]
											}
										/>
										<Tooltip id="my-tooltip" />
									</span>
								</div>
							) : (
								<div className="flex items-center gap-2">
									<p>Status</p>
									<span>
										<FaCircle
											className={
												statusColors[order_status]
											}
										/>
									</span>
								</div>
							)}
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
														}/product/${pid}/${name}`}
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
									<div className="flex items-center gap-4 font-bold leading-7 text-[#16492a]">
										{access === "shopper" ? (
											<>
												<div>
													<p>
														Within{" "}
														{addOneHour(order_time)}{" "}
														, Collect
													</p>
													<p>Your Products</p>
												</div>
												<FaPersonWalking
													color="green"
													size={20}
												/>
											</>
										) : (
											<div
												style={{
													display: "flex",
													flexDirection: "column",
												}}
											>
												<p style={{ flex: "1" }}>
													Your product will be
													delivered within 2 hours!
												</p>
											</div>
										)}
									</div>

									<p className="flex items-center gap-2 ">
										<span className="text-sm">Total:</span>{" "}
										<Takaicon></Takaicon> {price}
									</p>
								</div>
							</div>
						))}
					</div>
				)
			)}
			<button className="fixed bottom-24 right-5 z-20 flex flex-col  items-center rounded-full  border-4 border-blue-900 bg-white p-2 shadow-lg ">
				<img src={chatIconImg} alt="" />
			</button>

			<div className="h-14"></div>
		</div>
	);
};

export default OrderStatus;
