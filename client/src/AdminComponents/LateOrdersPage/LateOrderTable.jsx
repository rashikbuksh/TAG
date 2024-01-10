import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import TagOrderDetailsModal from "../TagOrderHistory/TagOrderDetailsModal";

import moment from "moment-timezone";
import FormattedTime from "../../helpers/FormattedTime";
import { toast } from "react-toastify";

const LateOrderTable = ({ order }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [orderDetails, setOrderDetails] = useState([]);
	const [formattedDifference, setFormattedDifference] = useState("N/A");

	const handelOpenOrderHistoryModal = (id) => {
		setIsOpen(!isOpen);

		if (id) {
			api.get(`/order/getProductbyid/${id}`) // Fix the backtick here
				.then((response) => {
					setOrderDetails(response.data); // Use console.log instead of log
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};
	const formattedOrderTime = FormattedTime({
		time: order.order_time,
		format: "hh:mm A DD/MM/YY",
	});
	const formattedaccept_time = FormattedTime({
		time: order.accept_time,
		format: "hh:mm A DD/MM/YY",
	});
	const formatteddelivery_time = FormattedTime({
		time: order.delivery_time,
		format: "hh:mm A DD/MM/YY",
	});
	useEffect(() => {
		// Check if both delivery_time and order_time exist and are valid timestamps
		if (
			moment(order.delivery_time, "YYYY-MM-DD HH:mm:ss").isValid() &&
			moment(order.order_time, "YYYY-MM-DD HH:mm:ss").isValid()
		) {
			const deliveryTime = moment(
				order.delivery_time,
				"YYYY-MM-DD HH:mm:ss"
			);
			const orderTime = moment(order.order_time, "YYYY-MM-DD HH:mm:ss");

			const duration = moment.duration(deliveryTime.diff(orderTime));

			const hours = Math.floor(duration.asHours());
			const minutes = Math.floor(duration.asMinutes());
			const seconds = Math.floor(duration.asSeconds());

			let formattedDifference = "";

			if (hours > 0) {
				formattedDifference += `${hours} hours `;
			}

			if (hours > 0 || minutes > 0) {
				formattedDifference += `${minutes % 60} minutes `;
			}

			formattedDifference += `${seconds % 60} seconds`;

			setFormattedDifference(formattedDifference.trim());
		} else {
			// Handle the case where either delivery_time or order_time is missing or invalid
			setFormattedDifference("N/A");
		}
	}, [order.order_time, order.delivery_time]);

	const resolvedOrderdelay = () => {
		const id = order.id;
		api.post(`/order/resolvedorder_delay/${id}`, {
			order_delay_report: "solved",
		})
			.then((response) => {
				toast(response.data.message);
				if (response.status === 200) {
					window.location.reload();
				}
			})
			.catch((error) => {
				toast(error);
			});
	};
	return (
		<>
			<tr>
				<th>
					<label>
						<input type="checkbox" className="checkbox" />
					</label>
				</th>
				<td>{order.id}</td>
				<td>
					{order.product_id}
					<br />
					<span className="badge badge-ghost badge-sm">
						{order.quantity}
					</span>
				</td>
				<td>{order.customer_profile_id}</td>
				<td>{order.shopper_id}</td>
				<td>{order.price}</td>
				<td>{order.order_status}</td>
				<td>{formattedOrderTime}</td>
				<td>{formattedaccept_time}</td>
				<td>{formatteddelivery_time}</td>
				<td>{formattedDifference}</td>
				<td>{order.cancel_report ? order.cancel_report : "N/A"}</td>

				{/* <td>
                {product.short_description}
            </td> */}
				{/* <td className="whitespace-nowrap px-4 py-2">
          
                
            </td> */}

				<td className="grid grid-cols-2 gap-3">
					<button
						onClick={() => handelOpenOrderHistoryModal(order.id)}
						className="btn btn-accent btn-sm ml-3 text-[9px]"
					>
						Order Details
					</button>
					<button
						onClick={resolvedOrderdelay}
						className="btn btn-accent btn-sm ml-3 text-[9px]"
					>
						Resolve Problem
					</button>
					<button className="btn btn-accent btn-sm ml-3 text-[9px]">
						Call Shopper
					</button>
					<button className="btn btn-accent btn-sm ml-3 text-[9px]">
						Call Customer
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

export default LateOrderTable;
