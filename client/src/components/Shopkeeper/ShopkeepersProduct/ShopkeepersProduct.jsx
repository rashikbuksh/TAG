import Axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import { api } from "../../../lib/api";
import ShopkeeperMyProduct from "./ShopkeeperMyProduct";
import ShopkeeperProductcart from "./ShopkeeperProductcart";
import Breadcrumb from "../../MainComponent/Breadcrumb/Breadcrumb";
const ShopkeepersProduct = () => {
	const products = [
		{
			productName: "Pepsi",
			price: "40",
			productImage:
				"https://img.freepik.com/free-vector/realistic-soda-with-ice-advertisement_52683-8078.jpg?w=826&t=st=1691344295~exp=1691344895~hmac=5fd7d9533f18cb4d0bb0c408819fa9ff65f7d5f7d71776b485d345dff90c33ac",
		},
		{
			productName: "Coca-Cola",
			price: "45",
			productImage:
				"https://img.freepik.com/free-photo/cold-coffee_144627-22091.jpg?w=740&t=st=1691345373~exp=1691345973~hmac=12d5c04627179325738546093b8f1fe546bae660b73b25574e160ef65bfa35ee", // Replace with actual image URL
		},
		{
			productName: "Sprite",
			price: "35",
			productImage:
				"https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
		},
	];

	const { user } = useAuth();

	const [prods, setProds] = useState([]);

	useEffect(() => {
		api.get(`/shopperproduct/getshopperproductOfShopkeeper/${user.id}`)
			.then((response) => {
				setProds(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<div>
			<div className="mx-auto mt-14 p-2 lg:w-[70%] lg:border lg:border-gray-100 lg:p-4">
				<Breadcrumb
					pageTitle={"My Product"}
					prevUrl={"/shopkeeperDashboard"}
				/>

				<div className="divider"></div>
				<div className="flex items-center justify-between gap-10">
    <Link
        to={`${
            import.meta.env.VITE_API_PUBLIC_URL
        }/addshopperproduct`}
        className="text-4xl"
    >
        <FaPlusCircle />
    </Link>
    <input
        type="text"
        placeholder="Search Product"
        className="input input-bordered input-md flex-grow rounded-full mr-4"
    />
</div>

				<div className="my-10 grid grid-cols-2  gap-10 lg:grid-cols-2">
					{prods.map((product, index) => (
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
