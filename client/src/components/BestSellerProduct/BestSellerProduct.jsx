import PropTypes from "prop-types";
import React, { Fragment } from "react";
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
								{prods.map((single) => {
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
														<img
															src={
																import.meta.env
																	.VITE_API_PUBLIC_URL +
																single.image[0]
															}
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
																<span className="discounted-price">{`$${getDiscountPrice(
																	single.price,
																	single.discount
																)}`}</span>
															</Fragment>
														) : (
															<span className="discounted-price">{`$${single.price}`}</span>
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
