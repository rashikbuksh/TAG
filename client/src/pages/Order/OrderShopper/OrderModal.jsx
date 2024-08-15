import { Breadcrumb } from "@components";
import OrderProductTable from "@components/Product/OrderProductTable/OrderProductTable";
import SuccessOrderModal from "@components/SuccessOrderModal/SuccessOrderModal";
import { useAuth } from "@context/auth";
import { addOneHour } from "@helpers/FormattedTime";
import GetDateTime from "@helpers/GetDateTime";
import { api } from "@lib/api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const OrderDetailsShopper = () => {
	const { id } = useParams();

	const [order, setOrder] = useState([]);
	const [orderedProducts, setOrderedProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [cancelReport, setCancelReport] = useState("");
	const [isShownReport, setIsShownReport] = useState(false);
	// const [isOpen, setIsOpen] = useState(false);
	// const handelIsOpenModal = () => {
	// 	setIsOpen(!isOpen);
	// 	if (isOpen === false) {
	// 		// window.location.reload();
	// 	}
	// };
	const deliveryInfoStyle = {
		background: "#f7f7f7", // Background color
		padding: "10px", // Padding around the delivery information
		borderRadius: "5px", // Rounded corners
		marginBottom: "20px", // Spacing between delivery info and total amount
	};

	useEffect(() => {
		if (id != null || id != undefined) {
			api.get(`/order/get-product-by-id/${id}`).then((response) => {
				setOrder(response.data);
				setOrderedProducts(response.data?.ordered_product);
			});
		} else {
			setLoading(false);
		}
	}, [id]);

	if (!order) return <Navigate to="/not-found" />;
	if (loading)
		return <span className="loading loading-dots loading-lg z-50" />;

	const updateProductCount = (id, quantity) => {
		api.post(`/product/decreaseProductCount`, {
			id: id,
			product_quantity: quantity,
		}).then((res) => {
			if (res.data.status === 200) {
				// console.log("updated" + id);
				window.location.reload();
			}
		});
	};
	const handleAcceptOrder = (id, time) => {
		api.post(`/order/updateorderstatus/${id}`, {
			order_status: "accepted",
		})
			.then((response) => {
				if (response.status === 200) {
					api.post(`/order/ordershopperaccepttime/${id}`, {
						shopper_order_accept_time: GetDateTime(),
					})
						.then((response) => {
							toast(response.data.message);
							if (response.status === 200) {
								api.post("/notification/add-notification", {
									notification_content: `${
										user.name
									} accept your order. collect your order within ${addOneHour(
										time
									)}.`,
									notification_time: GetDateTime(),
									not_to: user.id,
									not_from: order?.customer_profile_id,
									status: 0,
								}).then((response) => {
									if (response.status === 201) {
										window.location.reload();
										setCancelReport("");
									}
								});
							}
						})
						.catch((error) => {
							toast(error);
						});
				}
			})
			.catch((error) => {
				toast(error);
			});
	};
	const handleCompleteOrder = (id) => {
		// handelIsOpenModal();
		api.post(`/order/updateorderstatus/${id}`, {
			order_status: "completed",
		})
			.then((response) => {
				if (response.status === 200) {
					api.post(`order/orderdeliverytime/${id}`, {
						delivery_time: GetDateTime(),
					})
						.then((response) => {
							toast(response.data.message);
							if (response.status === 200) {
								api.post("/notification/add-notification", {
									notification_content: `Completed your order Successfully #${id}`,
									notification_time: GetDateTime(),
									not_to: user.id,
									not_from: order?.customer_profile_id,
									status: 0,
								}).then((response) => {
									if (response.status === 201) {
										order.forEach((product) => {
											// console.log(product);
											updateProductCount(
												product?.ordered_product?.pid,
												product?.ordered_product
													?.quantity
											);
										});
										setCancelReport("");
									}
								});
							}
						})
						.catch((error) => {
							toast(error);
						});
				}
			})
			.catch((error) => {
				toast(error);
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
				'<input type="radio" id="not-enough-order" name="cancelReason" value="There are not enough Products in my store">' +
				'<label for="not-enough-order">There are not enough Products in my store</label>' +
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
				'<input type="radio" id="not-enough-order-bn" name="cancelReason" value="আমার দোকানে পর্যাপ্ত পন্য নেই">' +
				'<label for="not-enough-order-bn">আমার দোকানে পর্যাপ্ত পন্য নেই</label>' +
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
					toast(response.data.message);
					if (response.status === 200) {
						api.post(`/order/cancelReport/${id}`, {
							cancel_report: report,
						})
							.then((response) => {
								toast(response.data.message);
								if (response.status === 200) {
									// toast("success");
									setIsShownReport(true);
								}
							})
							.catch((error) => {
								toast(error);
							});
					}
				})
				.catch((error) => {
					toast(error);
				});
			setCancelReport(report);
			// setIsShownReport(true);
		}
	};
	const { user } = useAuth();
	return (
		<div className="body-wrapper px-2 ">
			<Breadcrumb
				pageTitle={`Order Number: #${id}`}
			/>
			{/* <div className="bg-color--grey space-y--15 mt-16">
				<p className="text-center">Order Number: #{id}</p>
			</div> */}
			
			<div style={deliveryInfoStyle} className="mt-1">
				<p className="text-xl font-bold">Customer Information:</p>
				<p className="text-lg">
					Customer Id:{order?.customer_profile_id}
				</p>
				<p className="text-md">
					Customer Name:{" "}
					<span className="font-bold text-red-900">
						{order?.customer_name}
					</span>
				</p>
				<p>{order?.phone_no}</p>
				<div className="flex items-center justify-between ">
					<p className="capitalize">Status : {order?.order_status}</p>
				</div>
			</div>
			<div className="">
				<div>
					<div className="overflow-x-auto ">
						<div className="min-w-full  divide-gray-200 bg-white text-sm">
							<div className=" divide-gray-200">
								<p className="text-xl font-bold">
									Order Details:
								</p>
								{orderedProducts.map((product) => (
									<OrderProductTable
										key={product.pid}
										product={product}
									></OrderProductTable>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="divider my-0"></div>
				<div className=" flex items-center justify-end gap-5 text-lg">
					<p>Total Amount :</p>
					<p>{order?.totalPrice}</p>
				</div>
			</div>

			{order?.order_status == "completed" ? (
				""
			) : order?.order_status == "cancelled" ? (
				""
			) : (
				<div className="mt-6 flex items-center justify-end gap-3 ">
					{order?.order_status == "accepted" ? (
						""
					) : (
						<button
							onClick={() =>
								handleAcceptOrder(id, order?.order_time)
							}
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

					{order?.order_status == "accepted" ? (
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
			{/* <SuccessOrderModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
			{isShownReport && (
				<div>
					<p>Selected Cancel Report: {cancelReport}</p>
				</div>
			)}
			<div className="divider my-0"></div>
			<div style={deliveryInfoStyle} className="">
				<p className="text-xl font-bold">Delivery Information:</p>
				{!order?.address_title &&
					!order?.address &&
					!order?.phone_no && (
						<p>{order?.customers_address_summary}</p>
					)}
				<p className="text-lg">{order?.address_title}</p>
				<p className="text-md">{order?.address}</p>
				<p>{order?.phone_no}</p>
			</div>
		</div>
	);
};

export default OrderDetailsShopper;
