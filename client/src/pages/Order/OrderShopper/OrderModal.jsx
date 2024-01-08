import React, { useEffect, useState } from "react";
import { FaRedo, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Breadcrumb } from "../../../components";
import OrderProducTable from "../../../components/Product/OrderProductTable/OrderProducTable";
import SuccessOrderModal from "../../../components/SuccessOrderModal/SuccessOrderModal";
import GetDateTime from "../../../helpers/GetDateTime";
import { api } from "../../../lib/api";
import { useAuth } from "../../../context/auth";

const OrderDetailsShopper = () => {
	const { id } = useParams();
	const selectId = `prod_status_${id}`;
	const [cancelReport, setCancelReport] = useState("");
	const [isShownReport, setIsShownReport] = useState(false);
	const [orderStatus, setOrderStatus] = useState();
	const [price, setPrice] = useState(null);
	const [products, setProducts] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const handelIsOpenModal = () => {
		setIsOpen(!isOpen);
		if (isOpen === false) {
			// window.location.reload();
		}
	};
	useEffect(() => {
		if (id) {
			api.get(`/order/getProductbyid/${id}`) // Fix the backtick here
				.then((response) => {
					setProducts(response.data);
					setPrice(response.data[0].price);
					setOrderStatus(response.data[0].order_status); // Use console.log instead of log
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [id, orderStatus]);

	const handleAcceptOrder = (id) => {
		api.post(`/order/updateorderstatus/${id}`, {
			order_status: "accepted",
		})
			.then((response) => {
				alert(response.data.message);
				if (response.status === 200) {
					api.post(`/order/ordershopperaccepttime/${id}`, {
						shopper_order_accept_time: GetDateTime(),
					})
						.then((response) => {
							alert(response.data.message);
							if (response.status === 200) {
								window.location.reload();
								setOrderStatus("accepted");
								setCancelReport("");
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
	};
	const handleCompleteOrder = (id) => {
		handelIsOpenModal();
		api.post(`/order/updateorderstatus/${id}`, {
			order_status: "completed",
		})
			.then((response) => {
				alert(response.data.message);
				if (response.status === 200) {
					api.post(`order/orderdeliverytime/${id}`, {
						delivery_time: GetDateTime(),
					})
						.then((response) => {
							alert(response.data.message);
							if (response.status === 200) {
								setOrderStatus("completed");
								setCancelReport("");
								
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
	};

	const handleCancel = async (id) => {
		const { value: report } = await Swal.fire({
			title: "Cancel Order",
			html:
				"<style>" +
				".swal2-popup .swal2-content { text-align: left; }" +
				".swal2-radio { display: flex; justify-items: start ; align-items:start ; margin-bottom: 6px; font-size: 14px; }" +
				'.swal2-radio input[type="radio"] {  transform: scale(1.2); }' +
				"</style>" +
				"<div>" +
				'<div class="swal2-radio swal2-content">' +
				'<input type="radio" id="not-come" name="cancelReason" value="The customers did not come to my shop">' +
				'<label for="not-come">The customers did not come to my shop</label>' +
				"</div>" +
				'<div class="swal2-radio swal2-content">' +
				'<input type="radio" id="not-enough-products" name="cancelReason" value="There are not enough Products in my store">' +
				'<label for="not-enough-products">There are not enough Products in my store</label>' +
				"</div>" +
				'<div class="swal2-radio swal2-content">' +
				'<input type="radio" id="customer-not-taking" name="cancelReason" value="Customer is not taking the product">' +
				'<label for="customer-not-taking">Customer is not taking the product</label>' +
				"</div>" +
				'<div class="swal2-radio swal2-content">' +
				'<input type="radio" id="customer-not-coming-bn" name="cancelReason" value="কাস্টমার আমার দোকানে আসেনি">' +
				'<label for="customer-not-coming-bn">কাস্টমার আমার দোকানে আসেনি</label>' +
				"</div>" +
				'<div class="swal2-radio swal2-content">' +
				'<input type="radio" id="not-enough-products-bn" name="cancelReason" value="আমার দোকানে পর্যাপ্ত পন্য নেই">' +
				'<label for="not-enough-products-bn">আমার দোকানে পর্যাপ্ত পন্য নেই</label>' +
				"</div>" +
				'<div class="swal2-radio swal2-content">' +
				'<input type="radio" id="customer-not-taking-bn" name="cancelReason" value="কাস্টমার পন্য নিচ্ছে না">' +
				'<label for="customer-not-taking-bn">কাস্টমার পন্য নিচ্ছে না</label>' +
				"</div>" +
				"</div>",
			showCancelButton: true,
			preConfirm: () => {
				const selectedReason = document.querySelector(
					'input[name="cancelReason"]:checked'
				);
				return selectedReason ? selectedReason.value : "";
			},
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
	const { user } = useAuth();
	return (
		<div className="body-wrapper space-pt--70 space-pb--120">
			<Breadcrumb
				pageTitle={`Order Number: #${id}`}
				prevUrl={user.access === "customer" ? "/home" : "/orderShopper"}
				// onClick={() => goToPreviousPage()}
			/>

			<div className="">
				<div>
					<div className="overflow-x-auto">
						<div className="min-w-full  divide-gray-200 bg-white text-sm">
							<div className=" divide-gray-200">
								{products.map((product) => (
									<OrderProducTable
										key={product.pid}
										product={product}
									></OrderProducTable>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="divider my-0"></div>
				<div className=" flex items-center justify-end gap-5 text-lg">
					<p>Total Amount :</p>
					<p>{price}</p>
				</div>
			</div>
			<div></div>
			{orderStatus == "completed" ? (
				""
			) : orderStatus == "cancelled" ? (
				""
			) : (
				<div className="mt-6 flex items-center justify-end gap-3">
					{orderStatus == "accepted" ? (
						""
					) : (
						<button
							onClick={() => handleAcceptOrder(id)}
							className="action-button"
						>
							Accept
						</button>
					)}

					<button
						onClick={() => handleCancel(id)}
						className="h-[30px] w-[80px] rounded bg-red-700  text-white "
					>
						Cancel
					</button>

					{orderStatus == "accepted" ? (
						<button
							onClick={() => handleCompleteOrder(id)}
							className="h-[30px] w-[80px] rounded bg-green-700  text-white "
						>
							Complete
						</button>
					) : (
						""
					)}
				</div>
			)}
			{/* <button
				onClick={handelIsOpenModal}
				className="h-[30px] w-[80px] rounded bg-green-700  text-white "
			>
				test
			</button> */}
			<SuccessOrderModal isOpen={isOpen} setIsOpen={setIsOpen} />
			{isShownReport && (
				<div>
					<p>Selected Cancel Report: {cancelReport}</p>
				</div>
			)}
		</div>
	);
};

export default OrderDetailsShopper;
