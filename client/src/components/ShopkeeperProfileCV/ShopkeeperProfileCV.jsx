import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import { FaCartShopping, FaLocationDot, FaRegMessage } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";

const ShopkeeperProfileCV = () => {
	// get id from url
	const { id } = useParams();
	const [shopperProduct, setShopperProduct] = useState([]);
	const [shopkeeperInfo, setShopkeeperInfo] = useState([]);

	const storeid = "#5454r";
	const shopname = "Rafi Store";
	const ratingValue = 3;
	const options = ["bag", "rice", "vevarage"];
	const products = [
		{
			id: 1,
			name: "Product 1",
			price: 19.99,
			description: "This is the first product.",
			image: "https://images.unsplash.com/photo-1624821622383-f213ad4c0403?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
		},
		{
			id: 2,
			name: "Product 2",
			price: 29.99,
			description: "This is the second product.",
			image: "https://plus.unsplash.com/premium_photo-1684923611409-dc83b23b73e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
		},
		{
			id: 3,
			name: "Product 3",
			price: 9.99,
			description: "This is the third product.",
			image: "https://plus.unsplash.com/premium_photo-1674406481284-43eba097a291?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
		},
		{
			id: 4,
			name: "Product 4",
			price: 39.99,
			description: "This is the fourth product.",
			image: "https://plus.unsplash.com/premium_photo-1684923611409-dc83b23b73e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
		},
		{
			id: 5,
			name: "Product 5",
			price: 49.99,
			description: "This is the fifth product.",
			image: "https://images.unsplash.com/photo-1624821622383-f213ad4c0403?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
		},
		{
			id: 6,
			name: "Product 6",
			price: 15.99,
			description: "This is the sixth product.",
			image: "https://plus.unsplash.com/premium_photo-1684923611409-dc83b23b73e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
		},
	];

	useEffect(() => {
		Axios.get(`${import.meta.env.VITE_APP_API_URL}/auth/getUserInfo/${id}`)
			.then((res) => {
				setShopkeeperInfo(res.data);
			})
			.catch((err) => {});

		Axios.get(
			`${
				import.meta.env.VITE_APP_API_URL
			}/shopperproduct/getshopperproductOfShopkeeper/${id}`
		)
			.then((res) => {
				setShopperProduct(res.data);
			})
			.catch((err) => {});
	}, []);

	return (
		<div className="mt-32">
			<div className="w-[70%] mx-auto">
				<div className="w-[100%] mx-auto my-3  border border-gray-50 ">
					{shopkeeperInfo.map((shopkeeper) => {
						return (
							<div className="flex justify-between items-center p-4 ">
								<h1
									title="shop id"
									className="text-base font-semibold"
								>
									#{id}
								</h1>
								<h1
									title="shop Name"
									className="text-2xl font-bold"
								>
									{shopkeeper.name}
								</h1>
								<div>
									<Rating
										style={{ maxWidth: 150 }}
										readOnly
										orientation="horizontal"
										value={shopkeeper.review_count}
									/>
								</div>
							</div>
						);
					})}
					<div className="divider  p-4"></div>
					<div className="flex px-24  justify-between items-center my-12 ">
						<div className=" flex flex-col items-center justify-center">
							<div>
								<FaRegMessage className="text-6xl text-blue-400 "></FaRegMessage>
							</div>
						</div>
						<div className="flex flex-col items-center justify-center">
							<div className="border rounded-full p-7 avatar online">
								<FaCartShopping className="text-5xl text-blue-400 "></FaCartShopping>
							</div>
						</div>
						<div className=" flex flex-col items-center justify-center">
							<div>
								<FaLocationDot className="text-6xl text-blue-400 "></FaLocationDot>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-start border-y border-gray-300 my-3 py-2 px-4">
						<select className="select select-bordered w-full outline-none max-w-xs">
							<option disabled selected>
								Category
							</option>
							{options.map((option, index) => (
								<option key={index}>{option}</option>
							))}
						</select>
						<div className="divider divider-horizontal divide-black"></div>
						<div className="">
							{/* header search */}
							<div className="header-search">
								<form className="flex items-center flex-row-reverse">
									<input
										type="text"
										placeholder="Type here"
										className="input input-bordered input-md w-full max-w-xs rounded-full"
									/>
								</form>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-3 gap-10 my-10 ">
						{shopperProduct.map((product) => {
							return (
								<Link
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										`/product/${product.id}`
									}
								>
									<div
										key={product.id}
										className=" relative border border-gray-50 mx-auto "
									>
										<img
											className="h-[200px] w-[200px]"
											src={`${
												import.meta.env.VITE_APP_IMG_URL
											}/${product.image}`}
											alt=""
										/>
										<div className=" absolute top-2 right-0 badge badge-warning gap-2">
											{product.name}
										</div>
									</div>
								</Link>
							);
						})}
					</div>
					<div className="flex items-center justify-center my-2">
						<div className="join ">
							<button className="join-item btn btn-sm">1</button>
							<button className="join-item btn btn-sm btn-active">
								2
							</button>
							<button className="join-item btn btn-sm">3</button>
							<button className="join-item btn btn-sm">4</button>
						</div>
					</div>
					<div></div>
				</div>
			</div>
			<div className="h-96"></div>
		</div>
	);
};

export default ShopkeeperProfileCV;
