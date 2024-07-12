import SearchFunction from "@AdminComponents/SearchFunction/Index";
import { AddToCartIcon2 } from "@SvgHub/Icons";
import {
	FacebookIcon,
	InstagramIcon,
	Linkedin,
	Takaicon,
	TwitterIcon,
	WhatsappIcon,
} from "@SvgHub/SocialIcon";
import Footer from "@components/MainComponent/Footer/Footer";
import Header from "@components/MainComponent/Header/Header";
import MapDistanceModal from "@components/Modal/LocationModal/MapDistanceModal";
import Modal from "@components/Modal/Modal";
import ShowCartIcon from "@components/ShowCartIcon/ShowCartIcon";
import { useAuth } from "@context/auth";
import { checkIfInCart } from "@helpers/product";
import useClipboard from "@hooks/useCopyToClipBoard";
import useFollow from "@hooks/useFollow";
import { api } from "@lib/api";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { addToCart, increaseQuantityofProd } from "@store/slices/cart-slice";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaAngleLeft, FaCopy, FaEye, FaMapMarkerAlt } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { IoIosArrowBack, IoIosLink, IoMdShare } from "react-icons/io";
import { PiShareFat } from "react-icons/pi";
import Drawer from "react-modern-drawer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../../../src/assets/img/Tag-logo-blue-get_100_100.png";
import { getDiscountPrice } from "@helpers/product";
import GetDateTime from "@helpers/GetDateTime";
import { useFetchFunc } from "@hooks";
const ShopkeeperProfileCV = () => {
	const [show, setShow] = useState(false);
	const [shopperAddress, setShopperAddress] = useState("");
	// get id from url
	const { id } = useParams();
	const { user } = useAuth();
	const { cartItems } = useSelector((state) => state.cart);
	const [shopperProduct, setShopperProduct] = useState([]);
	const [shopkeeperInfo, setShopkeeperInfo] = useState({});
	const [category, setCategory] = useState([]);
	const [selectedCategoryProduct, setSelectedCategoryProduct] = useState([]);
	const [filteredAllProducts, setFilteredProducts] = useState([]);
	const [selectedLetter, setSelectedLetter] = useState("");
	const [mapModal, setMapModal] = useState(false);
	// const [followers, setFollowers] = useState(0);
	// const [copySuccess, setCopySuccess] = useState(null);
	const [latLong, setLatLong] = useState({ lat: 0, lng: 0 });
	const dispatch = useDispatch();
	// todo==============================================
	// const { user}=useAuth()
	// add addTo cart
	const { copySuccess, copyToClipboard } = useClipboard();
	console.log(user?.id);
	const { isFollow, followShopper, followers, getFollower } = useFollow(
		id,
		user?.id
	);
	useEffect(() => {
		api.get(`/auth/getUserInfo/${id}`)
			.then((res) => {
				setShopkeeperInfo(res.data[0]);
			})
			.catch((err) => {});

		api.get(
			`${
				import.meta.env.VITE_APP_API_URL
			}/shopperproduct/getshopperproduct/by/shopper-id/${id}`
		)
			.then((res) => {
				setShopperProduct(res.data);
				setSelectedCategoryProduct(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
		api.get(`/category/get/category`).then((response) => {
			setCategory(response.data);
		});
	}, [id]);
	const [requested_product, setRequestedProduct] = useState([]);
	const [loading, setLoading] = useState();
	const [error, setError] = useState();
	useFetchFunc(
		`/request-product-for-stock/Get-product/user/${user?.id}`,
		user?.id,
		setRequestedProduct,
		setLoading,
		setError
	);
	const selectedCategory = (e) => {
		const selectedCategoryId = parseInt(e.target.value);
		if (selectedCategoryId === 0) {
			setSelectedCategoryProduct(shopperProduct);
		} else {
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
	const [isShareOpen, setIsShareOpen] = useState(false);
	const toggleDrawer = () => {
		setIsShareOpen((prevState) => !prevState);
	};

	const handleShowDrawer = () => {
		setIsShareOpen(!isShareOpen);
	};

	const [showModal, setShowModal] = useState(false);
	const toggleModal = () => {
		setShowModal(!showModal);
	};
	const handelRequestForStock = (product_id) => {
		api.post(`/request-product-for-stock/add-request-product-for-stock`, {
			date: GetDateTime(),
			user_id: user.id, // Ensure user_id is an integer
			shopper_id: id, // Ensure shopper_id is an integer
			shopper_product_id: product_id, // Ensure shopper_product_id is an integer
		})
			.then((response) => {
				if (response.status === 201) {
					toast.success("Product Request Added Successfully");
					console.log(response);
				}

				// let remainList = filteredAllProducts.filter(
				// 	(item) => item.id !== product_id
				// );
			})
			.catch((error) => {
				console.error("Error adding product request:", error);
				toast.error("Failed to add product request");
			});
	};
	console.log(filteredAllProducts);
	return (
		<>
			<Header />
			<Footer />
			<ShowCartIcon />
			<div className="relative mt-[4rem] lg:mx-auto lg:w-[50%]">
				{/* <ShowCartIcon></ShowCartIcon> */}
				<div className=" ">
					<div className=" mx-auto my-3">
						<Drawer
							open={isShareOpen}
							onClose={toggleDrawer}
							direction="bottom"
						>
							<div className="p-2">
								<div className="mx-2 flex items-center justify-between ">
									<p className="text-lg font-bold">Share</p>
									<FaX
										className="text-xl"
										onClick={toggleDrawer}
									></FaX>
								</div>
								<div className="mx-auto mt-5 flex w-[80%] justify-between">
									<FacebookIcon />
									<Linkedin />
									<WhatsappIcon />
									<InstagramIcon />
									<TwitterIcon />
								</div>
								<div className="divider"></div>

								<p
									onClick={() =>
										copyToClipboard(
											`${
												import.meta.env
													.VITE_API_PUBLIC_URL
											}/shopper/${id}/${shopkeeperInfo.name.replace(
												/\s+/g,
												"_"
											)}`
										)
									}
									className="text-md link-info link flex items-center justify-between rounded bg-gray-200 p-2 "
								>
									{`${
										import.meta.env.VITE_API_PUBLIC_URL
									}/shopper/${id}/${shopkeeperInfo.name?.replace(
										/\s+/g,
										"_"
									)}`}{" "}
									<FaCopy size={30} />
								</p>
							</div>
						</Drawer>
						{/* Navigation and share icon */}
						<div className="flex justify-between px-4 py-2">
							<Link to={"/home"} className="back-link">
								{" "}
								<FaAngleLeft size={20} />
							</Link>

							<BsThreeDotsVertical
								onClick={() => setShow(!show)}
								size={20}
							></BsThreeDotsVertical>
						</div>

						<div
							className={` absolute right-8 z-10 cursor-pointer  rounded p-2 shadow-md ${
								!show ? "hidden" : ""
							}`}
						>
							<button
								className="flex items-center gap-2 p-1"
								onClick={handleShowDrawer}
							>
								<span>Share</span>
								<IoMdShare size={18}></IoMdShare>
							</button>
							<hr className="opacity-20" />
							<button
								className="flex items-center gap-2 p-1"
								onClick={() =>
									copyToClipboard(
										`${
											import.meta.env.VITE_API_PUBLIC_URL
										}/shopper/${id}/${shopkeeperInfo.name?.replace(
											/\s+/g,
											"_"
										)}`
									)
								}
							>
								<span>Copy Link</span>
								<IoIosLink size={18}></IoIosLink>
							</button>
						</div>

						{shopkeeperInfo && (
							<div className="relative flex flex-col items-center gap-1">
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
											onClick={toggleModal}
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
										<Modal
											isOpen={showModal}
											setIsOpen={setShowModal}
											color={"black"}
										>
											<div className="flex h-[60vh] items-center justify-center bg-black">
												<img
													src={
														shopkeeperInfo.profile_picture
															? `${
																	import.meta
																		.env
																		.VITE_APP_IMG_URL
															  }/usersProfilePic/${
																	shopkeeperInfo.profile_picture
															  }`
															: ""
													}
													alt=""
													className="max-h-full max-w-full"
												/>
											</div>
										</Modal>
									</div>
								</div>
								<div className="flex  items-center gap-2">
									<h1
										title="shop Name"
										className=" text-2xl   font-extrabold"
									>
										<span className="primary-text  ">
											#
										</span>
										{id} {shopkeeperInfo.name}
									</h1>
								</div>

								<div className="mb-2">
									<Rating
										style={{ maxWidth: 80 }}
										readOnly
										orientation="horizontal"
										value={shopkeeperInfo.review_count}
									/>
								</div>

								<div className="flex items-center gap-2">
									<FaMapMarkerAlt
										size={18}
										color="blue"
									></FaMapMarkerAlt>
									<span className="text-xs text-gray-500">
										{shopkeeperInfo?.address
											? shopkeeperInfo.address
											: "No Address Provided"}
									</span>
								</div>
								<div className="my-1 flex items-center gap-4 font-bold">
									<div>{followers} Followers </div>
								</div>

								<div className=" flex items-center justify-center gap-4">
									<button className=" font-xl h-[40px] w-[100px] rounded bg-[#469CD6] text-white">
										Message
									</button>
									{!isFollow ? (
										<button
											onClick={followShopper}
											className=" font-xl h-[40px] w-[100px] rounded bg-[#FF4C5E] text-white"
										>
											Follow
										</button>
									) : (
										<button className="font-xl h-[40px] w-[100px] rounded border-x-red-400 bg-red-200 font-bold text-black  opacity-80">
											Following
										</button>
									)}

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

									<MapDistanceModal
										isOpen={mapModal}
										setIsOpen={setMapModal}
										popup={shopkeeperInfo.name}
										latLong={latLong}
										single={true}
									/>
								</div>
							</div>
						)}

						<hr className="mt-4" />

						<div className="  flex items-center justify-between   border-gray-300 px-3 ">
							<div className="">
								<div className="">
									<SearchFunction
										arr={selectedCategoryProduct}
										setFilteredArr={setFilteredProducts}
										width={true}
									></SearchFunction>
								</div>
							</div>
							<select
								defaultValue={"0"}
								className=" mr-8 w-1/4 rounded border border-gray-300 px-2  py-2 text-gray-700 shadow-md sm:text-sm"
								onChange={selectedCategory}
							>
								<option value="0" className="">
									Category
								</option>
								{category.map((option, index) => (
									<option
										key={index}
										value={option.category_id}
									>
										{option.category_name}
									</option>
								))}
							</select>
						</div>
						<div className="alphabet-list b absolute right-0  z-10 ml-5  w-[20px] ">
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
								<div className="mb-20 grid h-[70vh] w-[93%] grid-cols-2  gap-2 overflow-y-auto border-t px-2 lg:mx-auto lg:grid-cols-4">
									{filteredAllProducts.map((single) => {
										return (
											<div
												key={single.id}
												className="best-sell-cart-shadow relative w-full p-2"
											>
												<div className="badge absolute right-2 bg-[#2D8FCA] text-white">
													<p>
														{single.product_count}
													</p>
												</div>
												<Link
													className="flex items-center justify-center"
													to={
														import.meta.env
															.VITE_API_PUBLIC_URL +
														`/product/${single.id}/${single.title}`
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
												{user &&
												user.access === "customer" ? (
													""
												) : user &&
												  user.id ==
														single.shopper_id ? (
													<div className="flex items-center justify-end gap-2">
														<FaEye></FaEye>
														<p>{single.view}</p>
													</div>
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
																{single.discount >
																	0 && (
																	<s className="text-xs">
																		{
																			single.price
																		}
																	</s>
																)}{" "}
																{`${parseFloat(
																	getDiscountPrice(
																		single.price,
																		single.discount
																	)
																).toFixed(2)}`}
															</span>
														</div>
													</div>
												</div>
												{user &&
												user.access === "customer" &&
												single.product_count <= 0 ? (
													(() => {
														const requestForProduct =
															requested_product.find(
																(product) =>
																	product.shopper_product_id ===
																	single.id
															);
														return requestForProduct ? (
															<button
																disabled
																className="w-full rounded bg-[#093857] px-2 py-1 text-center text-white"
															>
																Already
																Requested
															</button>
														) : (
															<button
																onClick={() =>
																	handelRequestForStock(
																		single.id
																	)
																}
																className="w-full rounded bg-[#469CD6] px-2 py-1 text-center text-white active:bg-[#568db3]"
															>
																Request for
																stock
															</button>
														);
													})()
												) : !shopkeeperInfo.active_status ==
												  1 ? (
													<button className="[#568db3] pointer-events-none w-full rounded bg-[#FF4C5E] px-2 py-1 text-center text-sm  text-white opacity-60  sm:text-base">
														Shop close now !
													</button>
												) : (
													<button
														type="button"
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
														className={`w-full rounded  bg-[#4a89b7] px-2 py-1  text-center text-white  active:bg-[#568db3] ${
															user &&
															user.access ==
																"customer"
																? ""
																: "hidden"
														} `}
													>
														Add to cart
													</button>
												)}
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
			<div className="h-14"></div>
		</>
	);
};

export default ShopkeeperProfileCV;
