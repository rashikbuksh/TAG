import Axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Swiper, { SwiperSlide } from "../../components/swiper";
import {
	addToCart,
	decreaseQuantity,
	increaseQuantity,
	increaseQuantityofProd,
} from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";

import { FaEye, FaRegMessage } from "react-icons/fa6";
import { useAuth } from "../../context/auth";
import {
	cartItemStock,
	checkIfInCart,
	getDiscountPrice,
	getProductCartQuantity,
} from "../../helpers/product";
import { api } from "../../lib/api";
import { StarIcon } from "../../SvgHub/Icons";
import MessageModal from "../../components/MessageModal/MessageModal";
import { FaCheckCircle } from "react-icons/fa";
import ShowCartIcon from "../../components/ShowCartIcon/ShowCartIcon";

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
		console.log(productInCart);

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

	const [prods, setProds] = useState([]);

	// console.log(prods, "productStock");
	const [shopperName, setShopperName] = useState("");

	useEffect(() => {
		api.get(`/shopperproduct/getshopperproduct/${id}`)
			.then((response) => {
				setProds(response.data);
				setProductStock(response.data[0]?.product_count);
			})
			.catch((error) => {
				// alert(error);
			});
	}, [id]);
	// console.log(prods);
	// console.log(prods, "loggged productjs");

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
	return (
		<div className="mx-auto px-4 py-20 lg:w-[50%] ">
			{/* <ShowCartIcon></ShowCartIcon> */}
			{/*====================  product image slider ====================*/}
			<div className="">
				{prods.map((single) => {
					return (
						<div
							key={Math.random()}
							className=" w-full rounded  p-3"
						>
							<img
								src={`${
									import.meta.env.VITE_APP_IMG_URL
								}/products/${single.image}`}
								className="mx-auto h-full w-[317px] rounded object-cover"
								alt="Product"
							/>
						</div>
					);
				})}
			</div>
			{/*====================  End of product image slider  ====================*/}
			{prods.map((prods) => {
				// console.log(prods, "in product");
				return (
					<div key={Math.random()} className="">
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
													<FaRegMessage
														onClick={
															handelOpenMessageModal
														}
														className="text-xl"
													/>
													<MessageModal
														isOpen={isOpen}
														setIsOpen={setIsOpen}
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
														<FaCheckCircle className=" primary-text"></FaCheckCircle>
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

												{user.access === "admin" ? (
													""
												) : user.access ===
												  "shopper" ? (
													""
												) : (
													<div className="cart-product__counter absolute  right-1  rounded-full bg-[#F2F8FD] px-2 py-2">
														<div className="flex items-center justify-center gap-2">
															<button
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
																value={quantity}
																readOnly
															/>
															<button
																className="quantity-button primary-background "
																onClick={
																	increasePQuantity
																}
																disabled={
																	prods.quantity >=
																	cartItemStock(
																		prods
																	)
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
											<div className="my-2 text-lg">
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
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="">
							{user.access === "admin" ? (
								""
							) : user.access === "shopper" ? (
								""
							) : cartItem ? (
								<button disabled className="auth-btn">
									Already in Cart
								</button>
							) : (
								<button
									onClick={() => {
										prods.quantity = quantity;
										if (checkIfInCart(cartItems, prods)) {
											// dispatch(
											// 	increaseQuantityofProd(prods)
											// );
										} else {
											dispatch(addToCart(prods));
										}
									}}
									className="auth-btn"
								>
									Add To Cart{" "}
								</button>
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
	);
};

export default Product;
