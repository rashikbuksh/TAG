import React from "react";
import { Link } from "react-router-dom";

const UserTable = ({ taguser }) => {
	console.log(taguser);
	return (
		<>
			<tr>
				<th>
					<label>
						<input type="checkbox" className="checkbox" />
					</label>
				</th>
				<td>
					<div className="flex items-center space-x-3">
						<div className="avatar">
							{/* <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={`${import.meta.env.VITE_APP_IMG_URL}/${taguser.image?taguser.image:""}`}
                                alt="Avatar Tailwind CSS Component"
                            />
                        </div> */}
						</div>
					</div>
				</td>
				<td>{taguser.id}</td>
				<td>
					{taguser.name}
					<br />
					<span className="badge badge-ghost badge-sm">
						{taguser.user_name}
					</span>
				</td>
				{/* <td>
                {product.short_description}
            </td> */}
				{/* <td className="whitespace-nowrap px-4 py-2">
          
                
            </td> */}
				<td>{taguser.phone ? taguser.phone : "N/A"}</td>
				<td>{taguser.email ? taguser.email : "N/A"}</td>
				<td>{taguser.access ? taguser.access : "N/A"}</td>
				<td>
                {/*  */}
					<Link to={`/taguserorderhistory/${taguser.id}`}>
						<button className="btn btn-accent btn-sm ml-3">
							Order History
						</button>
					</Link>
				</td>
			</tr>
		</>
	);
};

export default UserTable;
