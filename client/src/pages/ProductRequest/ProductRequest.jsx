import { useFetchFunc } from "@hooks";
import ProductRow from "./ProductRow";
import { useAuth } from "@context/auth";
import { useState } from "react";
import { api } from "@lib/api";
import { Breadcrumb } from "@components";
const ProductRequest = () => {
	const { user } = useAuth();
	const [stockProduct, setStockProduct] = useState([]);
	const [loading, setLoading] = useState();
	const [error, setError] = useState();
	useFetchFunc(
		`/request-product-for-stock/Get-product/shopper/${user?.id}`,
		0,
		setStockProduct,
		setLoading,
		setError
	);
	console.log(stockProduct);
	const groupedByShopperProduct = stockProduct.reduce((acc, item) => {
		let group = acc.find((g) => g.name == item.name);
		if (!group) {
			group = {
				name: item.name,
				items: [],
				randomId: crypto.randomUUID(),
				id: item.id,
				price: item.price,
				shopper_product_id: item.shopper_product_id,
				image: item.image,
			};
			acc.push(group);
		}
		group.items.push(item);
		return acc;
	}, []);

	console.log(groupedByShopperProduct);

	const handleDelete = async (id, items) => {
		let deletionPromises = [];
		console.log(id);
		console.log(items);

		items.forEach(async (item) => {
			try {
				let deleteResponse = await api.delete(
					`/request-product-for-stock/delete/${item.id}`
				);
				console.log(`Item with ID ${item.id} deleted successfully.`);
				console.log(deleteResponse);

				deletionPromises.push(deleteResponse);
				if (deleteResponse.status == 200) {
					window.location.reload();
				}
			} catch (error) {
				console.error(`Error deleting item with ID ${item.id}:`, error);
			}
		});
		await Promise.all(deletionPromises);
		console.log("All deletions completed.");
	};

	return (
		<div className="mx-2 flex flex-col gap-2">
			<Breadcrumb
				pageTitle="Requested Product"
				prevUrl="/shopkeeperDashboard"
			/>
			{stockProduct.length === 0 && (
				<div className="mt-20 flex items-center justify-center">
					<div className="text-center">
						<svg
							className="mx-auto h-12 w-12 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 14l6-6m0 6l-6-6"
							/>
						</svg>
						<h3 className="mt-2 text-sm font-medium text-gray-900">
							No Products Available
						</h3>
						<p className="mt-1 text-sm text-gray-500">
							Please check back later.
						</p>
					</div>
				</div>
			)}
			{groupedByShopperProduct.length > 0 &&
				groupedByShopperProduct.map((product) => (
					<ProductRow
						key={product.randomId}
						product={product}
						handleDelete={handleDelete}
						groupedByShopperProduct={product.items}
					></ProductRow>
				))}
		</div>
	);
};

export default ProductRequest;
