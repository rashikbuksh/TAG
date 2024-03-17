import { SuccessIcon } from "@SvgHub/Icons";
import Modal from "../Modal/Modal";

const SuccessOrderModal = ({ isOpen, setIsOpen }) => {
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<div className="flex h-[400px] flex-col items-center  justify-center">
				<SuccessIcon></SuccessIcon>

				<p className="mt-5 text-2xl font-semibold">Successful!</p>
				<p className="text-center text-gray-500">
					Your Order is successful. Thank for using our services.
				</p>
			</div>
		</Modal>
	);
};

export default SuccessOrderModal;
