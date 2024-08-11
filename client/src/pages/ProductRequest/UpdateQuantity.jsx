import { useFetchFunc } from "@hooks";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ShopkeeperMyProduct from "@components/Shopkeeper/ShopkeepersProduct/ShopkeeperMyProduct";
import { Breadcrumb } from "@components";

const UpdateQuantity = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState();
	const [error, setError] = useState();
	const { id } = useParams();
	const location = useLocation();
	// console.log(id);
	useFetchFunc(
		`/shopperproduct/getshopperproduct/by/id/${id}`,
		0,
		setProducts,
		setLoading,
		setError
	);
	// console.log(products);
	const { product } = location.state || {};
	// console.log(location);
	// console.log("🚀 ~ UpdateQuantity ~ product:", product);

	return (
		<div className="mt-14">
			<Breadcrumb pageTitle="Stock Product" prevUrl="/productRequest" />
			{products.map((prod, index) => (
				<ShopkeeperMyProduct
					key={prod.id}
					product={prod}
					index={index + 1}
					clearFromStockRequest={product.items}
                    // handleDelete={handleDelete}
				></ShopkeeperMyProduct>
			))}
		</div>
	);
};

export default UpdateQuantity;
