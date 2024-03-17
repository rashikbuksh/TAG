import { Breadcrumb } from "@components";

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
				<button className="h-[60px] w-[327px] rounded bg-[#2D8FCA] text-white ">
					Confirm Order
				</button>
			</div>
		</div>
	);
};

export default CashOnDelivery;
