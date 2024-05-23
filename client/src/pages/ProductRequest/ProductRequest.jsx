import { useFetchFunc } from "@hooks";
import ProductRow from "./ProductRow";
import { useAuth } from "@context/auth";
import { useState } from "react";
import { api } from "@lib/api";
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
		<div className="mx-2 mt-24 flex flex-col gap-2">
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
