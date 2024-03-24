import { Breadcrumb } from "@components";
import PayNowBtn from "../../../src/components/PaymentMethod/Checkout/PayNowBtn";
import DeliveryAddress from "../../../src/components/PaymentMethod/Checkout/DeliveryAddress";
import PaymentOparator from "../../../src/components/PaymentMethod/Checkout/PaymentOparator";
import OrderSummery from "../../../src/components/PaymentMethod/Checkout/OrderSummery";
import { useEffect, useState } from "react";
import { api } from "@lib/api";
import { toast } from "react-toastify";
import { useAuth } from "@context/auth";
import { useLocation } from "react-router-dom";

const Checkout2 = () => {
	const [addressArr, setAddressArr] = useState([]);
	const [selectedAddress, setSelectedAddress] = useState(null);
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

	const location = useLocation();
	const { totalPrice, discount, totalItem } = location.state;

	const handelGoPaymentPage = () => {
		if (selectedAddress && paymentOperator && totalPrice ) {
			console.log("Ready for go");
		}
		else{
			alert("Solve problem")
		}
	};

	return (
		<div className="mx-auto px-4 pb-24 text-black ">
			{/* Checkout Title */}
			<Breadcrumb pageTitle="Checkout" prevUrl="/cart"></Breadcrumb>
			{/* Delivery Address Section */}
			<DeliveryAddress
				addressArr={addressArr}
				selectedAddress={selectedAddress}
				setSelectedAddress={setSelectedAddress}
			></DeliveryAddress>
			{/* Payment Method Section */}
			<PaymentOparator
				paymentOperator={paymentOperator}
				setPaymentOperator={setPaymentOperator}
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
