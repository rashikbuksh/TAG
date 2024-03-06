import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import ProductCart from "../Product/ProductCart/ProductCart";

const TagShop = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get(`/adminShopperProduct/getshopperproduct`).then((response) => {
            setProducts(response.data);
        });
    }, []);

    return (
        <div className="mx-auto max-w-7xl">
            <div className="my-4"></div>
            <h2 className="section-title mb-2">
                <span className="text-xl font-bold">TAG Online Store Product</span>
                <p className="text-xs">
                    <span className="primary-text">Payment With:</span> Bkash and Cash On delivery
                </p>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 my-4">
            {products.map((product) => (
                <ProductCart product={product} key={product.id} />
            ))}
            </div>
           
        </div>
    );
};

export default TagShop;
