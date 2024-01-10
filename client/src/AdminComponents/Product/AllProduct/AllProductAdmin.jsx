import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import SearchFunction from "../../SearchFunction/Index";
import AdminProductCart from "./AdminProductCart";
import { toast } from "react-toastify";

const AllProductAdmin = () => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		api.get("/product/getallproduct")
			.then((response) => {
				setProducts(response.data);
			})
			.catch((error) => {
				toast(error);
			});
	}, []);

	return (
		<>
			<SearchFunction
				arr={products}
				setFilteredArr={setFilteredProducts}
			></SearchFunction>
			<div className="mx-12 h-[70vh] overflow-x-auto rounded-md">
				<div className="z-0 overflow-x-auto">
					<table className="table-responsive table rounded-md">
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
								<th>Category id</th>
								<th>Verification Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{filteredProducts &&
								filteredProducts.map((product) => (
									<AdminProductCart
										key={product.id}
										product={product}
									/>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default AllProductAdmin;
