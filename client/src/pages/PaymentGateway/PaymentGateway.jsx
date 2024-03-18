import { Breadcrumb } from "@components";




const PaymentGateway = () => {
	return (
		<div className="mx-auto  flex max-w-[375px] flex-col text-black  ">
			<Breadcrumb pageTitle="Bkash" prevUrl="/cart"></Breadcrumb>

			<div className="mx-2 flex h-[80px] items-center  ">
				<span className="h-6 w-6 flex-none rounded-lg bg-amber-500 p-1"></span>
				<span className="ml-8 flex-auto text-[16px] font-bold">
					Bkash
				</span>
			</div>

			<div className="mt-[100px]">
				<div className="flex justify-between text-[16px] font-[300px] text-[#171F1C]">
					<span>Total Amount</span>
					<span>$2700</span>
				</div>
				<div className="flex justify-between text-[16px] font-[300px] text-[#171F1C]">
					<span>Discount</span>
					<span>$270</span>
				</div>
				<div className="flex justify-between text-[16px] font-[300px] text-[#171F1C]">
					<span className="font-extralight text-[#469CD6]">
						Delivery Charges{" "}
					</span>
					<span className="font-extralight text-[#469CD6]">Free</span>
					<span>$27</span>
				</div>
				<div className="my-8 flex justify-between  text-[18px] font-bold text-[#171F1C]">
					<span>Grand Total</span>
					<span>$3200</span>
				</div>
			</div>
			{/* Pay Now Button */}
			<div className="flex justify-center justify-self-end">
				<button className="auth-btn">
					Confirm Order
				</button>
			</div>
		</div>
	);
};

export default PaymentGateway;
