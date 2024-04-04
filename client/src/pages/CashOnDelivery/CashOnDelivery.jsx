import { Breadcrumb } from "@components";
import TotalAmount from "../../components/PaymentMethod/PaymentGateway/TotalAmount";
import { FcMoneyTransfer } from "react-icons/fc";
import OrderSummery from "../../../src/components/PaymentMethod/Checkout/OrderSummery";
import { useLocation, useNavigate } from "react-router-dom";
import GetDateTime from "@helpers/GetDateTime";
import { api } from "@lib/api";
import { useAuth } from "@context/auth";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "@store/slices/cart-slice";
import cogoToast from "@hasanm95/cogo-toast";
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

		console.log("🚀 ~ CashOnDelivery ~ customers_address_summary:", customers_address_summary)
		
	const { user } = useAuth();
	const addOrderToDB = async (productIds, total) => {
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
						navigate("/orderStatus");
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
	return (
		<div className="mx-auto   flex max-w-[375px] flex-col text-black  ">
			<Breadcrumb pageTitle="Cash On pickup" prevUrl="/cart"></Breadcrumb>

			<div className="mx-2 flex h-[80px] items-center gap-2 ">
				<FcMoneyTransfer size={50}></FcMoneyTransfer>
				<p className="flex-auto ">
					You have to pay at shop after received your product .
				</p>
			</div>

			{/* <TotalAmount></TotalAmount> */}
			<OrderSummery
				totalPrice={totalPrice}
				discount={discount}
				totalItem={totalItem}
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
