import { api } from "@lib/api";
import { useEffect, useState } from "react";
import ProductCart from "../Product/ProductCart/ProductCart";
import './tagShop.css'
const TagShop = () => {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await api.get(
					`/adminShopperProduct/getshopperproduct`
				);
				setProducts(response.data);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	if (loading) {
		return <div>Loading...</div>; // or render a loading spinner
	}

	if (error) {
		return <div>Error: {error.message}</div>; // or display an error message
	}

	return (
		<div className="mx-auto max-w-7xl">
			<div className="my-4"></div>
			<div className="border border-red-500 rounded">
				<h2 className="section-title mb-2 border-b-2 p-2">
					<span className="text-xl font-bold ">
						TAG Online Store Product
					</span>
					<p className="text-xs">
						<span className="primary-text">Payment With:</span>{" "}
						Bkash and Cash On delivery
					</p>
				</h2>
				<div className=" tag-shop-responsive-card px-1">
					{products.map((product) => (
						<ProductCart product={product} key={product.id} />
					))}
				</div>
			</div>
		</div>
	);
};

export default TagShop;
