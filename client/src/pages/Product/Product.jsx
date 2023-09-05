import Axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Swiper, { SwiperSlide } from "../../components/swiper";
import {
	addToCart,
	increaseQuantityofProd,
} from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";

import {
	checkIfInCart,
	getDiscountPrice,
	getProductCartQuantity,
} from "../../helpers/product";
import { api } from "../../lib/api";

const Product = () => {
	let { id } = useParams();
	const dispatch = useDispatch();

	const [productStock, setProductStock] = useState(0);

	const [prods, setProds] = useState([]);

	const [productImageId, setProductImageId] = useState(0);

	const [productImageName, setProductImageName] = useState();

	const [shopperName, setShopperName] = useState("");

	useEffect(() => {
		api.get(`/shopperproduct/getshopperproduct/${id}`)
			.then((response) => {
				setProds(response.data);
				setProductStock(response.data[0]?.product_count);
				setProductImageId(response.data[0]?.product_id);
			})
			.catch((error) => {
				alert(error);
			});
	}, [id]);

	const { cartItems } = useSelector((state) => state.cart);
	const { wishlistItems } = useSelector((state) => state.wishlist);
	const wishlistItem = wishlistItems.find((item) => item.id === id);

	const productCartQty = getProductCartQuantity(cartItems, prods);

	useEffect(() => {
		api.get(`/product/getproductimage/${productImageId}`)
			.then((response) => {
				setProductImageName(response.data[0]?.image);
			})
			.catch((error) => {});
	}, [productImageId]);

	const getShopperName = (shopperId) => {
		api.get(`/auth/getUserInfo/${shopperId}`)
			.then((response) => {
				setShopperName(response.data[0]?.name);
			})
			.catch((error) => {});
	};

	return (
		<div className="body-wrapper space-pt--70 space-pb--120">
			{/*====================  product image slider ====================*/}
			<div className="product-image-slider-wrapper space-pb--30 space-mb--30">
				{prods.map((single) => {
					return (
						<div
							key={Math.random()}
							className="product-image-single swiper-slide"
						>
							<img
								src={`${
									import.meta.env.VITE_APP_IMG_URL
								}/${productImageName}`}
								className="img-fluid"
								alt="Product"
							/>
						</div>
					);
				})}
			</div>
			{/*====================  End of product image slider  ====================*/}
			{prods.map((prods) => {
				return (
					<div
						key={Math.random()}
						className="product-content-header-area border-bottom--thick space-pb--30"
					>
						<div className="container">
							<div className="row">
								<div className="col-12">
									<div className="product-content-header">
										<div className="product-content-header__main-info">
											{getShopperName(prods.shopper_id)}
											<Link
												to={
													import.meta.env
														.VITE_API_PUBLIC_URL +
													`/shopkeeperProfileCV/${prods.shopper_id}`
												}
											>
												<p className="text-xl font-bold">
													#{prods.shopper_id}{" "}
													{shopperName}
												</p>
											</Link>
											<h3 className="title">
												{prods.name}
											</h3>
											<div className="price">
												{prods.discount &&
												prods.discount > 0 ? (
													<Fragment>
														<span className="main-price me-1">{`$${prods.price}`}</span>
														<span className="discounted-price">{`$${getDiscountPrice(
															prods.price,
															prods.discount
														)}`}</span>
													</Fragment>
												) : (
													<span className="discounted-price">{`$${prods.price}`}</span>
												)}
											</div>
											<div className="rating">
												<Fragment>
													<span className="rating__text">
														{prods.rating_count}
													</span>
												</Fragment>
											</div>
										</div>
										<div className="product-content-header__wishlist-info text-center">
											<ReactSVG
												src={
													import.meta.env
														.VITE_API_PUBLIC_URL +
													"/assets/img/icons/heart-dark.svg"
												}
											/>
											<span className="count">
												{prods.wishlist_count}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}
			{/* product content description */}
			<div className="product-content-description border-bottom--thick space-pt--25 space-pb--25">
				<div className="container">
					<div className="row">
						<div className="col-12">
							{/* <p className="space-mb--25">
								{prods.shortDescription}
							</p>
							<h4 className="space-mb--5">Free Shipping</h4>
							<p>
								To Bangladesh from seller via china. Shipping{" "}
								<br /> method online.
							</p> */}
						</div>
					</div>
				</div>
			</div>
			{/* product content safety */}
			<div className="product-content-safety border-bottom--thick space-pt--15 space-pb--15">
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
			</div>

			{/* product content description */}
			<div className="product-content-description space-pt--25 space-pb--25">
				<div className="container">
					<div className="row">
						<div className="col-12">
							{/* <h4 className="space-mb--5">Specification</h4>
							<p>{prods.fullDescription}</p> */}
						</div>
					</div>
				</div>
			</div>
			{/* shop product button */}
			<div className="shop-product-button">
				<button
					className="wishlist"
					disabled={wishlistItem !== undefined}
					onClick={() => dispatch(addToWishlist(prods))}
				>
					{wishlistItem !== undefined
						? "ADDED TO WISHLIST"
						: "ADD TO WISHLIST"}
				</button>
				{productStock && productStock > 0 ? (
					prods.map((prod) => {
						return (
							<button
								key={prod.id}
								className="cart"
								onClick={() => {
									if (checkIfInCart(cartItems, prod)) {
										dispatch(increaseQuantityofProd(prod));
									} else {
										dispatch(addToCart(prod));
									}
								}}
								disabled={productCartQty >= productStock}
							>
								{productCartQty >= productStock
									? "STOCK END"
									: "ADD TO CART"}
							</button>
						);
					})
				) : (
					<button className="cart" disabled>
						OUT OF STOCK
					</button>
				)}
			</div>
			{/*====================  End of product content  ====================*/}
		</div>
	);
};

export default Product;
