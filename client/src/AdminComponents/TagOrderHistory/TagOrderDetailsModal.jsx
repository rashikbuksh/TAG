import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import OrderProducTable from "../../components/Product/OrderProductTable/OrderProducTable";
import FormattedTime from "../../helpers/FormattedTime";

const TagOrderDetailsModal = ({ isOpen, setIsOpen, orderDetails }) => {
	const [formattedDifference, setFormattedDifference] = useState("N/A");

	// const [OrderDetails, setOrderDetails] = useState(orderDetails||[]);
	const totalPrice = orderDetails.map((d) => d.totalPrice);
	const cancel_report = orderDetails.map((d) => d.cancel_report);
	const order_time = orderDetails.map((d) => d.order_time);
	const accept_time = orderDetails.map((d) => d.shopper_order_accept_time);
	const delivery_time = orderDetails.map((d) => d.delivery_time);
	const formattedOrderTime = FormattedTime({
		time: order_time,
		format: "hh:mm A DD/MM/YY",
	});
	const formattedaccept_time = FormattedTime({
		time: accept_time,
		format: "hh:mm A DD/MM/YY",
	});
	const formatteddelivery_time = FormattedTime({
		time: delivery_time,
		format: "hh:mm A DD/MM/YY",
	});

	useEffect(() => {
		// Check if both delivery_time and order_time exist and are valid timestamps
		if (
			moment(delivery_time, "YYYY-MM-DD HH:mm:ss").isValid() &&
			moment(order_time, "YYYY-MM-DD HH:mm:ss").isValid()
		) {
			const deliveryTime = moment(delivery_time, "YYYY-MM-DD HH:mm:ss");
			const orderTime = moment(order_time, "YYYY-MM-DD HH:mm:ss");

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
	}, [order_time, delivery_time]);

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<div>
				<p>Products:</p>
				<div className="overflow-x-auto">
					<table className="min-w-full  divide-gray-200 bg-white text-sm">
						<tbody className=" divide-gray-200">
							{Array.isArray(orderDetails) &&
								orderDetails.length > 0 &&
								orderDetails.map((Orderdproduct) => (
									<>
										<OrderProducTable
											key={Orderdproduct.id}
											product={Orderdproduct}
										></OrderProducTable>
									</>
								))}
						</tbody>
					</table>
					<div className="divider my-0"></div>
					<div className="flex items-center justify-end gap-3">
						<p>Total Price</p>
						<p>{totalPrice[0]}</p>
					</div>
					<div className="rounded bg-gray-200 p-2">
						<h1 className="text-md mb-2 font-black">
							Others Information:
						</h1>
						<p className="">
							order Time:{" "}
							<span className="font-bold text-red-800">
								{" "}
								{formattedOrderTime}
							</span>
						</p>
						<p>
							Accept By Shopper:
							<span className="font-bold text-red-800">
								{formattedaccept_time}
							</span>{" "}
						</p>
						<p>
							Delivery Time:
							<span className="font-bold text-red-800">
								{formatteddelivery_time}
							</span>{" "}
						</p>{" "}
						<p>
							Time Difference (Order to Delivery):
							{formattedDifference}
						</p>
					</div>
					<div className="divider my-0"></div>
					{cancel_report && (
						<div className="">
							<p>Cancel Report</p>
							<p>{cancel_report ? cancel_report : ""}</p>
						</div>
					)}
				</div>
			</div>
		</Modal>
	);
};

export default TagOrderDetailsModal;
