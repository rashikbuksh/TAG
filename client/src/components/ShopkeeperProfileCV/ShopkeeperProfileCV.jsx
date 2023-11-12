import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import { FaCartShopping, FaLocationDot, FaRegMessage } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { api } from "../../lib/api";
import logo from "../../../public/assets/img/Tag-logo-blue-get_100_100.png";
import SearchFunction from "../../AdminComponents/SearchFunction/Index";
import { Takaicon } from "../../SvgHub/SocialIcon";
import { checkIfInCart } from "../../helpers/product";
import {
	addToCart,
	increaseQuantityofProd,
} from "../../store/slices/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/auth";
import { AddToCartIcon1 } from "../../SvgHub/Icons";
import ShowCartIcon from "../ShowCartIcon/ShowCartIcon";
const ShopkeeperProfileCV = () => {
	// get id from url
	const { id } = useParams();
	const { cartItems } = useSelector((state) => state.cart);
	const [shopperProduct, setShopperProduct] = useState([]);
	const [shopkeeperInfo, setShopkeeperInfo] = useState([]);
	const [category, setCategory] = useState([]);
	const [selectedCategoryProduct, setSelectedCategoryProduct] = useState([]);
	const [filteredAllProducts, setFilteredProducts] = useState([]);
	const [selectedLetter, setSelectedLetter] = useState("");
	// const options = ["bag", "rice", "vevarage"];
	const dispatch = useDispatch();
	const { user } = useAuth();
	useEffect(() => {
		api.get(`/auth/getUserInfo/${id}`)
			.then((res) => {
				setShopkeeperInfo(res.data[0]);
				// console.log(res.data[0]);
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
			// console.log(response.data);
			setCategory(response.data);
		});
	}, [id]);
	// console.log(shopkeeperInfo);
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
	const alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

	// console.log(selectedCategoryProduct);
	const handleSearch = (letter) => {
		setSelectedLetter(letter);
		console.log(letter);
		if (letter === "#") {
			setFilteredProducts(selectedCategoryProduct);
		} else {
			const filteredResults = selectedCategoryProduct.filter((item) =>
				item.name.toUpperCase().startsWith(letter)
			);
			setFilteredProducts(filteredResults);
		}
	};
	return (
		<div className="mt-5">
			{/* <ShowCartIcon></ShowCartIcon> */}
			<div className="">
				<div className="mx-auto my-3">
					{shopkeeperInfo && (
						<div className="relative flex flex-col items-center">
							<div
								className={`avatar ${
									shopkeeperInfo.active_status
										? "online"
										: "offline"
								} mb-2`}
							>
								<div className=" h-[100px] w-[100px] rounded-full border p-1">
									<img src={logo} alt="" className="" />
								</div>
							</div>

							{/* <h1
								title="shop id"
								className="text-base font-semibold"
							>
								
							</h1> */}
							<h1
								title="shop Name"
								className="mb-1 text-xl font-semibold"
							>
								<span className="primary-text">#</span>
								{id} {shopkeeperInfo.name}
							</h1>
							<div className="mb-2">
								<Rating
									style={{ maxWidth: 100 }}
									readOnly
									orientation="horizontal"
									value={shopkeeperInfo.review_count}
								/>
							</div>
							<div className="mt-4 flex items-center justify-center gap-4">
								<FaLocationDot className="text-3xl text-blue-400 lg:text-6xl "></FaLocationDot>
								<button className=" font-xl h-[48px] w-[140px] rounded bg-[#FF4C5E] text-white">
									Follow
								</button>
								<FaRegMessage className=" text-3xl text-blue-400 lg:text-6xl "></FaRegMessage>
							</div>
						</div>
					)}

					<div className=" flex items-center justify-start gap-3  border-gray-300 px-4 ">
						<select
							defaultValue={"0"}
							className=" w-1/3 rounded border border-gray-300 px-3  py-2 text-gray-700 sm:text-sm"
							onChange={selectedCategory}
						>
							<option value="0">Category</option>
							{category.map((option, index) => (
								<option key={index} value={option.category_id}>
									{option.category_name}
								</option>
							))}
						</select>

						<div className="">
							<div className="">
								<SearchFunction
									arr={selectedCategoryProduct}
									setFilteredArr={setFilteredProducts}
									width={true}
								></SearchFunction>
							</div>
						</div>
					</div>
					<div className="alphabet-list absolute right-0 bottom-20  z-10 ml-5  w-[30px] ">
						{alphabet.map((letter) => (
							<button
								className="flex flex-col items-center justify-center font-bold text-[10px]"
								key={letter}
								onClick={() => handleSearch(letter)}
							>
								<span
									className={
										selectedLetter === letter
											? "primary-text underline"
											: ""
									}
								>
									{letter}
								</span>
							</button>
						))}
					</div>
					<div className="">
						{filteredAllProducts.length === 0 && (
							<div className="flex items-center justify-center">
								<h1 className="text-2xl font-semibold">
									No Product Found
								</h1>
							</div>
						)}
						<div className="">
							<div className="grid w-[90%] h-[42vh] border-t  overflow-y-auto grid-cols-2 gap-1 lg:mx-auto lg:grid-cols-4">
								{filteredAllProducts.map((single) => {
									console.log(filteredAllProducts);
									return (
										<div
											key={single.id}
											className="bestsellCartShado w-full p-2"
										>
											<Link
												className="flex items-center justify-center"
												to={
													import.meta.env
														.VITE_API_PUBLIC_URL +
													`/product/${single.id}`
												}
											>
												<img
													src={`${
														import.meta.env
															.VITE_APP_IMG_URL
													}/products/${single.image}`}
													className="mx-auto h-[100px] w-[120px] rounded object-cover transition duration-500 group-hover:scale-105"
													alt=""
												/>
											</Link>
											<br />
											<Link
												to={
													import.meta.env
														.VITE_API_PUBLIC_URL +
													`/shopkeeperProfileCV/${single.shopper_id}`
												}
											>
												<p className="text-xs text-gray-400">
													Shop Id{" "}
													<span className="font-bold text-black">
														#{single.shopper_id}
													</span>
												</p>
											</Link>

											<div className="flex items-center justify-between">
												<div className="relative flex flex-col bg-white ">
													<div className="h-fit">
														<h3 className="w-[70px] truncate   text-sm  text-black">
															{" "}
															{single.name}{" "}
														</h3>
													</div>

													<div className=" flex items-center  gap-1">
														<Takaicon></Takaicon>
														<span className="text-base font-semibold tracking-wider text-black">
															{" "}
															{single.price}{" "}
														</span>
													</div>
												</div>
												<div>
													<button
														disabled={
															user.access !==
															"customer"
														}
														onClick={() => {
															single.quantity = 0;
															if (
																checkIfInCart(
																	cartItems,
																	single
																)
															) {
																dispatch(
																	increaseQuantityofProd(
																		single
																	)
																);
															} else {
																dispatch(
																	addToCart(
																		single
																	)
																);
															}
														}}
														className={`${
															user.access ===
															"customer"
																? ""
																: "btn btn-disabled border-none bg-white bg-none p-0"
														}`}
													>
														<AddToCartIcon1
															width={32}
															height={32}
														></AddToCartIcon1>
													</button>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <div className="h-20"></div> */}
		</div>
	);
};

export default ShopkeeperProfileCV;
