import Modal from "@components/Modal/Modal";
import OrderProducTable from "@components/Product/OrderProductTable/OrderProducTable";
import FormattedTime from "@helpers/FormattedTime";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";

const TagOrderDetailsModal = ({ isOpen, setIsOpen, orderDetails }) => {
	const [formattedDifference, setFormattedDifference] = useState("N/A");

	// const [OrderDetails, setOrderDetails] = useState(orderDetails||[]);
	const totalPrice = orderDetails.map((d) => d.totalPrice);
	const cancel_report = orderDetails.map((d) => d.cancel_report);
	const order_time = orderDetails.map((d) => d.order_time);
	const accept_time = orderDetails.map((d) => d.shopper_order_accept_time);
	const delivery_time = orderDetails.map((d) => d.delivery_time);

	const addressTitle = orderDetails.map((d) => d.address_title);
	const address = orderDetails.map((d) => d.address);
	const contactNo = orderDetails.map((d) => d.phone_no);
	const customers_address_summary = orderDetails.map(
		(d) => d.customers_address_summary
	);
	// const [addressTitle, setAddressTitle] = useState(null);
	// const [address, setAddress] = useState(null);
	// const [contactNo, setContactNo] = useState(null);
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

	const deliveryInfoStyle = {
		background: "#f7f7f7", // Background color
		padding: "10px", // Padding around the delivery information
		borderRadius: "5px", // Rounded corners
		marginBottom: "20px", // Spacing between delivery info and total amount
	};
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<div>
				<p className="text-xl font-black">Products Information</p>
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
					<div style={deliveryInfoStyle}>
						<p className="text-xl font-bold">
							Delivery Information:
						</p>
						{!addressTitle[0] && !address[0] && !contactNo[0] && (
							<p>{customers_address_summary[0]}</p>
						)}
						<p className="text-lg">{addressTitle[0]}</p>
						<p className="text-md">{address[0]}</p>
						<p>{contactNo[0]}</p>
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
