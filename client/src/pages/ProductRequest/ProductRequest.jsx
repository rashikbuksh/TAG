import { useFetchFunc } from "@hooks";
import ProductRow from "./ProductRow";
import { useAuth } from "@context/auth";
import { useState } from "react";
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
			group = { name: item.name, items: [], id: crypto.randomUUID() ,price:item.price ,image:item.image};
			acc.push(group);
		}
		group.items.push(item);
		return acc;
	}, []);

	console.log(groupedByShopperProduct);

	return (
		<div className="mx-2 mt-24 flex flex-col gap-2">
			{groupedByShopperProduct.length > 0 &&
				groupedByShopperProduct.map((product) => (
					<ProductRow key={product.id} product={product}></ProductRow>
				))}
			{/* <ProductRow></ProductRow>
			<ProductRow></ProductRow> */}
		</div>
	);
};

export default ProductRequest;
