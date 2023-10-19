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
	const [category, setCategory] = useState([]);
	const [selectedCategoryProduct, setSelectedCategoryProduct] = useState([]);

	const options = ["bag", "rice", "vevarage"];

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
				setSelectedCategoryProduct(res.data);
			})
			.catch((err) => {});
		api.get(`/category/get/category`).then((response) => {
			console.log(response.data);
			setCategory(response.data);
		});
	}, []);

	const selectedCategory = (e) => {
		const selectedCategoryId = parseInt(e.target.value); // Convert the value to an integer if needed
		if (selectedCategoryId === 0) {
			// If "Category" is selected, show all products
			setSelectedCategoryProduct(shopperProduct);
		} else {
			// Filter products based on the selected category
			const filteredProducts = shopperProduct.filter((product) => {
				return product.category_id === selectedCategoryId;
			});
			setSelectedCategoryProduct(filteredProducts);
		}
	};

	console.log(selectedCategoryProduct);

	return (
		<div className="mt-24">
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
						<select
							className="select select-bordered w-full max-w-xs outline-none"
							onChange={selectedCategory}
						>
							<option value="0" selected>
								Category
							</option>
							{category.map((option, index) => (
								<option key={index} value={option.category_id}>
									{option.category_name}
								</option>
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
						{selectedCategoryProduct.length === 0 && (
							<div className="flex items-center justify-center">
								<h1 className="text-2xl font-semibold">
									No Product Found
								</h1>
							</div>
						)}
						{selectedCategoryProduct.map((product) => {
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
											}/products/${product.image}`}
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
			<div className="h-14"></div>
		</div>
	);
};

export default ShopkeeperProfileCV;
