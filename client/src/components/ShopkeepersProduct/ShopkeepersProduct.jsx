import Axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaPlusCircle } from "react-icons/fa";
import ShopkeeperProductcart from "./ShopkeeperProductcart";
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

	const id = localStorage.getItem("user-id");

	const [prods, setProds] = useState([]);

	useEffect(() => {
		Axios.get(
			`${
				import.meta.env.VITE_APP_API_URL
			}/shopperproduct/getshopperproductOfShopkeeper/${id}`
		)
			.then((response) => {
				setProds(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div>
			<div className="h-32"></div>
			<div className="lg:w-[70%] mx-auto lg:border lg:border-gray-100 lg:p-4 p-2">
				<div className="flex">
					<FaArrowAltCircleLeft className="text-4xl"></FaArrowAltCircleLeft>
					<h1 className="text-2xl flex-grow text-center font-extrabold">
						{" "}
						My Product
					</h1>
				</div>
				<div className="divider"></div>
				<div className="flex items-center justify-between gap-10">
					<FaPlusCircle className="text-4xl"></FaPlusCircle>
					<input
						type="text"
						placeholder="Search Product"
						className="input input-bordered input-md w-full rounded-full max-w-xs"
					/>
					<div>
						<span className="lg:text-xl">Share</span>{" "}
						<span className="lg:text-xl">|</span>{" "}
						<span className="lg:text-xl">Delete</span>
					</div>
				</div>
				<div className="  my-10 gap-10 grid grid-cols-1 lg:grid-cols-2">
					{prods.map((product) => (
						<ShopkeeperProductcart
							key={Math.random()}
							product={product}
						></ShopkeeperProductcart>
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
