import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";
import OrderProducTable from "../../components/OrderProductTable/OrderProducTable";

const TagOrderDetailsModal = ({ isOpen, setIsOpen, orderDetails }) => {
	console.log(orderDetails, "Order der");
	// const [OrderDetails, setOrderDetails] = useState(orderDetails||[]);
	const totalPrice = orderDetails.map((d) => d.totalPrice);
	const cancel_report = orderDetails.map((d) => d.cancel_report);
	console.log(totalPrice);
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<div>
				<p>Products:</p>
				<div className="overflow-x-auto">
					<table className="min-w-full  divide-gray-200 bg-white text-sm">
						<thead>
							<tr>
								<th>Name</th>
								<th>product_quantity</th>
								<th>Price</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody className=" divide-gray-200">
							{Array.isArray(orderDetails) &&
								orderDetails.length > 0 &&
								orderDetails.map((Orderdproduct) => (
									<>
										<OrderProducTable
											key={Orderdproduct.id}
											Orderdproduct={Orderdproduct}
										></OrderProducTable>
									</>
								))}
						</tbody>
					</table>
					<div className="divider my-0"></div>
					<div className="flex items-center justify-center gap-3">
						<p>Total Price</p>
						<p>{totalPrice[0]}</p>
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
