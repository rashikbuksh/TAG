import { Breadcrumb } from "@components";
import Oparator from "../../components/PaymentMethod/PaymentGateway/Oparator";
import TotalAmount from "../../components/PaymentMethod/PaymentGateway/TotalAmount";

const PaymentGateway = () => {
	return (
		<div className="mx-auto  flex max-w-[375px] flex-col text-black  ">
			<Breadcrumb pageTitle="Bkash" prevUrl="/cart"></Breadcrumb>

			<Oparator></Oparator>

			<TotalAmount></TotalAmount>
			{/* Pay Now Button */}
			<div className="flex justify-center justify-self-end">
				<button className="auth-btn">Confirm Order</button>
			</div>
		</div>
	);
};

export default PaymentGateway;
