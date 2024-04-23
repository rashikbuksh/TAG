import OrderSummery from "@/components/PaymentMethod/Checkout/OrderSummery";
import { Breadcrumb } from "@components";
import { useAuth } from "@context/auth";
import GetDateTime from "@helpers/GetDateTime";
import { api } from "@lib/api";
import { deleteFromCart } from "@store/slices/cart-slice";
import { FcMoneyTransfer } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CashOnDelivery = () => {
	const { cartItems } = useSelector((state) => state.cart);
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		totalPrice,
		shopperId,
		discount,
		totalItem,
		customers_address_details_id,
		payment_type,
		customers_address_summary,
	} = location.state;

	const { user } = useAuth();
	const addOrderToDB = async (productIds, total) => {
		console.log("clicked");
		try {
			const orderRes = await api.post("/order/add-order", {
				customer_profile_id: user.id,
				shopper_id: shopperId,
				order_status: "pending",
				order_time: GetDateTime(),
				price: total,
				customers_address_details_id: customers_address_details_id,
				payment_type: payment_type,
				customers_address_summary: customers_address_summary,
			});

			if (orderRes.status === 201) {
				const lastOrderRes = await api.get(
					`/order/getLastOrder/${user.id}`
				);

				if (
					lastOrderRes.status === 200 &&
					lastOrderRes.data.length > 0
				) {
					const last_order_id = lastOrderRes.data[0].id;

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

					if (notificationRes.status === 201) {
						const productPromises = productIds.map((product) => {
							const {
								id: productid,
								quantity,
								discount,
								price,
								weight = 0,
							} = product;
							return api.post(
								`/ordered-product/add-ordered-product`,
								{
									order_id: last_order_id,
									product_id: productid,
									quantity,
									discount,
									price,
									weight,
								}
							);
						});

						const responses = await Promise.all(productPromises);

						if (
							responses.every(
								(response) => response.status === 201
							)
						) {
							// Delete products from cart
							productIds.forEach((productId) => {
								cartItems.forEach((cartItem) => {
									if (cartItem.id === productId.id) {
										dispatch(
											deleteFromCart(cartItem, shopperId)
										);
									}
								});
							});

							// All API calls were successful
							navigate("/orderStatus");
						} else {
							throw new Error("Failed to add ordered products");
						}
					} else {
						throw new Error("Failed to add notification");
					}
				} else {
					throw new Error("Failed to get last order");
				}
			} else {
				throw new Error("Failed to add order");
			}
		} catch (error) {
			toast.error(error.message, { position: "bottom-left" });
		}
	};

	return (
		<div className="mx-auto   flex max-w-[375px] flex-col text-black  ">
			<Breadcrumb pageTitle={payment_type} prevUrl="/cart"></Breadcrumb>

			<div className="mx-2 flex h-[80px] items-center gap-2 ">
				<FcMoneyTransfer size={50}></FcMoneyTransfer>

				{payment_type == "Cash On Delivery" ? (
					<p className="flex-auto ">
						You can pay in cash to our Courier when you Receive the
						Goods at your doorsteps
					</p>
				) : (
					<p className="flex-auto ">
						You have to pay at shop after received your product{" "}
					</p>
				)}

				<p className="flex-auto "></p>
			</div>

			{/* <TotalAmount></TotalAmount> */}
			<OrderSummery
				totalPrice={totalPrice}
				discount={discount}
				totalItem={totalItem}
				deliveryCharge={
					customers_address_summary === "Pick up" ? 0 : 20
				}
			></OrderSummery>
			{/* Pay Now Button */}
			<div className="mt-3 flex justify-center justify-self-end">
				<button
					onClick={() => addOrderToDB(totalItem, totalPrice)}
					className="h-[60px] w-[327px] rounded bg-[#2D8FCA] text-white "
				>
					Confirm Order
				</button>
			</div>
		</div>
	);
};

export default CashOnDelivery;
