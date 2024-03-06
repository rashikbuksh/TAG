import React, { Fragment } from "react";
import { FaCog, FaRegTimesCircle, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { Breadcrumb } from "../../components";
import { getDiscountPrice } from "../../helpers/product";
import { addToCart } from "../../store/slices/cart-slice";
import { deleteFromWishlist } from "../../store/slices/wishlist-slice";

const Wishlist = () => {
	const dispatch = useDispatch();

	const { wishlistItems } = useSelector((state) => state.wishlist);
	const { cartItems } = useSelector((state) => state.cart);

	return (
		<div className="body-wrapper  ">
			<Breadcrumb pageTitle="Wishlist" prevUrl="/home" />
			<div className="order-product-area">
				{wishlistItems && wishlistItems.length >= 1 ? (
					wishlistItems.map((single) => {
						const cartItem = cartItems.find(
							(item) => item.id === single.id
						);
						return (
							<div
								className="cart-product border-bottom--medium"
								key={single.id}
							>
								<div className="cart-product__image">
									<img
										src={
											import.meta.env
												.VITE_API_PUBLIC_URL +
											single.image[0]
										}
										className="img-fluid"
										alt=""
									/>
								</div>
								<div className="cart-product__content">
									<h3 className="title">{single.name}</h3>
									<span className="category">
										{single.category.map(
											(item, index, arr) => {
												return (
													item +
													(index !== arr.length - 1
														? ", "
														: "")
												);
											}
										)}
									</span>
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
								<div className="cart-product__status">
									{single.variation &&
									single.variation.length >= 1 ? (
										<Link
											to={
												import.meta.env
													.VITE_API_PUBLIC_URL +
												`/product/${single.id}`
											}
										>
											<FaCog />
										</Link>
									) : (
										<button
											onClick={() => {
												dispatch(addToCart(single));
												dispatch(
													deleteFromWishlist(
														single.id
													)
												);
											}}
											disabled={
												cartItem !== undefined &&
												cartItem.quantity > 0
											}
											title={
												single !== undefined
													? "Added to cart"
													: "Add to cart"
											}
										>
											<FaShoppingCart />
										</button>
									)}
									<button
										onClick={() =>
											dispatch(
												deleteFromWishlist(single.id)
											)
										}
										className="danger"
									>
										<FaRegTimesCircle />
									</button>
								</div>
							</div>
						);
					})
				) : (
					<div className="no-items-found">
						<div className="no-items-found__image">
							<ReactSVG
								src={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/assets/img/icons/wishlist.svg"
								}
							/>
						</div>
						<div className="no-items-found__content">
							<p>
								No Items in the wishlist.{" "}
								<Link
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/shop"
									}
								>
									Add Some
								</Link>
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Wishlist;
