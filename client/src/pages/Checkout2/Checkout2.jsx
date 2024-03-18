import { Breadcrumb } from "@components";
import PayNowBtn from '../../../src/components/PaymentMethod/Checkout/PayNowBtn'
import DeliveryAddress from "../../../src/components/PaymentMethod/Checkout/DeliveryAddress";
import PaymentOparator from "../../../src/components/PaymentMethod/Checkout/PaymentOparator";
import OrderSummery from "../../../src/components/PaymentMethod/Checkout/OrderSummery";
// Functional component for the Checkout page
const Checkout2 = () => {
	return (
		<div className="mx-auto mb-24  max-w-[375px] text-black">
			{/* Checkout Title */}
			<Breadcrumb pageTitle="Checkout" prevUrl="/cart"></Breadcrumb>
			{/* Delivery Address Section */}
			<DeliveryAddress></DeliveryAddress>
			{/* Payment Method Section */}
			<PaymentOparator></PaymentOparator>
			{/* Saved Payment Section */}
			<div className="my-8">
				<span className="text-[18px]  font-bold text-[#171F1C]">
					Saved Payment
				</span>
				<div className="mt-4 flex h-[50px] w-full items-center  px-2">
					<span className="h-6 w-6 flex-none rounded-lg bg-amber-500 p-1"></span>
					<span className="ml-8 flex-auto text-[16px] font-bold">
						018448*****
					</span>
					<span className="mr-2 h-6 w-6 flex-none rounded-lg bg-amber-500 p-1"></span>
				</div>
			</div>
			{/* Order Summary Section */}
			<OrderSummery></OrderSummery>
			{/* Pay Now Button */}
			<PayNowBtn></PayNowBtn>
		</div>
	);
};

export default Checkout2;
