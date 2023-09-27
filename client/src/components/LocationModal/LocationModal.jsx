import Modal from "../Modal/Modal";


const LocationModal = ({isOpen,setIsOpen,title}) => {
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
          Location is under construction
        </Modal>
    );
};

export default LocationModal;