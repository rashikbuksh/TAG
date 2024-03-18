

const OrderSummery = () => {
    return (
		<div>
			<span className="my-8 text-[18px] font-bold">Order Summary</span>
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
					<span className="font-extralight text-[#469CD6]">Free</span>
					<span>$27</span>
				</div>
				<div className="my-8 flex justify-between  text-[18px] font-bold text-[#171F1C]">
					<span>Grand Total</span>
					<span>$3200</span>
				</div>
			</div>
		</div>
	);
};

export default OrderSummery;