import { Breadcrumb } from "@components";
import TotalAmount from "../../components/PaymentMethod/PaymentGateway/TotalAmount";

const CashOnDelivery = () => {
	return (
		<div className="mx-auto   flex max-w-[375px] flex-col text-black  ">
			<Breadcrumb
				pageTitle="Cash On Delivery"
				prevUrl="/cart"
			></Breadcrumb>

			<div className="mx-2 flex h-[80px] items-center gap-2 ">
				<span className="h-6 w-6 flex-none rounded-lg bg-amber-500 p-1"></span>
				<p className="flex-auto ">
					You can pay in cash to our Courier when you Receive the
					Goods at your doorsteps
				</p>
			</div>

			<TotalAmount></TotalAmount>
			{/* Pay Now Button */}
			<div className="flex justify-center justify-self-end">
				<button className="h-[60px] w-[327px] rounded bg-[#2D8FCA] text-white ">
					Confirm Order
				</button>
			</div>
		</div>
	);
};

export default CashOnDelivery;
