import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import SearchFunction from "../../SearchFunction/Index";
import AdminProductCart from "./AdminProductCart";
import { toast } from "react-toastify";

const AllProductAdmin = () => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [category, setCategory] = useState([]);

	useEffect(() => {
		api.get("/product/getallproduct")
			.then((response) => {
				setProducts(response.data);
			})
			.catch((error) => {
				toast(error);
			});
		api.get(`/category/get/category`).then((response) => {
			setCategory(response.data);
		});
	}, []);
	const selectedCategory = (e) => {
		const selectedCategoryId = parseInt(e.target.value); // Convert the value to an integer

		if (selectedCategoryId === 0) {
			// If "Category" is selected, show all products
			setFilteredProducts(products);
		} else {
			// Filter products based on the selected category
			const filteredProducts = products.filter((product) => {
				return product.category_id === selectedCategoryId;
			});
			setFilteredProducts(filteredProducts);
		}
	};
	return (
		<>
			<div className="flex items-center justify-center w-[80%] mx-auto">
				<SearchFunction
					arr={products}
					setFilteredArr={setFilteredProducts}
				></SearchFunction>
				<select
					defaultValue={"0"}
					className=" rounded border border-gray-300 px-3  py-2 text-gray-700 sm:text-sm"
					onChange={selectedCategory}
				>
					<option value="0">Category</option>
					{category.map((option, index) => (
						<option key={index} value={option.category_id}>
							{option.category_name}
						</option>
					))}
				</select>
			</div>

			<div className="mx-12 h-[80vh] overflow-x-auto rounded-md">
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
