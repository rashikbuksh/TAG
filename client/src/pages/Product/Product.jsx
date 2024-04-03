import { StarIcon } from "@SvgHub/Icons";
import { Footer, Header } from "@components";
import MessageModal from "@components/Modal/MessageModal/MessageModal";
import ShowCartIcon from "@components/ShowCartIcon/ShowCartIcon";
import { useAuth } from "@context/auth";
import { MdVerifiedUser } from "react-icons/md";
import {
	cartItemStock,
	checkIfInCart,
	getDiscountPrice,
} from "@helpers/product";
import { api } from "@lib/api";
import {
	addToCart,
	decreaseQuantity,
	increaseQuantity,
} from "@store/slices/cart-slice";
import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { Link, useParams } from "react-router-dom";

import "./tooltip.css";
import { Tooltip } from "react-tooltip";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Placeholder from "../../assets/img/no_product.png";
const Product = () => {
	const { cartItems } = useSelector((state) => state.cart);
	const { user } = useAuth();
	let { id } = useParams();

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

	useEffect(() => {
		api.get(`/shopperproduct/getshopperproduct/${id}`)
			.then((response) => {
				setProds(response.data);
				setProductStock(response.data[0]?.product_count);
			})
			.catch((error) => {});
	}, [id]);

	const { wishlistItems } = useSelector((state) => state.wishlist);
	const [isOpen, setIsOpen] = useState(false);
	const getShopperName = (shopperId) => {
		api.get(`/auth/getUserInfo/${shopperId}`)
			.then((response) => {
				setShopperName(response.data[0]?.name);
			})
			.catch((error) => {});
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

			<div className="mx-auto  px-4 py-8 mt-4 pb-20  lg:w-[50%]">

				{/* <ShowCartIcon></ShowCartIcon> */}
				{/*====================  product image slider ====================*/}
				<div className="">
					{products.map((single) => {
						return (
							<div
								key={Math.random()}
								className=" relative w-full  rounded p-3"
							>
								{/* <img
									src={`${
										import.meta.env.VITE_APP_IMG_URL
									}/products/${single.image}`}
									className={`${
										products &&
										products[0].active_status === 1
											? ""
											: "blur-sm"
									} mx-auto h-full w-[317px] rounded object-cover`}
									alt="Product"
								/> */}
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
											// src={`${
											// 	import.meta.env.VITE_APP_IMG_URL
											// }/products/${
											// 	single.optionalImage1
											// }`}
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
											// src={`${
											// 	import.meta.env.VITE_APP_IMG_URL
											// }/products/${
											// 	single.optionalImage2
											// }`}
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
												<div className="flex items-center gap-3 ">
													{getShopperName(
														prods.shopper_id
													)}
													<Link
														className=""
														to={
															import.meta.env
																.VITE_API_PUBLIC_URL +
															`/shopkeeperProfileCV/${prods.shopper_id}`
														}
													>
														<p className="primary-text  text-3xl  font-bold">
															{shopperName}
														</p>
													</Link>

													<div className="">
														<button
															onClick={
																handelOpenMessageModal
															}
														>
															<FaRegMessage className="text-xl" />
														</button>

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
													<h3 className=" text-xl font-bold">
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
													<StarIcon />
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
												<div className="font-bold text-black">
													{prods.discount &&
													prods.discount > 0 ? (
														<Fragment>
															<s className="me-1 font-thin">
																{" "}
																<span className="primary-text">
																	৳{" "}
																</span>{" "}
																{`${prods.price}`}
															</s>
															<span className="text-2xl font-bold text-black">
																{" "}
																<span className="primary-text">
																	৳{" "}
																</span>{" "}
																{`${getDiscountPrice(
																	prods.price,
																	prods.discount
																)}`}
															</span>
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
												<div className="prose-lg prose">
													<div
														dangerouslySetInnerHTML={{
															__html: prods.full_description,
														}}
													/>
												</div>
												{/* <div className="my-2 text-lg">
													{showFullDescription
														? prods.full_description
														: prods.full_description &&
														  prods.full_description
																.length > 30
														? prods.full_description.substring(
																0,
																80
														  ) + "..."
														: prods.full_description}
													{prods.full_description &&
														prods.full_description
															.length > 30 && (
															<button
																className="ml-2 cursor-pointer text-blue-500"
																onClick={
																	toggleDescription
																}
															>
																{showFullDescription
																	? "See Less"
																	: "See More"}
															</button>
														)}
												</div> */}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="">
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
						</div>
					);
				})}

				{/* product content description */}
				{/* <div className="product-content-description border-bottom--thick space-pt--25 space-pb--25">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<p className="space-mb--25">
								{prods.shortDescription}
							</p>
							<h4 className="space-mb--5">Free Shipping</h4>
							<p>
								To Bangladesh from seller via china. Shipping{" "}
								<br /> method online.
							</p>
						</div>
					</div>
				</div>
			</div> */}
				{/* product content safety */}
				{/* <div className="product-content-safety border-bottom--thick space-pt--15 space-pb--15">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h4>
								<ReactSVG
									src={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/assets/img/icons/security.svg"
									}
								/>{" "}
								Secure Payment Method.
							</h4>
						</div>
					</div>
				</div>
			</div> */}

				{/* product content description */}
				{/* <div className="product-content-description space-pt--25 space-pb--25">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h4 className="space-mb--5">Specification</h4>
							<p>{prods.fullDescription}</p>
						</div>
					</div>
				</div>
			</div> */}
				{/* shop product button */}

				{/*====================  End of product content  ====================*/}
			</div>
		</>
	);
};

export default Product;
