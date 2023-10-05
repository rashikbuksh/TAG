import React from 'react';
import Modal from '../../../components/Modal/Modal';

const OrderModal = ({isOpen,setIsOpen,order_Id}) => {
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
            <h1 className="text-3xl"> Order Modal  {order_Id}</h1>
        </Modal>
    );
};

export default OrderModal;