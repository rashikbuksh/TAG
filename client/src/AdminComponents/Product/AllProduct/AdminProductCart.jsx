import React, { useState } from "react";
import ProductDetailsModal from "./ProductDetailsModal";

const AdminProductCart = ({ product }) => {
    const [isOpen,setIsOpen]=useState(false)
    const handelOpenProductModal=()=>{
        setIsOpen(!isOpen)
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
							<div className="mask mask-squircle h-12 w-12">
								<img
									src={`${import.meta.env.VITE_APP_IMG_URL}/products/${product.image}`}
									alt="Avatar Tailwind CSS Component"
								/>
							</div>
						</div>
					</div>
				</td>
				<td>{product.id}</td>
				<td>
					{product.name}
					<br />
					<span className="badge badge-ghost badge-sm"></span>
				</td>
				{/* <td>
					{product.short_description}
				</td> */}
				{/* <td className="whitespace-nowrap px-4 py-2">
              
					
				</td> */}
				<td>{product.category_id}</td>
				<td>
					<p
						className={`${
							product.isVerified === "verified"
								? "text-green-500"
								: ""
						}`}
					>
						{product.isVerified
							? product.isVerified
							: "Not Varified"}
					</p>
				</td>
				<th>
					<button className="btn btn-ghost btn-xs" onClick={handelOpenProductModal}>details</button>
				</th>
			</tr>
            <ProductDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} product={product}></ProductDetailsModal>
		</>
	);
};

export default AdminProductCart;
