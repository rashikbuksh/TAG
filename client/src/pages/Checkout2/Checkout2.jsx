import { Breadcrumb } from "@components";

// Functional component for the Checkout page
const Checkout2 = () => {
	return (
		<div className="mx-auto   max-w-[375px] text-black">
			{/* Checkout Title */}
			<Breadcrumb pageTitle="Checkout" prevUrl="/cart"></Breadcrumb>
			{/* Delivery Address Section */}
			<div>
				<span className="text-[18px] font-bold">
					Select Delivery Address
				</span>
				<div className="mt-4 h-[132px] w-[241px] ">
					<div className="flex p-2">
						<span className="h-6 w-6 flex-none rounded-lg bg-amber-500 p-1"></span>
						<span className="flex-auto px-2 text-[16px] font-semibold text-[#000000]">
							Home
						</span>
						<span className="h-6 w-6 flex-none rounded-lg bg-amber-500 p-1"></span>
					</div>
					<div className="mx-auto w-[185px] ">
						<span className="text-[14px] font-extralight leading-5 text-[#959c9ac2]">
							4140 Parker Rd. Allentown, <br /> New Mexico 31134
						</span>
						<div className="flex gap-2">
							<span className="h-6 w-6 flex-none rounded-lg bg-amber-500 p-1"></span>
							<span className="text-[14px] font-extralight leading-5 text-[#959c9ac2]">
								(217) 555-0113
							</span>
						</div>
					</div>
				</div>
			</div>
			{/* Payment Method Section */}
			<div>
				<span className="text-[18px] font-bold text-[#171F1C]">
					Payment Method
				</span>
				<div className="mt-4 flex flex-col gap-2">
					<div className="flex h-[50px] w-full items-center  px-2">
						<span className="h-6 w-6 flex-none rounded-lg bg-amber-500 p-1"></span>
						<span className="ml-8 flex-auto text-[16px] font-bold">
							Bkash
						</span>
						<span className="mr-2 h-6 w-6 flex-none rounded-lg bg-amber-500 p-1"></span>
					</div>
					<div className="flex h-[50px] w-full items-center  px-2">
						<span className="h-6 w-6 flex-none rounded-lg bg-amber-500 p-1"></span>
						<span className="ml-8 flex-auto text-[16px] font-bold">
							Nagad
						</span>
						<span className="mr-2 h-6 w-6 flex-none rounded-lg bg-amber-500 p-1"></span>
					</div>
					<div className="flex h-[50px] w-full items-center  px-2">
						<span className="h-6 w-6 flex-none rounded-lg bg-amber-500 p-1"></span>
						<span className="ml-8 flex-auto text-[16px] font-bold">
							Cash On Delivery
						</span>
						<span className="mr-2 h-6 w-6 flex-none rounded-lg bg-amber-500 p-1"></span>
					</div>
				</div>
			</div>
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
			<div>
				<span className="my-8 text-[18px] font-bold">
					Order Summary
				</span>
				<div>
					<div className="flex justify-between text-[16px] font-[300px] text-[#171F1C]">
						<span>Item Total</span>
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
						<span className="font-extralight text-[#469CD6]">
							Free
						</span>
						<span>$27</span>
					</div>
					<div className="my-8 flex justify-between  text-[18px] font-bold text-[#171F1C]">
						<span>Grand Total</span>
						<span>$3200</span>
					</div>
				</div>
			</div>
			{/* Pay Now Button */}
			<div className="flex justify-center">
				
				<button className="auth-btn ">
					Pay Now
				</button>
			</div>
		</div>
	);
};

export default Checkout2;
