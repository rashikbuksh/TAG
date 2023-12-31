import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import MainProduct from "../../components/ProductCart/MainProduct";
import ProductCart from "../../components/ProductCart/ProductCart";
import ShopkeeperProductcart from "../../components/ShopkeepersProduct/ShopkeeperProductcart";

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
		<div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-10 z-0 my-10">
        {bestSellProduct &&
				bestSellProduct.map((product) => (
					<ProductCart key={product} product={product}></ProductCart>
				))}
        </div>
		</div>
	);
};

export default BestSellProduct;
