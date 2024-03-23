
import Modal from "../Modal";

const EditAddressModal = ({ isOpen, setIsOpen }) => {
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<div className="h-32 w-full bg-slate-400">
				This is modal use for edit
			</div>
		</Modal>
	);
};

export default EditAddressModal;
