import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
import { Takaicon } from "../../SvgHub/SocialIcon";
import { getDiscountPrice } from "../../helpers/product";

const OrderStatus = () => {
	const [pendingOrders, setPendingOrders] = useState([]);
	const [products, setProducts] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		const customer_profile_id = user.id;
		api.get(`/order/getPendingorder/${customer_profile_id}`)
			.then((response) => {
				setPendingOrders(response.data);
			})
			.catch((error) => {
				alert(error);
			});
	}, [user.id]);

	useEffect(() => {
		// Make the API calls for each pending order and collect the products
		const productPromises = pendingOrders.map((order) => {
			return api
				.get(`/order/getProductbyid/${order.id}`)
				.then((response) => response.data)
				.catch((error) => {
					console.error(error);
					return [];
				});
		});

		Promise.all(productPromises).then((productData) => {
			setProducts(productData);
		});
	}, [pendingOrders]);
	console.log(products);
	console.log(pendingOrders);
	return (
		<div className="mt-20 px-3">
            <h1 className="text-xl text-center font-semibold">Order Status</h1>
			{pendingOrders.map((order) => (
				<div key={order.id} className="my-10">
					<h1 className="text-xl"> <span className="text-[10px]">#{order.shopper_id}</span> {order.shopper_name} </h1>
					<hr />
					{products
						.filter((productList) =>
							productList.some(
								(product) => product.id === order.id
							)
						)
						.map((productList) => (
							<div key={productList[0].order_id}>
								<div className="mx-auto w-[100%] p-3">
									<div>
										{productList.map((product) => (
											<>
												<div key={product.id}>
													<div className="relative h-[80px] bg-gray-100 my-2 p-2">
														<img
															className="absolute top-2 h-[60px] w-[60px]"
															src={`${
                                                                import.meta.env.VITE_APP_IMG_URL
                                                            }/products/${product.product_image}`}
															alt="Selected Product"
														/>
														<div className="ms-auto h-fit w-[75%]">
															<Link
																to={`${
																	import.meta
																		.env
																		.VITE_API_PUBLIC_URL
																}/product/${
																	product.id
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
														45 minutes Remaining
													</p>
													<p className="flex items-center gap-2 text-lg">
														<span className="text-sm">
															Total:
														</span>{" "}
														<Takaicon></Takaicon>{" "}
														{order.price}
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
