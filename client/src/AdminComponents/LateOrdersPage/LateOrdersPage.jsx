import React, { useEffect, useState } from "react";

import { api } from "../../lib/api";
import LateOrderTable from "./LateOrderTable";
import { toast } from "react-toastify";

const LateOrdersPage = () => {
	const [taglateOrder, setTagLateOrder] = useState([]);
	const [filteredtagUsers, setFilteredtagUsers] = useState([]);
	useEffect(() => {
		api.get(`/order/gettimeoutorder`)
			.then((response) => {
				setTagLateOrder(response.data);
			})
			.catch((error) => {
				toast(error);
			});
	}, []);

	return (
		<div>
			<h1 className="my-6 text-center text-xl">
				Late Orders (More than 45 Minutes)
			</h1>

			<div className="z-0 mx-auto w-[90%] overflow-x-auto">
				<table className=" table-responsive table rounded-md">
					{/* head */}
					<thead>
						<tr>
							<th>
								<label>
									<input
										type="checkbox"
										className="checkbox"
									/>
								</label>
							</th>
							<th>Order Id</th>
							<th>product_id , quantity</th>
							{/* <th>Short Decription</th> */}
							{/* <th>Full Description</th> */}
							<th>Customer Id</th>
							<th>Shopper Id</th>
							<th>price</th>
							<th>Order Status</th>
							<th>Order time</th>
							<th>Accept time</th>
							<th>Delivery time</th>
							<th>Total Time</th>
							<th>Any Report</th>
							<th className="text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}
						{taglateOrder &&
							taglateOrder.map((order) => (
								<LateOrderTable
									key={order.id}
									order={order}
								></LateOrderTable>
							))}
						{/* <AdminProductCart></AdminProductCart> */}
					</tbody>
					{/* foot */}
				</table>
			</div>
		</div>
	);
};

export default LateOrdersPage;
