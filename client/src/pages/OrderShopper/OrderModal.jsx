import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";
import { FaRedo, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { api } from "../../lib/api";
import Swal from "sweetalert2";

const OrderModal = ({
	isOpen,
	setIsOpen,
	order_Id,
	order_status,
	orderData,
}) => {
	const selectId = `prod_status_${order_Id}`;
	const [cancelReport, setCancelReport] = useState("");
	const [isShownReport, setIsShownReport] = useState(false);
	const [orderStatus, setOrderStatus] = useState(order_status);

	const handleStatusChange = (id, selectId) => {
		const newOrderStatus = document.getElementById(selectId).value;
		setOrderStatus(newOrderStatus);

		api.post(`/order/updateorderstatus/${id}`, {
			order_status: newOrderStatus,
		})
			.then((response) => {
				alert(response.data.message);
				if (response.status === 200) {
					setCancelReport("");
				}
			})
			.catch((error) => {
				alert(error);
			});

		// Check if the selected status is "cancelled" and call handleCancel
		if (newOrderStatus === "cancelled") {
			handleCancel();
		}
	};

	const handleCancel = async () => {
		const { value: report } = await Swal.fire({
			title: "Cancel Order",
			input: "select",
			inputOptions: {
				"The customers didnot come to my shop":
					"The customers did not come to my shop",
				"There are not enough Products in my store":
					"There are not enough Products in my store",
				"Customer is not taking the product":
					"Customer is not taking the product",
				"কাস্টমার আমার দোকানে আসেনি": "কাস্টমার আমার দোকানে আসেনি",
				"আমার দোকানে পর্যাপ্ত পন্য নেই":
					"আমার দোকানে পর্যাপ্ত পন্য নেই",
				"কাস্টমার পন্য নিচ্ছে না": "কাস্টমার পন্য নিচ্ছে না",
			},
			inputPlaceholder: "Select a cancel report",
			showCancelButton: true,
		});

		if (report) {
			setCancelReport(report);
			setIsShownReport(true);
		}
	};

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<div className="divider my-0"></div>
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-bold">
						<span className="text-xs"> #{order_Id} </span> Order
						Status
					</p>
				</div>
				<div className="cart-product__status">
					<select
						id={selectId}
						className="w-xs select select-bordered select-sm"
						onChange={() => handleStatusChange(order_Id, selectId)}
					>
						<option value="pending">
							<FaRedo /> Pending
						</option>
						<option value="completed">
							<FaRegCheckCircle /> Completed
						</option>
						<option value="cancelled">
							<FaRegCheckCircle /> Cancelled
						</option>
						<option value="other">
							<FaRedo /> Other
						</option>
					</select>
				</div>
			</div>
			<div className="divider my-0"></div>
			{isShownReport && (
				<div>
					<p>Selected Cancel Report: {cancelReport}</p>
				</div>
			)}
		</Modal>
	);
};

export default OrderModal;
