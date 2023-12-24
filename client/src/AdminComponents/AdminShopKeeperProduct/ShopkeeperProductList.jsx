import React, { useEffect } from "react";
import { api } from "../../lib/api";

const ShopkeeperProductList = ({ product }) => {
	const handleDelete = (id) => {
		const confirm = window.confirm(
			"Are you sure you want to delete this product?"
		);
		if (!confirm) return;
		api.delete(`/shopperproduct/deleteshopperproduct/${id}`)
			.then((res) => {
				alert("Product Deleted Successfully");
			})
			.catch((error) => {
				alert(error);
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
