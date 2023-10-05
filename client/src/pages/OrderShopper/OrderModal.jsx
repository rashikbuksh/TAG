import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { FaRedo, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { api } from "../../lib/api";

const OrderModal = ({ isOpen, setIsOpen, order_Id, order_status, orderData }) => {
  
	const selectId = `prod_status_${order_Id}`;
	const handleStatusChange = (id, selectId) => {
		console.log("order_id: ", id);
		const order_status = document.getElementById(selectId).value; // Use selectId to find the correct element
		console.log("order_status: ", order_status);

		api.post(`/order/updateorderstatus/${id}`, {
			order_status: order_status,
		})
			.then((response) => {
				alert(response.data.message);
			})
			.catch((error) => {
				alert(error);
			});
	};
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="divider my-0"></div>
            <div className="flex items-center justify-between ">
                <div>
                    <p className="text-sm font-bold "> <span className="text-xs"> #{order_Id} </span> Order Status </p>
                </div>
            <div className="cart-product__status">
				<select
					id={selectId} // Use the unique id for this select element
					className="select select-bordered select-sm max-w-xs"
					onChange={() => handleStatusChange(order_Id, selectId)} // Pass the selectId as an argument
					value={order_status}
				>
					<option value="pending">
						<FaRedo /> Pending
					</option>
					<option value="completed">
						<FaRegCheckCircle /> Completed
					</option>
					<option value="cancelled">
						<FaRegTimesCircle /> Cancelled
					</option>
					<option value="other">
						<FaRedo /> Other
					</option>
				</select>
			</div>
            </div>
		
            <div className="divider my-0"></div>
		</Modal>
	);
};

export default OrderModal;
