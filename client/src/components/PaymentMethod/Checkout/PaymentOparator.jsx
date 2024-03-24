import { useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa";

const PaymentOparator = ({ paymentOperator, setPaymentOperator }) => {
	const [selectedOperator, setSelectedOperator] = useState(paymentOperator);

	const handleSelectOperator = (operator) => {
		if (selectedOperator === operator) {
			// If the selected operator is already the same as the clicked one, deselect it
			setSelectedOperator(null);
			setPaymentOperator(null); // Optionally reset the payment operator
		} else {
			setSelectedOperator(operator);
			setPaymentOperator(operator);
		}
	};

	return (
		<div className="mt-4">
			<span className="text-[18px] font-bold text-[#171F1C]">
				Payment Method
			</span>
			<div className="mt-4 flex flex-col gap-2">
				<div
					className={`flex h-[50px] w-full cursor-pointer items-center px-2 ${
						selectedOperator === "Cash On Delivery"
							? "bg-gray-200"
							: ""
					}`}
					onClick={() => handleSelectOperator("Cash On Delivery")}
				>
					<input
						type="checkbox"
						checked={selectedOperator === "Cash On Delivery"}
						onChange={() =>
							handleSelectOperator("Cash On Delivery")
						}
						className="mr-4 h-5 w-5"
					/>
					<TbTruckDelivery size={25} />
					<span className="ml-8 flex-auto text-[16px] font-bold">
						Cash On Delivery
					</span>
					{selectedOperator === "Cash On Delivery" && (
						<FaArrowRight size={22} />
					)}
				</div>
				<div
					className={`flex h-[50px] w-full cursor-pointer items-center px-2 ${
						selectedOperator === "Bkash" ? "bg-gray-200" : ""
					}`}
					//   onClick={() => handleSelectOperator("Bkash")}
				>
					<input
						type="checkbox"
						checked={selectedOperator === "Bkash"}
						// onChange={() => handleSelectOperator("Bkash")}
						className="mr-4 h-5 w-5"
						disabled
					/>
					{/* Add Bkash icon here */}
					<span className="ml-8 flex-auto text-[16px] font-bold">
						Bkash
					</span>
					{selectedOperator === "Bkash" && <FaArrowRight size={22} />}
				</div>
				<div
					className={`flex h-[50px] w-full cursor-pointer items-center px-2 ${
						selectedOperator === "Nagad" ? "bg-gray-200" : ""
					}`}
					//   onClick={() => handleSelectOperator("Nagad")}
				>
					<input
						type="checkbox"
						checked={selectedOperator === "Nagad"}
						// onChange={() => handleSelectOperator("Nagad")}
						className="mr-4 h-5 w-5"
						disabled
					/>
					{/* Add Nagad icon here */}
					<span className="ml-8 flex-auto text-[16px] font-bold">
						Nagad
					</span>
					{selectedOperator === "Nagad" && <FaArrowRight size={22} />}
				</div>
			</div>
		</div>
	);
};

export default PaymentOparator;
