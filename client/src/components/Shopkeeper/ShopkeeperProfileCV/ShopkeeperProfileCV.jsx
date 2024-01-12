import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { map } from "leaflet";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaLocationDot, FaRegMessage } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import logo from "../../../../src/assets/img/Tag-logo-blue-get_100_100.png";
import SearchFunction from "../../../AdminComponents/SearchFunction/Index";
import { AddToCartIcon1, AddToCartIcon2 } from "../../../SvgHub/Icons";
import { Takaicon } from "../../../SvgHub/SocialIcon";
import { useAuth } from "../../../context/auth";
import GetLocation from "../../../helpers/GetLocation";
import { checkIfInCart } from "../../../helpers/product";
import { api } from "../../../lib/api";
import {
	addToCart,
	increaseQuantityofProd,
} from "../../../store/slices/cart-slice";
import Footer from "../../MainComponent/Footer/Footer";
import Header from "../../MainComponent/Header/Header";
import LocationModal from "../../Modal/LocationModal/LocationModal";
import MapDistanceModal from "../../Modal/LocationModal/MapDistanceModal";
import ShowCartIcon from "../../ShowCartIcon/ShowCartIcon";
const ShopkeeperProfileCV = () => {
	// get id from url
	const { id } = useParams();
	const { user } = useAuth();
	const { cartItems } = useSelector((state) => state.cart);
	const [shopperProduct, setShopperProduct] = useState([]);
	const [shopkeeperInfo, setShopkeeperInfo] = useState([]);
	const [category, setCategory] = useState([]);
	const [selectedCategoryProduct, setSelectedCategoryProduct] = useState([]);
	const [filteredAllProducts, setFilteredProducts] = useState([]);
	const [selectedLetter, setSelectedLetter] = useState("");
	const [mapModal, setMapModal] = useState(false);
	const [latLong, setLatLong] = useState({ lat: 0, lng: 0 });
	const dispatch = useDispatch();
	useEffect(() => {
		api.get(`/auth/getUserInfo/${id}`)
			.then((res) => {
				setShopkeeperInfo(res.data[0]);
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
			setCategory(response.data);
		});
	}, [id]);
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

	const handleSearch = (letter) => {
		setSelectedLetter(letter);
		if (letter === "#") {
			setFilteredProducts(selectedCategoryProduct);
		} else {
			const filteredResults = selectedCategoryProduct.filter((item) =>
				item.name.toUpperCase().startsWith(letter)
			);
			setFilteredProducts(filteredResults);
		}
	};

	const MapModalOpener = (location) => {
		let positionFromDb = location.split("__");
		setLatLong({
			lat: positionFromDb[0],
			lng: positionFromDb[1],
		});
		setMapModal(true);
	};
	return (
		<>
			<Header />
			<Footer />
			<ShowCartIcon />
			<div className="mt-[5rem] lg:mx-auto lg:w-[50%]">
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
									<div className=" h-[80px] w-[80px] rounded-full border p-1">
										<img
											className="h-6 w-6 rounded-full"
											src={
												shopkeeperInfo.profile_picture
													? `${
															import.meta.env
																.VITE_APP_IMG_URL
													  }/usersProfilePic/${
															shopkeeperInfo.profile_picture
													  }`
													: logo
											}
											alt=""
										/>
									</div>
								</div>
								<h1
									title="shop Name"
									className=" text-lg font-semibold"
								>
									<span className="primary-text">#</span>
									{id} {shopkeeperInfo.name}
								</h1>
								<div className="mb-2">
									<Rating
										style={{ maxWidth: 80 }}
										readOnly
										orientation="horizontal"
										value={shopkeeperInfo.review_count}
									/>
								</div>
								<div>33 Followers</div>
								<div className=" flex items-center justify-center gap-4">
									<button className=" font-xl h-[40px] w-[100px] rounded bg-[#469CD6] text-white">
										Message
									</button>
									{/* <MapDistanceModal
									isOpen={mapModal}
									setIsOpen={setMapModal}
									startLoc={GetLocation()}
									endLoc={shopkeeperInfo.shipping_address}
									startPopup={"I am Here"}
									endPopup={shopkeeperInfo.name}
								/> */}

									<button className=" font-xl h-[40px] w-[100px] rounded bg-[#FF4C5E] text-white">
										Follow
									</button>
									<button
										className=" font-xl h-[40px] w-[100px] rounded bg-[#469CD6] text-white"
										onClick={() =>
											MapModalOpener(
												shopkeeperInfo.shipping_address
											)
										}
									>
										Location
									</button>
									{/* <LocationModal
										isOpen={mapModal}
										setIsOpen={setMapModal}
										popup={shopkeeperInfo.name}
										latlong={latLong}
									></LocationModal> */}
									<MapDistanceModal
										isOpen={mapModal}
										setIsOpen={setMapModal}
										popup={shopkeeperInfo.name}
										latlong={latLong}
									/>
								</div>
							</div>
						)}

						<div className="  flex items-center justify-start gap-3  border-gray-300 px-4 ">
							<select
								defaultValue={"0"}
								className=" w-1/3 rounded border border-gray-300 px-3  py-2 text-gray-700 sm:text-sm"
								onChange={selectedCategory}
							>
								<option value="0">Category</option>
								{category.map((option, index) => (
									<option
										key={index}
										value={option.category_id}
									>
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
						<div className="alphabet-list absolute bottom-24 right-0  z-10 ml-5  w-[30px] ">
							{alphabet.map((letter) => (
								<button
									className="flex flex-col items-center justify-center text-[10px] font-bold"
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
								{/* //show product div  */}
								<div className="mb-20 grid h-[50vh] w-[90%] grid-cols-2  gap-1 overflow-y-auto border-t lg:mx-auto lg:grid-cols-4">
									{filteredAllProducts.map((single) => {
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
														}/products/${
															single.image
														}`}
														className="mx-auto h-[100px] w-[120px] rounded object-cover transition duration-500 group-hover:scale-105"
														alt=""
													/>
												</Link>
												{}
												{user ? (
													user.access ===
													"customer" ? (
														""
													) : user.id ==
													  single.shopper_id ? (
														<div className="flex items-center justify-end gap-2">
															<FaEye></FaEye>
															<p>{single.view}</p>
														</div>
													) : (
														""
													)
												) : (
													""
												)}

												<div className="my-1 flex items-center justify-between">
													<div className="relative flex flex-col bg-white ">
														<div className="h-fit">
															<h3 className="w-[100px] truncate   text-sm  text-black">
																{" "}
																{
																	single.name
																}{" "}
															</h3>
														</div>

														<div className=" flex items-center  gap-1">
															<Takaicon></Takaicon>
															<span className="text-base font-semibold tracking-wider text-black">
																{" "}
																{
																	single.price
																}{" "}
															</span>
														</div>
													</div>
													<div>
														<button
															disabled={
																user &&
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
																user &&
																user.access ===
																	"customer"
																	? ""
																	: "btn btn-disabled border-none bg-white bg-none p-0"
															}`}
														>
															<AddToCartIcon2
																width={32}
																height={32}
															></AddToCartIcon2>
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
		</>
	);
};

export default ShopkeeperProfileCV;
