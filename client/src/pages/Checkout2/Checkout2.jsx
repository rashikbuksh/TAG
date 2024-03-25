import { Breadcrumb } from "@components";
import PayNowBtn from "../../../src/components/PaymentMethod/Checkout/PayNowBtn";
import DeliveryAddress from "../../../src/components/PaymentMethod/Checkout/DeliveryAddress";
import PaymentOparator from "../../../src/components/PaymentMethod/Checkout/PaymentOparator";
import OrderSummery from "../../../src/components/PaymentMethod/Checkout/OrderSummery";
import { useEffect, useState } from "react";
import { api } from "@lib/api";
import { toast } from "react-toastify";
import { useAuth } from "@context/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Checkout2 = () => {
	const [addressArr, setAddressArr] = useState([]);
	const { cartItems } = useSelector((state) => state.cart);
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [customers_address_summary, setCustomers_address_summary] =
		useState(null);
	const [paymentOperator, setPaymentOperator] = useState(null);
	const { user } = useAuth();

	useEffect(() => {
		api.get(`/getCustomerAddress/${user.id}`)
			.then((response) => {
				setAddressArr(response.data);
			})
			.catch((error) => {
				toast.error(error);
			});
	}, []);
	const navigate = useNavigate();
	const location = useLocation();
	const { totalPrice, shopperId, discount, totalItem, shopperAccess } =
		location.state;
	console.log("🚀 ~ Checkout2 ~ shopperAccess:", shopperAccess);
	const handelGoPaymentPage = () => {
		if (
			selectedAddress &&
			paymentOperator &&
			totalPrice &&
			setCustomers_address_summary
		) {
			navigate("/cashOnDelivery", {
				state: {
					totalPrice: totalPrice,
					shopperId: shopperId,
					discount: discount,
					totalItem: totalItem,
					payment_type: paymentOperator,
					customers_address_details_id: selectedAddress,
					customers_address_summary: customers_address_summary,
				},
			});
		} else {
			console.log("Have Problem");
		}
	};

	return (
		<div className="mx-auto px-4 pb-24 text-black ">
			{/* Checkout Title */}
			<Breadcrumb pageTitle="Checkout" prevUrl="/cart"></Breadcrumb>
			{/* Delivery Address Section */}
			{shopperAccess === "shopper" && (
				<p className="my-1 text-lg font-bold text-red-500">
					You Must select pickup
				</p>
			)}
			<DeliveryAddress
				addressArr={addressArr}
				selectedAddress={selectedAddress}
				setSelectedAddress={setSelectedAddress}
				shopperAccess={shopperAccess}
				customers_address_summary={customers_address_summary}
				setCustomers_address_summary={setCustomers_address_summary}
			></DeliveryAddress>

			{shopperAccess === "shopper" && (
				<div
					className={`mt-2 flex h-[50px] w-full cursor-pointer items-center px-2 ${
						selectedAddress === "Pick up" ? "bg-gray-200" : ""
					}`}
					onClick={() => {
						const newAddressValue =
							selectedAddress === "Pick up" ? null : "Pick up";
						setSelectedAddress(newAddressValue);
						setCustomers_address_summary(newAddressValue);
					}}
				>
					<input
						type="checkbox"
						checked={selectedAddress === "Pick up"}
						onChange={() => null} // Disable checkbox interaction
						className="mr-4 h-5 w-5"
					/>
					{/* <TbTruckDelivery size={25} /> */}
					<span className="ml-8 flex-auto text-[16px] font-bold">
						Pick up
					</span>
				</div>
			)}

			{/* Payment Method Section */}
			<PaymentOparator
				paymentOperator={paymentOperator}
				setPaymentOperator={setPaymentOperator}
				shopperAccess={shopperAccess}
			></PaymentOparator>
			{/* Saved Payment Section */}
			{/* <SavedPayment></SavedPayment> */}
			{/* Order Summary Section */}
			{totalPrice ? (
				<OrderSummery
					totalPrice={totalPrice}
					discount={discount}
					totalItem={totalItem}
				></OrderSummery>
			) : (
				<div className="mt-32">No total price provided!</div>
			)}
			{/* Pay Now Button */}
			<PayNowBtn handelGoPaymentPage={handelGoPaymentPage}></PayNowBtn>
		</div>
	);
};

export default Checkout2;
