import { Takaicon } from "@SvgHub/SocialIcon";

const OrderSummary = ({ totalPrice, discount, totalItem, deliveryCharge }) => {
	return (
		<div className="mt-4 ">
			<span className="my-8 text-xl font-semibold">Order Summary</span>
			<div className="rounded-md bg-gray-100 p-4">
				<div className="mb-2 flex items-center justify-between text-base font-medium text-gray-800">
					<span>Total ({totalItem.length} Items)</span>
					<div className="flex items-center gap-2">
						<Takaicon />
						<span>{totalPrice}</span>
					</div>
				</div>
				<div className="mb-2 flex items-center justify-between text-base font-medium text-gray-800">
					<span>Discount</span>
					<div className="flex items-center gap-2">
						<Takaicon />
						<span>{discount ? discount : 0}</span>
					</div>
				</div>
				<div className="mb-2 flex items-center justify-between text-base font-medium text-gray-800">
					<span className="text-blue-600">Delivery Charges</span>
					<div className="flex items-center gap-2">
						<Takaicon />
						<span>{deliveryCharge}</span>
					</div>
				</div>
				<div className="my-4 flex items-center justify-between border-t pt-4 text-lg font-bold text-gray-800">
					<span>Grand Total</span>
					<div className="flex items-center gap-2">
						<Takaicon />
						<span>
							{+totalPrice +
								deliveryCharge -
								(+discount ? +discount : 0)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;
