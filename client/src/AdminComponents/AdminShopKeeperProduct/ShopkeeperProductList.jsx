import { api } from "@lib/api";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

const ShopkeeperProductList = ({ product }) => {
	const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "Are you sure you want to delete this product?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				api.delete(`/shopperproduct/deleteshopperproduct/${id}`)
					.then((res) => {
						Swal.fire({
							title: "Deleted!",
							text: "Product Deleted Successfully.",
							icon: "success",
						});
					})
					.catch((error) => {
						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: { error },
							footer: '<a href="#">Why do I have this issue?</a>',
						});
					});
			}
		});
	};
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
									src={`${
										import.meta.env.VITE_APP_IMG_URL
									}/products/${product.image}`}
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
				<td>{product.view}</td>
				<td>{product.product_count}</td>
				<td>{product.price}</td>

				<th>
					<button
						className="btn btn-ghost btn-xs"
						onClick={() => handleDelete(product.id)}
					>
						Delete
					</button>
				</th>
			</tr>
			{/* <ProductDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} product={product}></ProductDetailsModal> */}
		</>
	);
};

export default ShopkeeperProductList;
