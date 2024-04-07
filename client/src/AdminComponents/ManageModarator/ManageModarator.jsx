import { api } from "@lib/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MakeModaratorModal from "../MakeModarator/MakeModarator";
import SearchFunction from "../SearchFunction/Index";
import ModaratorTable from "./ModaratorTable";

const ManageModarator = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [tagModarator, setTagModarator] = useState([]);
	const [filteredtagModarator, setFilteredtagModarator] = useState([]);
	useEffect(() => {
		api.get(`/auth/getALLUser/moderator`)
			.then((response) => {
				setTagModarator(response.data);
			})
			.catch((error) => {
				toast.error(error);
			});
	}, [tagModarator]);
	const handelOpenModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<div className=" mx-10 my-10 flex items-center justify-between">
				<SearchFunction
					arr={tagModarator}
					setFilteredArr={setFilteredtagModarator}
				></SearchFunction>
				<button className="actionbtn" onClick={handelOpenModal}>
					Add Modarator
				</button>
			</div>
			<div>
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
								{filteredtagModarator &&
									filteredtagModarator.map((tagModartor) => (
										<ModaratorTable
											key={tagModartor.id}
											tagModartor={tagModartor}
										></ModaratorTable>
									))}
							</tbody>
							{/* foot */}
						</table>
					</div>
				</div>
			</div>
			<MakeModaratorModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			></MakeModaratorModal>
		</>
	);
};

export default ManageModarator;
