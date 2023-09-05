import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import { FaCartShopping, FaLocationDot, FaRegMessage } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { api } from "../../lib/api";

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
		api.get(`/auth/getUserInfo/${id}`)
			.then((res) => {
				setShopkeeperInfo(res.data);
			})
			.catch((err) => {});

		api.get(
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
		<div className="mt-28">
			<div className="mx-auto px-4 lg:w-[70%]">
				<div className="mx-auto my-3 w-[100%]  border border-gray-50 ">
					{shopkeeperInfo.map((shopkeeper) => {
						return (
							<div
								key={Math.random()}
								className="flex items-center justify-between p-4 "
							>
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
										style={{ maxWidth: 100 }}
										readOnly
										orientation="horizontal"
										value={shopkeeper.review_count}
									/>
								</div>
							</div>
						);
					})}
					<div className="divider  p-4"></div>
					<div className="my-12 flex  items-center justify-around lg:px-24 ">
						<div className=" flex flex-col items-center justify-between">
							<div>
								<FaRegMessage className=" text-3xl text-blue-400 lg:text-6xl "></FaRegMessage>
							</div>
						</div>
						<div className="flex flex-col items-center justify-center">
							<div className="avatar online rounded-full border p-7">
								<FaCartShopping className="text-3xl text-blue-400 lg:text-6xl "></FaCartShopping>
							</div>
						</div>
						<div className=" flex flex-col items-center justify-center">
							<div>
								<FaLocationDot className="text-3xl text-blue-400 lg:text-6xl "></FaLocationDot>
							</div>
						</div>
					</div>
					<div className="my-3 flex items-center justify-start border-y border-gray-300 px-4 py-2">
						<select className="select select-bordered w-full max-w-xs outline-none">
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
								<form className="flex flex-row-reverse items-center">
									<input
										type="text"
										placeholder="Type here"
										className="input input-bordered input-md w-full max-w-xs rounded-full"
									/>
								</form>
							</div>
						</div>
					</div>
					<div className="my-10 grid gap-10 px-2 md:grid-cols-3 ">
						{shopperProduct.map((product) => {
							return (
								<Link
									key={Math.random()}
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										`/product/${product.id}`
									}
								>
									<div
										key={product.id}
										className=" relative mx-auto border border-gray-50 "
									>
										<img
											className=""
											src={`${
												import.meta.env.VITE_APP_IMG_URL
											}/${product.image}`}
											alt=""
										/>
										<div className=" badge badge-warning absolute right-0 top-2 gap-2">
											{product.name}
										</div>
									</div>
								</Link>
							);
						})}
					</div>
					<div className="my-2 flex items-center justify-center">
						<div className="join ">
							<button className="btn join-item btn-sm">1</button>
							<button className="btn join-item btn-active btn-sm">
								2
							</button>
							<button className="btn join-item btn-sm">3</button>
							<button className="btn join-item btn-sm">4</button>
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
