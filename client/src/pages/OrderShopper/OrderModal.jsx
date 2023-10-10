import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { FaRedo, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { api } from "../../lib/api";
import Swal from "sweetalert2";
import OrderProducTable from "../../components/OrderProductTable/OrderProducTable";

const OrderModal = ({
	isOpen,
	setIsOpen,
	order_Id,
	order_status,
	orderData,
	totalPrice,
}) => {
	const selectId = `prod_status_${order_Id}`;
	const [cancelReport, setCancelReport] = useState("");
	const [isShownReport, setIsShownReport] = useState(false);
	const [orderStatus, setOrderStatus] = useState(order_status);
	const [products, setProducts] = useState([]);
	console.log(order_status, "modal");
	useEffect(() => {
		if (order_Id) {
			let id = order_Id;
			api.get(`/order/getProductbyid/${id}`) // Fix the backtick here
				.then((response) => {
					setProducts(response.data); // Use console.log instead of log
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [order_Id]);

	const handleStatusChange = (id, selectId) => {
		const newOrderStatus = document.getElementById(selectId).value;
		setOrderStatus(newOrderStatus);
		if (newOrderStatus === "cancelled") {
			handleCancel(id);
		} else {
			api.post(`/order/updateorderstatus/${id}`, {
				order_status: newOrderStatus,
			})
				.then((response) => {
					alert(response.data.message);
					if (response.status === 200) {
						window.location.reload();
						setCancelReport("");
					}
				})
				.catch((error) => {
					alert(error);
				});
		}

		// Check if the selected status is "cancelled" and call handleCancel
	};
	console.log(products);
	const handleCancel = async (id) => {
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
			api.post(`/order/updateorderstatus/${id}`, {
				order_status: "cancelled",
			})
				.then((response) => {
					alert(response.data.message);
					if (response.status === 200) {
						api.post(`/order/cancelReport/${id}`, {
							cancel_report: report,
						})
							.then((response) => {
								alert(response.data.message);
								if (response.status === 200) {
									alert("success");
									setIsShownReport(true);
								}
							})
							.catch((error) => {
								alert(error);
							});
					}
				})
				.catch((error) => {
					alert(error);
				});
			setCancelReport(report);
			// setIsShownReport(true);
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
						value={order_status}
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
			<div>
				<div className="overflow-x-auto">
					<table className="min-w-full  divide-gray-200 bg-white text-sm">
						<tbody className=" divide-gray-200">
							{products.map((Orderdproduct) => (
								<>
									<OrderProducTable
										key={Orderdproduct.id}
										Orderdproduct={Orderdproduct}
									></OrderProducTable>
								</>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="divider my-0"></div>
			<div className=" flex justify-around items-center">
				<p>Total</p>
				<p>{totalPrice}</p>
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
