import { useEffect, useState } from "react";
import MainProduct from "../../../components/Product/ProductCart/MainProduct";
import ProductCart from "../../../components/Product/ProductCart/ProductCart";
import ShopkeeperProductcart from "../../../components/Shopkeeper/ShopkeepersProduct/ShopkeeperProductcart";
import { api } from "../../../lib/api";

const BestSellProduct = () => {
	const [bestSellProduct, setBestSellProduct] = useState([]);
	useEffect(() => {
		api.get(`/shopperproduct/getAllshopperproductBasedOnSaleCount`)
			.then((response) => {
				setBestSellProduct(response.data);
			})
			.catch((error) => {
				// alert(error);
			});
	}, []);
	return (
		<div>
			<p className="text-center text-4xl font-bold text-black">
				Best Sell Product
			</p>
			<div className="z-0 my-10 grid grid-cols-1 gap-10 md:grid-cols-3 xl:grid-cols-4">
				{bestSellProduct &&
					bestSellProduct.map((product) => (
						<ProductCart
							key={product}
							product={product}
						></ProductCart>
					))}
			</div>
		</div>
	);
};

export default BestSellProduct;
