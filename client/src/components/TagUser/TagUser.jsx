import SearchFunction from "@AdminComponents/SearchFunction/Index";
import { api } from "@lib/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserTable from "./UserTable";

const TagUser = () => {
	const [tagUsers, setTagUsers] = useState([]);
	const [filteredtagUsers, setFilteredtagUsers] = useState([]);
	useEffect(() => {
		api.get(`/auth/getALLUser/admin`)
			.then((response) => {
				setTagUsers(response.data);
			})
			.catch((error) => {
				toast(error);
			});
	}, []);
	return (
		<>
			<p className="px-10 py-3 text-3xl font-bold">ALL User</p>
			<SearchFunction
				arr={tagUsers}
				setFilteredArr={setFilteredtagUsers}
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
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{/* row 1 */}
							{filteredtagUsers &&
								filteredtagUsers.map((tagUser) => (
									<UserTable
										key={tagUser.id}
										taguser={tagUser}
									></UserTable>
								))}
						</tbody>
						{/* foot */}
					</table>
				</div>
			</div>
		</>
	);
};

export default TagUser;
