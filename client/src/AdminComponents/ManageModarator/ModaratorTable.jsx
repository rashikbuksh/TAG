import React from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';

const ModaratorTable = ({tagModartor}) => {
    const handleModaratorDelete=(id)=>{
		const isConfirmed = window.confirm(
			"Are you sure you want to delete this Modarator?"
		);
		if (isConfirmed) {
			api.delete(`/auth/deleteModarator/${id}`)
				.then((res) => {
					// console.log("res", res);
					if (res.data.status === 200) {
						alert("Modarator Deleted Successfully");
						window.location.reload();
						// You may also want to update your UI to remove the deleted product from the list
						// Assuming you have a function to remove the product from the list, you can call it here.
					} else {
						alert(
							"Failed to delete the Modarator. Please try again."
						);
					}
				})
				.catch((error) => {
					console.error("Error deleting Modarator:", error);
					alert(
						"An error occurred while deleting the MOdarator. Please try again."
					);
				});
		}
    }
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
            <td>{tagModartor.id}</td>
            <td>
                {tagModartor.name}
                <br />
                <span className="badge badge-ghost badge-sm">
                    {tagModartor.user_name}
                </span>
            </td>
            {/* <td>
            {product.short_description}
        </td> */}
            {/* <td className="whitespace-nowrap px-4 py-2">
      
            
        </td> */}
            <td>{tagModartor.phone ? tagModartor.phone : "N/A"}</td>
            <td>{tagModartor.email ? tagModartor.email : "N/A"}</td>
            <td>{tagModartor.access ? tagModartor.access : "N/A"}</td>
            <td>
            {/*  */}
            <button onClick={()=>handleModaratorDelete(tagModartor.id)} className='btn  btn-xs'>Remove</button>
            </td>
        </tr>
    </>
    );
};

export default ModaratorTable;