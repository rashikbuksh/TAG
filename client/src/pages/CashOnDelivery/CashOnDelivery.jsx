import OrderSummery from "@/components/PaymentMethod/Checkout/OrderSummery";
import { Breadcrumb } from "@components";
import SuccessOrderModal from "@components/SuccessOrderModal/SuccessOrderModal";
import { useAuth } from "@context/auth";
import GetDateTime from "@helpers/GetDateTime";
import { api } from "@lib/api";
import { deleteFromCart } from "@store/slices/cart-slice";
import { useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { customAlphabet } from "nanoid";
const alphabet =
	"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 10);

const CashOnDelivery = () => {
	const { cartItems } = useSelector((state) => state.cart);
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const dispatch = useDispatch();
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
		const new_order_uuid = nanoid();
		try {
			const orderRes = await api.post("/order/add-order", {
				customer_profile_id: user.id,
				order_uuid: new_order_uuid,
				shopper_id: shopperId,
				order_status: "pending",
				order_time: GetDateTime(),
				price: total,
				customers_address_details_id: customers_address_details_id,
				payment_type: payment_type,
				customers_address_summary: customers_address_summary,
			});

			if (orderRes.status !== 201) {
				throw new Error("Failed to add order");
			}

			const productPromises = productIds.map((product) => {
				const {
					id: productid,
					quantity,
					discount,
					price,
					weight = 0,
				} = product;
				return api.post(`/ordered-product/add-ordered-product`, {
					order_uuid: new_order_uuid,
					product_id: productid,
					quantity,
					discount,
					price,
					weight,
				});
			});

			const responses = await Promise.all(productPromises);

			if (!responses.every((response) => response.status === 201)) {
				throw new Error("Failed to add ordered products");
			}

			// Delete products from cart
			const itemsToDelete = productIds.filter((productId) =>
				cartItems.some((cartItem) => cartItem.id === productId.id)
			);
			itemsToDelete.forEach((item) =>
				dispatch(deleteFromCart(item, shopperId))
			);
			setIsOpen(true);
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
			{isOpen && (
				<SuccessOrderModal
					isOpen={isOpen}
					totalPrice={totalPrice}
					payment_type={payment_type}
					setIsOpen={setIsOpen}
				></SuccessOrderModal>
			)}
		</div>
	);
};

export default CashOnDelivery;
