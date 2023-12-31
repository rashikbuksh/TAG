import React, { useEffect, useState } from "react";
import UserTable from "../../components/TagUser/UserTable";
import { api } from "../../lib/api";
import SearchFunction from "../SearchFunction/Index";
import ShopkeeperTable from "./ShopkeeperTable";

const TagShopKeeper = () => {
	const [tagShopkeepers, settagShopkeepers] = useState([]);
	const [filteredtagShopkeepers, setFilteredtagShopkeepers] = useState([]);
	useEffect(() => {
		api.get(`/auth/getShopperInfo`)
			.then((response) => {
				settagShopkeepers(response.data);
			})
			.catch((error) => {
				alert(error);
			});
	}, []);
	return (
		<>
			<p className="px-10 py-3 text-3xl font-bold">All Shopkeeper</p>
			<SearchFunction
				arr={tagShopkeepers}
				setFilteredArr={setFilteredtagShopkeepers}
			></SearchFunction>
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
								<th>Image</th>
								<th>Id</th>
								<th>Name</th>
								{/* <th>Short Decription</th> */}
								{/* <th>Full Description</th> */}
								<th>Phone</th>
								<th>Email</th>
								<td>User Type</td>
								<td>Review</td>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{/* row 1 */}
							{filteredtagShopkeepers &&
								filteredtagShopkeepers.map((tagShopkeeper) => (
									<ShopkeeperTable
										key={tagShopkeeper.id}
										tagShopkeeper={tagShopkeeper}
									></ShopkeeperTable>
								))}
						</tbody>
						{/* foot */}
					</table>
				</div>
			</div>
		</>
	);
};

export default TagShopKeeper;
