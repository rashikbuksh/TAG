import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { api } from "../../lib/api";
import TagOrderTable from "./TagOrderTable";

const TagOrderHistory = () => {
	const { user } = useAuth();
	const [orderData, setOrderData] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			api.get(`/order/getallordershopper/${id}`)
				.then((response) => {
					setOrderData(response.data);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [id]);
	return (
		<>
			<p className="px-10 py-3 text-3xl font-bold">
				{" "}
				Order History For id {id}
			</p>
			<div className="mx-auto  w-1/2 p-6">
				<label className="sr-only">Search</label>

				<input
					type="text"
					id="Search"
					placeholder="Search for..."
					className="w-full rounded-md border-gray-200 px-2 py-2.5 pe-10 shadow-sm sm:text-sm "
					// onChange={(e) => handleSearchChange(e.target.value)}
				/>
			</div>
			<div className="  mx-12 h-[70vh] overflow-x-auto rounded-md ">
				<div className="z-0 overflow-x-auto">
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
								<th>price</th>
								<th>Order Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{/* row 1 */}
							{orderData &&
								orderData.map((order) => (
									<TagOrderTable
										key={order.id}
										order={order}
									></TagOrderTable>
								))}
							{/* <AdminProductCart></AdminProductCart> */}
						</tbody>
						{/* foot */}
					</table>
				</div>
			</div>
		</>
	);
};

export default TagOrderHistory;
