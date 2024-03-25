import { Breadcrumb } from "@components";
import PayNowBtn from '../../../src/components/PaymentMethod/Checkout/PayNowBtn'
import DeliveryAddress from "../../../src/components/PaymentMethod/Checkout/DeliveryAddress";
import PaymentOparator from "../../../src/components/PaymentMethod/Checkout/PaymentOparator";
import OrderSummery from "../../../src/components/PaymentMethod/Checkout/OrderSummery";
import SavedPayment from "../../../src/components/PaymentMethod/Checkout/SavedPayment";

const Checkout2 = () => {
	return (
		<div className="mx-auto mb-24 text-black px-2">
			{/* Checkout Title */}
			<Breadcrumb pageTitle="Checkout" prevUrl="/cart"></Breadcrumb>
			{/* Delivery Address Section */}
			<DeliveryAddress></DeliveryAddress>
			{/* Payment Method Section */}
			<PaymentOparator></PaymentOparator>
			{/* Saved Payment Section */}
			{/* <SavedPayment></SavedPayment> */}
			{/* Order Summary Section */}
			<OrderSummery></OrderSummery>
			{/* Pay Now Button */}
			<PayNowBtn></PayNowBtn>
		</div>
	);
};

export default Checkout2;
