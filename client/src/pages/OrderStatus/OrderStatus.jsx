import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/auth";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Takaicon } from "../../SvgHub/SocialIcon";

const OrderStatus = () => {
	const [pendingOrder, setPendingOrder] = useState([]);
	const { user } = useAuth();
	useEffect(() => {
		const customer_profile_id = user.id;
		api.get(`/order/getPendingorder/${customer_profile_id}`)
			.then((response) => {
				setPendingOrder(response.data);
				console.log(response.data, "response.data");
			})
			.catch((error) => {
				alert(error);
			});
	}, []);
	console.log(pendingOrder, "pendingOrder");
	const show = [1, 2, 3];
	return (
		<div className="mt-20 px-3">
			<div className="flex justify-between ">
				<p>Pennding Your Order</p>
				<div className="flex items-center gap-4">
					{" "}
					<span>Status :</span>{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
					>
						<circle cx="8" cy="8" r="8" fill="#F99E23" />
					</svg>{" "}
				</div>
			</div>
			<div className="my-10">
				<h1 className="text-xl">Max-Store</h1>
				<hr />
				{show.map((s) => (
					<div key={s}>
						<div className="mx-auto w-[100%] p-3">
							<div>
								<div className="relative  bg-gray-100 p-2 h-[80px]">
									<img
										className="h-[60px] w-[60px] absolute top-2 "
										src={`https://source.unsplash.com/random/200x200/?${s}`}
										alt="Selected Product"
									/>
									<div className="h-fit w-[75%] ms-auto ">
										<Link
											to={`${
												import.meta.env
													.VITE_API_PUBLIC_URL
											}/product/${2}`}
										>
											<h1 className="text-sm ">
												{"cartItem name "}
											</h1>
                                            {/* Not Available set in there */}
										</Link>
									</div>

									<div className="flex gap-5 mt-3 w-[90%] ms-auto justify-end">
										<div>
											<h2 className="text-xs ">
												{/* {getDiscountPrice(
                                                cartItem.price,
                                                cartItem.discount
                                            )}{" "}
                                            X {cartItem.quantity} */}
												121 X 2
											</h2>
										</div>

										<div>
											<h2 className="text-xs flex items-center gap-1">
												{/* {parseFloat(
                                                getDiscountPrice(
                                                    cartItem.price,
                                                    cartItem.discount
                                                ) * cartItem.quantity
                                            ).toFixed(2)} */}{" "}
											 <Takaicon></Takaicon>	3322
											</h2>
											{/* <input
                                            type="hidden"
                                            value={totals[shopper.id] || 0}
                                        /> */}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
                <div className="divider my-0"></div>
                <div className="flex justify-between px-3">
                    <p className="text-lg">45 minutes Remaing</p>
                    <p className="text-lg flex items-center gap-2"> <span className="text-sm">Total:</span> <Takaicon></Takaicon> 6032</p>
                </div>
			</div>
		</div>
	);
};

export default OrderStatus;
