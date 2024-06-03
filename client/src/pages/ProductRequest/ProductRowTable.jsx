import React from "react";

const ProductRowTable = ({
	product,
	handleDelete,
	groupedByShopperProduct,
}) => {
	return (
		<>
			<tr>
				<th>
					<img
						src={`${import.meta.env.VITE_APP_IMG_URL}/products/${
							product.image
						}`}
						alt="Product Image"
						className="h-14 w-14 rounded"
					/>
				</th>
				<td>{product.name}</td>
				<td>{product?.items?.length}</td>
				<td>
					<button
						onClick={() =>
							handleDelete(product.id, groupedByShopperProduct)
						}
						className="btn btn-error"
					>
						Delete
					</button>
				</td>
			</tr>
		</>
	);
};

export default ProductRowTable;
