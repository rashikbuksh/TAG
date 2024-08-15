import {
	FacebookIcon,
	InstagramIcon,
	Linkedin,
	TwitterIcon,
	WhatsappIcon,
} from "@SvgHub/SocialIcon";
import { Footer, Header } from "@components";
import MessageModal from "@components/Modal/MessageModal/MessageModal";
import ShowCartIcon from "@components/ShowCartIcon/ShowCartIcon";
import { useAuth } from "@context/auth";
import { HiOutlineStar } from "react-icons/hi";
import {
	cartItemStock,
	checkIfInCart,
	getDiscountPrice,
} from "@helpers/product";
import { useFetchFunc } from "@hooks";
import useClipboard from "@hooks/useCopyToClipBoard";
import { api } from "@lib/api";
import {
	addToCart,
	decreaseQuantity,
	increaseQuantity,
} from "@store/slices/cart-slice";
import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BiMessageRounded } from "react-icons/bi";
import { FaAngleLeft, FaCopy } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";
import { MdVerifiedUser } from "react-icons/md";
import { TiStar } from "react-icons/ti";
import Drawer from "react-modern-drawer";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Placeholder from "../../assets/img/no_product.png";
import "./tooltip.css";

const Product = () => {
	const [showCommentModal, setShowCommentModal] = useState(false);
	const { cartItems } = useSelector((state) => state.cart);
	const { user } = useAuth();
	let { id } = useParams();
	const { copyToClipboard } = useClipboard();

	const [isShareOpen, setIsShareOpen] = useState(false);
	const toggleDrawer = () => {
		setIsShareOpen((prevState) => !prevState);
	};

	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(0);
	const [cartItem, setCartItem] = useState(0);

	const increasePQuantity = () => {
		if (cartItem) {
			dispatch(
				increaseQuantity({
					cartItem,
					quantity: cartItem.quantity,
				})
			);
		} else {
			setQuantity(quantity + 1);
		}
	};

	// Function to decrease quantity
	const decreasePQuantity = () => {
		if (cartItem) {
			dispatch(decreaseQuantity(cartItem));
		} else {
			if (quantity > 0) {
				setQuantity(quantity - 1);
			}
		}
	};
	useEffect(() => {
		// Find the product in the cart based on the 'id' parameter
		const productInCart = cartItems.find((item) => item.id == id);

		if (productInCart) {
			// If the product is in the cart, set the product and quantity in the state
			setCartItem(productInCart);
			setQuantity(productInCart.quantity);
		} else {
			// Handle the case when the product is not found in the cart
			// You can set appropriate default values or show an error message.
		}
	}, [cartItems, id]);

	const [productStock, setProductStock] = useState(0);
	const [showFullDescription, setShowFullDescription] = useState(false);

	const [products, setProds] = useState([]);
	const [shopperName, setShopperName] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useFetchFunc(
		`/shopperproduct/getshopperproduct/by/id/${id}`,
		id,
		setProds,
		setLoading,
		setError
	);

	const { wishlistItems } = useSelector((state) => state.wishlist);
	const [isOpen, setIsOpen] = useState(false);
	const getShopperName = (shopperId) => {
		api.get(`/auth/getUserInfo/${shopperId}`)
			.then((response) => {
				setShopperName(response.data[0]?.name);
			})
			.catch((error) => {
				// console.log(error);
			});
	};
	const handelOpenMessageModal = () => {
		setIsOpen(!isOpen);
	};

	const toggleDescription = () => {
		setShowFullDescription(!showFullDescription);
	};
	<Helmet>
		<title>{products[0]?.name}-TAG</title>
		<meta
			name="msapplication-TileImage"
			content={`${import.meta.env.VITE_APP_IMG_URL}/products/${
				products[0]?.image
			}`}
		/>
		<meta
			property="og:site_name"
			content={import.meta.env.VITE_APP_IMG_URL}
		/>
		<meta property="og:title" content={products[0]?.name} />
		<meta
			property="og:description"
			content={products[0]?.full_description}
		/>
		<meta
			property="og:image"
			itemprop="image"
			content={`${import.meta.env.VITE_APP_IMG_URL}/products/${
				products[0]?.image
			}`}
		/>
		<meta property="og:type" content="website" />
		<meta property="og:image:type" content={"jpj"} />
		<meta property="og:image:width" content={"416px"} />
		<meta property="og:image:height" content={"210px"} />
		<meta
			property="og:url"
			content={`${import.meta.env.VITE_APP_IMG_URL}/products/${
				products[0]?.image
			}`}
		/>
	</Helmet>;
	return (
		<>
			<Header />
			<Footer />
			<ShowCartIcon />

			<div className="mx-auto  mt-4 px-4 py-8 pb-20  lg:w-[50%]">
				<div className="flex  justify-between rounded-md py-2">
					<Link to={"/home"} className="back-link">
						<FaAngleLeft size={25} color="" />
					</Link>
					<div>Product details</div>
					<div></div>
				</div>
				{/* <ShowCartIcon></ShowCartIcon> */}
				{/*====================  product image slider ====================*/}
				<div className="">
					{products.map((single) => {
						return (
							<div
								key={Math.random()}
								className=" relative w-full  rounded p-3"
							>
								<Carousel
									showArrows={true}
									className="mx-auto sm:w-full lg:w-[40%] "
								>
									<div>
										<img
											src={
												single.image
													? `${
															import.meta.env
																.VITE_APP_IMG_URL
													  }/products/${
															single.image
													  }`
													: Placeholder
											}
											className={`${
												products &&
												products[0].active_status === 1
													? ""
													: "blur-sm"
											} mx-auto h-full w-[150px] rounded object-cover`}
										/>
										{/* <p className="legend">{single.name}</p> */}
									</div>
									<div>
										<img
											src={
												single.optionalImage1
													? `${
															import.meta.env
																.VITE_APP_IMG_URL
													  }/products/${
															single.optionalImage1
													  }`
													: Placeholder
											}
											className={`${
												products &&
												products[0].active_status === 1
													? ""
													: "blur-sm"
											} mx-auto h-full w-[150px] rounded object-cover`}
										/>
										{/* <p className="legend">{single.name}</p> */}
									</div>
									<div>
										<img
											src={
												single.optionalImage2
													? `${
															import.meta.env
																.VITE_APP_IMG_URL
													  }/products/${
															single.optionalImage2
													  }`
													: Placeholder
											}
											className={`${
												products &&
												products[0].active_status === 1
													? ""
													: "blur-sm"
											} mx-auto h-full w-[150px] rounded object-cover`}
										/>
										{/* <p className="legend">{single.name}</p> */}
									</div>
								</Carousel>
								{products && products[0].active_status === 1 ? (
									""
								) : (
									<button
										disabled
										className="absolute left-0 top-[40%] w-full bg-primary py-1 text-white "
									>
										Shop Closed
									</button>
								)}
							</div>
						);
					})}
				</div>
				{/*====================  End of product image slider  ====================*/}
				{products.map((prods) => {
					return (
						<div key={Math.random()} className="mb-6">
							<div className="">
								<div className="">
									<div className="">
										<div className="">
											<div className="">
												<div className="flex items-center justify-between gap-2 ">
													{getShopperName(
														prods.shopper_id
													)}
													<Link
														className=""
														to={
															import.meta.env
																.VITE_API_PUBLIC_URL +
															`/shopper/${
																prods.shopper_id
															}/${shopperName.replace(
																/\s+/g,
																"_"
															)}`
														}
													>
														<p className="primary-text  text-2xl  font-bold">
															{shopperName}
														</p>
													</Link>

													<div className="flex gap-4">
														<div className="flex flex-col items-center">
															<button
																onClick={
																	handelOpenMessageModal
																}
															>
																<BiMessageRounded className="text-xl" />
															</button>
															<p className="text-xs">
																Message
															</p>
														</div>
														<div
															onClick={
																toggleDrawer
															}
															className="flex flex-col items-center "
														>
															<button>
																<IoMdShare className="text-xl" />
															</button>
															<div className="text-xs ">
																Share
															</div>
														</div>
														<Drawer
															open={isShareOpen}
															onClose={
																toggleDrawer
															}
															direction="bottom"
														>
															<div className="p-2">
																<div className="mx-2 flex items-center justify-between ">
																	<p className="text-lg font-bold">
																		Share
																	</p>
																	<FaX
																		className="text-xl"
																		onClick={
																			toggleDrawer
																		}
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

																<div className="text-md  link flex items-center justify-between rounded bg-gray-200 p-2 text-primary ">
																	<p>
																		{
																			import.meta
																				.env
																				.VITE_API_PUBLIC_URL
																		}
																		/product/
																		{id}/
																		{
																			prods.title
																		}
																	</p>
																	<FaCopy
																		onClick={() =>
																			copyToClipboard(
																				`${
																					import.meta
																						.env
																						.VITE_API_PUBLIC_URL
																				}/product/${id}/${
																					prods.title
																				}`
																			)
																		}
																		size={
																			30
																		}
																	/>
																</div>
															</div>
														</Drawer>

														<MessageModal
															isOpen={isOpen}
															setIsOpen={
																setIsOpen
															}
															title={""}
														></MessageModal>
													</div>
												</div>
												<div className="my-2 flex items-center gap-3">
													<h3 className=" text-[18px] font-bold">
														{prods.name}
													</h3>
													<div className="">
														{prods.isVerified ===
														"verified" ? (
															<div
																data-tooltip-id="my-tooltip"
																data-tooltip-content="100% Good Quality And Authentic products"
																className="z-10 mt-0"
																data-tip="hello"
															>
																<button className="m">
																	<MdVerifiedUser
																		id="my-tooltip"
																		color="#0866FF"
																		className=" mt-1 cursor-pointer"
																	></MdVerifiedUser>
																	<Tooltip id="my-tooltip" />
																</button>
															</div>
														) : (
															""
														)}
													</div>
												</div>

												<div className="relative mb-[20px] flex items-center gap-2">
													<TiStar
														size={22}
														color="gold"
													/>
													<p>
														{prods.rating_count
															? prods.rating_count
															: "0"}{" "}
														Reviews(5)
													</p>

													{user &&
													user.access === "admin" ? (
														""
													) : user &&
													  user.access ===
															"shopper" ? (
														""
													) : user &&
													  user.access ===
															"new_shopper" ? (
														""
													) : (
														<div className="cart-product__counter absolute  right-1  top-9 rounded-full bg-[#F2F8FD] px-2 py-2">
															<div className="flex items-center justify-center gap-2">
																<button
																	disabled={
																		products &&
																		products[0]
																			.active_status !==
																			1
																	}
																	className="quantity-button  bg-[#60abe9]"
																	onClick={
																		decreasePQuantity
																	}
																>
																	-
																</button>
																<input
																	className="w-[30px] bg-[#F2F8FD] text-center"
																	type="text"
																	value={
																		quantity
																	}
																	readOnly
																/>
																<button
																	className="quantity-button primary-background"
																	onClick={
																		increasePQuantity
																	}
																	disabled={
																		(products &&
																			products.length >
																				0 &&
																			products[0]
																				.active_status !==
																				1) ||
																		(prods &&
																			prods.quantity >=
																				cartItemStock(
																					prods
																				))
																	}
																>
																	+
																</button>
															</div>
														</div>
													)}
												</div>
												<div className="flex items-center gap-4 font-bold text-black">
													{prods.discount &&
													prods.discount > 0 ? (
														<Fragment>
															<span className="text-2xl font-bold text-black">
																<span className="primary-text">
																	৳
																</span>
																{`${getDiscountPrice(
																	prods.price,
																	prods.discount
																)}`}
															</span>
															<s className="me-1 font-thin">
																{" "}
																<span className="primary-text">
																	৳{" "}
																</span>{" "}
																{`${prods.price}`}
															</s>
														</Fragment>
													) : (
														<span className="text-2xl font-bold  text-black">
															{" "}
															<span className="primary-text">
																৳{" "}
															</span>{" "}
															{`${prods.price}`}
														</span>
													)}
												</div>
											</div>
											<div className="my-[24px]">
												<p className="text-xl font-bold">
													Description
												</p>
												<div className="prose prose-lg">
													<div
														dangerouslySetInnerHTML={{
															__html: prods.full_description,
														}}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-col gap-4">
								{user && user.access === "customer" ? (
									<button
										disabled={
											!products ||
											products[0].active_status !== 1 ||
											cartItem
										}
										onClick={() => {
											if (
												!checkIfInCart(cartItems, prods)
											) {
												dispatch(addToCart(prods));
											}
										}}
										className="auth-btn"
									>
										{!products
											? "Shop Closed"
											: cartItem
											? "Already in Cart"
											: "Add To Cart"}
									</button>
								) : (
									<Link
										className="auth-btn text-center"
										to={
											import.meta.env
												.VITE_API_PUBLIC_URL + "/login"
										}
									>
										Add To Cart{" "}
									</Link>
								)}
							</div>
							<div className="my-2">
								<div>
									<h1 className="text-xl font-semibold">
										Review this product
									</h1>
									<p
										onClick={() =>
											setShowCommentModal((d) => !d)
										}
										className="button mt-1 w-44 cursor-pointer rounded-xl border border-gray-500 bg-gray-100 p-1 shadow-md"
									>
										Write a customer review
									</p>

									{showCommentModal && (
										<div className="flex flex-col gap-2">
											<textarea
												style={{ fontStyle: "italic" }}
												rows={10}
												cols={40}
												className="font- mt-1 rounded  border  p-2"
											></textarea>
											<div className="flex justify-between">
												<div></div>
												<button className="btn btn-sm bg-green-400 w-16 ">
													Submit
												</button>
											</div>
										</div>
									)}
								</div>
								<div className="mt-2">
									<h1 className="text-xl font-semibold">
										Customer Reviews
									</h1>
									<div>
										<div className="mt-2 flex items-center gap-2">
											<img
												src="https://picsum.photos/200/300"
												alt="Profile image"
												className="h-8 w-8 rounded-2xl"
											/>
											<p className="font-semibold ">
												Jubayer
											</p>
										</div>
										<div className="my-1 flex gap-2 ">
											<HiOutlineStar className="text-yellow-300" />
											<HiOutlineStar className="text-yellow-300" />
											<HiOutlineStar className="text-yellow-300" />
											<HiOutlineStar className="text-yellow-300" />
											<HiOutlineStar className="text-yellow-300" />
										</div>
										<div>
											<p>
												The perfect blend of premium
												butter and high quality{" "}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Product;
