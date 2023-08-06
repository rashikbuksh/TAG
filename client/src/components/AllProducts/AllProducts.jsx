import Axios from "axios";
import PropTypes from "prop-types";
import { Fragment, default as React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { getDiscountPrice, getProducts } from "../../helpers/product";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import ProductCart from "../ProductCart/ProductCart";

const AllProducts = ({ limit }) => {
	const { wishlistItems } = useSelector((state) => state.wishlist);
	const [prods, setProds] = useState([]);
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// get userid from local storage
	const userId = localStorage.getItem("user-id");

	if (userId === null) {
		window.location.href = "/login";
	}

	useEffect(() => {
		Axios.get(
			`${
				import.meta.env.VITE_APP_API_URL
			}/shopperproduct/getshopperproduct`
		)
			.then((response) => {
				setProds(response.data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
				alert(error);
			});
	}, []);

	console.log("login product",prods);
	if (!prods?.length) return <p>No products found</p>;

	return (
		<div className="products-area">
			<div className="container">
				<div className="row">
					<div className="col-12">
						{/* section title */}
						<h2 className="section-title space-mb--20">
							All Products
						</h2>
						{/* featured products */}
						<div className="all-products-wrapper space-mb-m--20">
							<div className="row">
								{prods.map((single) => {
									
									const wishlistItem = wishlistItems.find(
										(wishlistItem) =>
											wishlistItem.id === single.id
							);
									return (
										//?this is product cart style
										// <ProductCart productName={single.name} key={Math.random()}> </ProductCart>
										<div
											className="col-12 col-md-6"
											key={single.id}
										>
											<div className="grid-product space-mb--20">
												<div className="grid-product__image">
													<Link
														to={
															import.meta.env
																.VITE_API_PUBLIC_URL +
															`/product/${single.id}`
														}
													>
														{" "}
														click to view
													</Link>
													<button
														className={`icon ${
															wishlistItem !==
															undefined
																? "active"
																: ""
														}`}
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
														{/* <ReactSVG src="assets/img/icons/heart-dark.svg" /> */}
													</button>
												</div>
												<div className="grid-product__content">
													<h3 className="title">
														<Link
															to={
																import.meta.env
																	.VITE_API_PUBLIC_URL +
																`/product/${single.id}`
															}
														>
															{single.name}
														</Link>
													</h3>
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

AllProducts.propTypes = {
	limit: PropTypes.number,
};

export default AllProducts;
