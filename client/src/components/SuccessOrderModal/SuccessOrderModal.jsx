import { SuccessIcon } from "@SvgHub/Icons";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
const SuccessOrderModal = ({ isOpen, setIsOpen, totalPrice = 0 , payment_type = "COD"}) => {
	const navigate = useNavigate();
	const deliveryCharge = 30;
	useEffect(() => {
		return () => navigate("/orderStatus");
	}, [navigate]);
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<div className="flex  flex-col items-center  ">
				{/* <SuccessIcon></SuccessIcon> */}
				<div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-200">
					<IoCheckmarkSharp size={60} className="text-green-500" />
				</div>
				<div className="my-4 text-center">
					<p className=" mb-2 text-2xl text-green-400">
						Congratulation!
					</p>
					<p className="text-center font-semibold text-gray-500">
						Your Order is successful. Thank for using our services.
					</p>
				</div>
				<div className="flex w-full flex-col gap-3 rounded border p-2 ">
					<div className="flex justify-between font-semibold">
						<span className="text-left">Order No </span>
						<span className="text-right text-purple-500">
							u8sv4bdlk
						</span>
					</div>
					<div className="flex justify-between font-semibold">
						<span className="text-left">Total Price</span>
						<span className="text-right">{totalPrice}</span>
					</div>
					<div className="flex justify-between font-semibold">
						<span className="text-left">Delivery Charge</span>
						<span className="text-right">{deliveryCharge}</span>
					</div>
					<div className="flex justify-between font-semibold">
						<span className="text-left">Total Bill</span>
						<span className="text-right">{totalPrice + deliveryCharge}</span>
					</div>
					<div className="flex justify-between font-semibold">
						<span className="text-left"> Payment Option</span>
						<span className="text-right font-normal  text-green-400">
							{payment_type}
						</span>
					</div>
				</div>
				<div className="mt-2 w-full" onClick={() => setIsOpen(false)}>
					<button
						type="button"
						className="mt-2 w-full rounded-md bg-red-500 p-2 text-white"
					>
						Go To Home
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default SuccessOrderModal;
