import SearchFunction from "@AdminComponents/SearchFunction/Index";
import Breadcrumb from "@components/MainComponent/Breadcrumb/Breadcrumb";
import { useAuth } from "@context/auth";
import { api } from "@lib/api";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import ShopkeeperMyProduct from "./ShopkeeperMyProduct";
const ShopkeepersProduct = () => {
	const { user } = useAuth();

	const [prods, setProds] = useState([]);
	const [FilteredArr, setFilteredArr] = useState([]);
	const [category, setCategory] = useState([]);

	useEffect(() => {
		api.get(`/shopperproduct/getshopperproduct/by/shopper-id/${user.id}`)
			.then((response) => {
				setProds(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
		api.get(`/category/get/category`).then((response) => {
			setCategory(response.data);
		});
	}, []);
	const selectedCategory = (e) => {
		const selectedCategoryId = parseInt(e.target.value); // Convert the value to an integer

		if (selectedCategoryId === 0) {
			// If "Category" is selected, show all products
			setFilteredArr(prods);
		} else {
			// Filter products based on the selected category
			const filteredProducts = prods.filter((product) => {
				return product.category_id === selectedCategoryId;
			});
			setFilteredArr(filteredProducts);
		}
	};
	return (
		<div>
			<div className="mx-auto mt-14 p-2 lg:w-[70%] lg:border lg:border-gray-100 lg:p-4">
				<Breadcrumb
					pageTitle={"My Product"}
					prevUrl={"/shopkeeperDashboard"}
				/>
				<div className="mt-2 flex items-center justify-between gap-3">
					<Link
						to={`${
							import.meta.env.VITE_API_PUBLIC_URL
						}/addshopperproduct`}
						className="text-4xl"
					>
						<FaPlusCircle className="primary-text" />
					</Link>
					<SearchFunction
						arr={prods}
						setFilteredArr={setFilteredArr}
						width={true}
					></SearchFunction>
					<div>
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
				</div>

				<div className="mx-auto my-2 grid w-[95%] grid-cols-2 gap-2 rounded md:grid-cols-4 lg:grid-cols-6">
					{FilteredArr.map((product, index) => (
						<ShopkeeperMyProduct
							key={product.id}
							product={product}
							index={index}
						></ShopkeeperMyProduct>
					))}
				</div>
			</div>
			<div className="h-44"></div>
		</div>
	);
};

export default ShopkeepersProduct;
{
	/*  */
}
