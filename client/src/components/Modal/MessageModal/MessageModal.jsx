import React from "react";
import IndividualMessagePage from "../../IndividualMessagePage/IndividualMessagePage";
import Modal from "../Modal";

const MessageModal = ({ isOpen, setIsOpen, title }) => {
	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			title={"Page Under Construction"}
		>
			<IndividualMessagePage></IndividualMessagePage>
		</Modal>
	);
};

export default MessageModal;
