import Axios from "axios";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { getDiscountPrice, getProducts } from "../../helpers/product";
import { addToWishlist } from "../../store/slices/wishlist-slice";

const BestSellerProduct = ({ limit, type }) => {
	const { products } = useSelector((state) => state.product);
	const { wishlistItems } = useSelector((state) => state.wishlist);
	const prods = getProducts(products, limit, type);
	const dispatch = useDispatch();

	const [shopperProducts, setShopperProduct] = useState([]);

	// get product
	useEffect(() => {
		Axios.get(
			`${
				import.meta.env.VITE_APP_API_URL
			}/shopperproduct/getshopperproductBasedOnSaleCount`
		).then((res) => {
			setShopperProduct(res.data);
		});
	}, [dispatch]);

	if (!prods?.length) return <p>No products found</p>;

	return (
		<div className="featured-product-area space-mb--25">
			<div className="container">
				<div className="row">
					<div className="col-12">
						{/* section title */}
						<h2 className="section-title space-mb--20">
							Best Sale{" "}
							<Link
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/shop"
								}
							>
								VIEW ALL{" "}
								<span>
									<ReactSVG
										src={
											import.meta.env
												.VITE_API_PUBLIC_URL +
											"/assets/img/icons/arrow-right.svg"
										}
									/>
								</span>
							</Link>
						</h2>
						{/* featured products */}
						<div className="featured-product-wrapper space-mb-m--15">
							<div className="row row-5">
								{shopperProducts.map((single) => {
									const wishlistItem = wishlistItems.find(
										(wishlistItem) =>
											wishlistItem.id === single.id
									);
									return (
										<div className="col-6" key={single.id}>
											<div className="featured-product space-mb--15">
												<div className="featured-product__image">
													<Link
														to={
															import.meta.env
																.VITE_API_PUBLIC_URL +
															`/product/${single.id}`
														}
													>
														<p className="best-seller">
															{" "}
															{single.name}{" "}
														</p>
														<img
															src={`${
																import.meta.env
																	.VITE_APP_IMG_URL
															}/${single.image}`}
															className="img-fluid"
															alt=""
														/>
													</Link>
												</div>
												<div className="featured-product__content">
													<div className="price">
														{single.discount &&
														single.discount > 0 ? (
															<Fragment>
																<span className="main-price me-1">{`$${single.price}`}</span>

																<span className="discounted-price">
																	{`$${getDiscountPrice(
																		single.price,
																		single.discount
																	)}`}
																</span>
															</Fragment>
														) : (
															<span className="discounted-price">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	height="1em"
																	viewBox="0 0 384 512"
																>
																	<path d="M36 32.2C18.4 30.1 2.4 42.5 .2 60S10.5 93.6 28 95.8l7.9 1c16 2 28 15.6 28 31.8V160H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V384c0 53 43 96 96 96h32c106 0 192-86 192-192V256c0-53-43-96-96-96H272c-17.7 0-32 14.3-32 32s14.3 32 32 32h16c17.7 0 32 14.3 32 32v32c0 70.7-57.3 128-128 128H160c-17.7 0-32-14.3-32-32V224h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H128V128.5c0-48.4-36.1-89.3-84.1-95.3l-7.9-1z" />
																</svg>{" "}
																{`$${single.price}`}
															</span>
														)}
													</div>
													<div className="icon">
														<button
															className={
																wishlistItem !==
																undefined
																	? "active"
																	: ""
															}
															disabled={
																wishlistItem !==
																undefined
															}
															onClick={() =>
																dispatch(
																	addToWishlist(
																		single
																	)
																)
															}
														>
															<ReactSVG src="assets/img/icons/heart.svg" />
														</button>
													</div>
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
