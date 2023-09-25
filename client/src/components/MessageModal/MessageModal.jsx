import React from 'react';
import Modal from '../Modal/Modal';
import IndividualMessagePage from '../IndividualMessagePage/IndividualMessagePage';

const MessageModal = ({isOpen,setIsOpen,title}) => {
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
            <IndividualMessagePage></IndividualMessagePage>
        </Modal>
    );
};

export default MessageModal;