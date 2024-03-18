

const DeliveryAddress = () => {
    return (
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
	);
};

export default DeliveryAddress;