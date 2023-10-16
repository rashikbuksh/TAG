import { useEffect, useState } from "react";
import MakeModaratorModal from "../MakeModarator/MakeModarator";
import { api } from "../../lib/api";
import ModaratorTable from "./ModaratorTable";
import SearchFunction from "../SearchFunction/Index";

const ManageModarator = () => {
    const [isOpen, setIsOpen]=useState(false)
    const [tagModarator, setTagModarator] = useState([]);
	const [filteredtagModarator, setFilteredtagModarator] = useState([]);
	useEffect(() => {
		api.get(`/auth/getALLModaratorInfoForadmin`)
			.then((response) => {
				setTagModarator(response.data);
			})
			.catch((error) => {
				alert(error);
			});
	}, [tagModarator]);
	console.log(tagModarator);
    const handelOpenModal=()=>{
        setIsOpen(!isOpen)
        
    }

    return (
        <>
            <div className=" flex items-center justify-between my-10 mx-10">
            <SearchFunction
				arr={tagModarator}
				setFilteredArr={setFilteredtagModarator}
			></SearchFunction>
            <button className="actionbtn" onClick={handelOpenModal}>Add Modarator</button>
            
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
            <MakeModaratorModal isOpen={isOpen} setIsOpen={setIsOpen}></MakeModaratorModal>
            
        </>
    );
};

export default ManageModarator;