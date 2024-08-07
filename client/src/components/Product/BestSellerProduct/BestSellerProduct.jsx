import { AddToCartIcon1, AddToCartIcon2 } from "@SvgHub/Icons";
import { Takaicon } from "@SvgHub/SocialIcon";
import { useAuth } from "@context/auth";
import { checkIfInCart, getDiscountPrice, getProducts } from "@helpers/product";
import { api } from "@lib/api";
import { addToCart, increaseQuantityofProd } from "@store/slices/cart-slice";
import { addToWishlist } from "@store/slices/wishlist-slice";
import Axios from "axios";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import LoadingPage from "../../LoadingPage/LoadingPage";
import './BestSellerProduct.css';
const BestSellerProduct = ({ limit, type }) => {
	const { cartItems } = useSelector((state) => state.cart);
	const { products } = useSelector((state) => state.product);
	const { wishlistItems } = useSelector((state) => state.wishlist);
	const prods = getProducts(products, limit, type);
	const dispatch = useDispatch();
	const { user } = useAuth();
	const [shopperProducts, setShopperProduct] = useState([]);
	// get product
	useEffect(() => {
		api.get(`/shopperproduct/getshopperproductBasedOnSaleCount`).then(
			(res) => {
				setShopperProduct(res.data);
			}
		);
	}, [dispatch]);

	if (!shopperProducts?.length) return <p>Loading..</p>;
	return (
		<div className="featured-product-area space-mb--25 mx-auto mt-2 max-w-7xl">
			<div className="">
				<div className="">
					<div className="border border-red-500 rounded p-1">
						{/* section title */}

						{shopperProducts && (
							<h2 className="section-title  border-b-2 py-2">
								<span className="text-xl font-bold mb-2 pl-2">
									Best Sale{" "}
								</span>

							</h2>
						)}

						{/* featured products */}
						<div className="featured-product-wrapper  ">
							<div className="mt-1 best-sell-responsive-card">
								{shopperProducts.map((single) => {
									return (
										<div
											key={single.id}
											className="best-sell-cart-shadow w-full  p-2 border "
										>
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
													}/products/${single.image}`}
													className="mx-auto  w-[150px] rounded object-cover transition duration-500 group-hover:scale-105"
													alt=""
												/>
											</Link>
											<br />
											<Link
												to={
													import.meta.env
														.VITE_API_PUBLIC_URL +
													`/shopper/${single.shopper_id}/${single.name.replace(/\s+/g, '_')}`
												}
											>
												<p className="text-xs text-gray-400">
													Shop Id{" "}
													<span className="font-bold text-black">
														#{single.shopper_id}
													</span>
												</p>
											</Link>

											<div className="flex items-center justify-between ">
												<div className="relative flex flex-col bg-white  ">
													<div className="h-fit">
														<h3 className="w-[80px] truncate   text-sm  text-black">
															{" "}
															{single.name}{" "}
														</h3>
													</div>

													<div className="flex items-center gap-4 font-bold text-black">
						{single.discount && single.discount > 0 ? (
							<Fragment>
								<span className=" font-bold text-black">
									<span className="primary-text">৳</span>
									{`${getDiscountPrice(single.price, single.discount)}`}
								</span>
								<s className="me-1 font-thin">
									{" "}
									<span className="primary-text">
										৳{" "}
									</span>{" "}
									{`${single.price}`}
								</s>
							</Fragment>
						) : (
							<span className=" font-bold  text-black">
								{" "}
								<span className="primary-text">৳ </span>{" "}
								{`${single.price}`}
							</span>
						)}
					</div>
												</div>
												<div>
													{user ? (
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
															<AddToCartIcon2
																width={42}
																height={42}
															></AddToCartIcon2>
														</button>
													) : (
														<Link
															to={
																import.meta.env
																	.VITE_API_PUBLIC_URL +
																"/login"
															}
														>
															<AddToCartIcon2
																width={42}
																height={42}
															></AddToCartIcon2>
														</Link>
													)}
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
		</div>
	);
};

BestSellerProduct.propTypes = {
	limit: PropTypes.number,
	type: PropTypes.string,
};

export default BestSellerProduct;
