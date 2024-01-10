import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";
import ShopkeeperProductList from "./ShopkeeperProductList";

const AdminShopkeeperProduct = () => {
	const { id } = useParams();
	const [shoperProduct, setShopperProduct] = useState([]);
	useEffect(() => {
		api.get(`/shopperproduct/getshopperproductAdmin/${id}`)
			.then((response) => {
				setShopperProduct(response.data);
			})
			.catch((error) => {
			});
	}, [id, shoperProduct]);
	return (
		<>
			<p className="px-10 py-3 text-3xl font-bold">
				{" "}
				Shoper Product For Shopper Id {id}
			</p>
			<div className="mx-auto  w-1/2 p-6">
				<label className="sr-only">Search</label>

				<input
					type="text"
					id="Search"
					placeholder="Search for..."
					className="w-full rounded-md border-gray-200 px-2 py-2.5 pe-10 shadow-sm sm:text-sm "
					// onChange={(e) => handleSearchChange(e.target.value)}
				/>
			</div>
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
								<th>Category id</th>
								<th>View</th>
								<th>Product Count</th>
								<th>Price</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{/* row 1 */}
							{shoperProduct &&
								shoperProduct.map((product) => (
									<ShopkeeperProductList
										key={product.id}
										product={product}
									></ShopkeeperProductList>
								))}
							{/* <AdminProductCart></AdminProductCart> */}
						</tbody>
						{/* foot */}
					</table>
				</div>
			</div>
		</>
	);
};

export default AdminShopkeeperProduct;
