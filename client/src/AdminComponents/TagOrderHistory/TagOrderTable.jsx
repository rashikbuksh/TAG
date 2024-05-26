import { api } from "@lib/api";
import React, { useState } from "react";
import TagOrderDetailsModal from "./TagOrderDetailsModal";

const TagOrderTable = ({ order }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [orderDetails, setOrderDetails] = useState([]);

	const handelOpenOrderHistoryModal = (order_uuid) => {
		setIsOpen(!isOpen);

		if (order_uuid) {
			api.get(`/ordered-product/get-ordered-product/by/${order_uuid}`) // Fix the backtick here
				.then((response) => {
					setOrderDetails(response.data); // Use console.log instead of log
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};
	const cancel_report = orderDetails.map((d) => d.cancel_report);

	return (
		<>
			<tr>
				<th>
					<label>
						<input type="checkbox" className="checkbox" />
					</label>
				</th>
				<td>{order.id}</td>
				<td>{order.price}</td>
				<td>{order.order_status}</td>

				<td>
					<button
						onClick={() =>
							handelOpenOrderHistoryModal(order?.order_uuid)
						}
						className="btn btn-accent btn-sm ml-3"
					>
						Order Details
					</button>
				</td>
			</tr>
			<TagOrderDetailsModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				orderDetails={orderDetails}
			></TagOrderDetailsModal>
		</>
	);
};

export default TagOrderTable;
