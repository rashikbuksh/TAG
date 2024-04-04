import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductCart from "../ProductCart/ProductCart";

const ShopProducts = ({ products }) => {
	const [gridActivate, setGridActivate] = useState(true);
	const [listActivate, setListActivate] = useState(false);
	const { wishlistItems } = useSelector((state) => state.wishlist);

	
	console.log("Pdt", products);

	const [category, setCategory] = useState([]);

	const setGridActive = () => {
		setGridActivate(true);
		setListActivate(false);
	};

	const setListActive = () => {
		setGridActivate(false);
		setListActivate(true);
	};

	return (
		<div className="shop-products-area">
			{/* shop layout switcher */}
			{/* <ShowCartIcon></ShowCartIcon> */}
			<div className="shop-layout-switcher space-mt--15 space-mb--15 text-end">
				<div className="container">
					{/* <button
						className={`${gridActivate ? "active" : ""}`}
						onClick={setGridActive}
					>
						<ReactSVG
							src={s
								import.meta.env.VITE_API_PUBLIC_URL +
								"/assets/img/icons/grid.svg"
							}
						/>
					</button>
					<button
						className={`${listActivate ? "active" : ""}`}
						onClick={setListActive}
					>
						<ReactSVG
							src={
								import.meta.env.VITE_API_PUBLIC_URL +
								"/assets/img/icons/list.svg"
							}
						/>
					</button> */}
				</div>
			</div>

			{/* shop grid products */}
			<div
				className={`shop-grid-products-wrapper space-mb-m--20 ${
					gridActivate ? "d-block" : "d-none"
				}`}
			>
				<div className="container">
					<div className="grid grid-cols-2 gap-10 lg:grid-cols-6">
						{products &&
							products 
							
								.map((single) => {
									const wishlistItem = wishlistItems.filter(
										(wishlistItem) =>
											wishlistItem.id === single.id
									)[0];
									return (
										<ProductCart
											product={single}
											key={single.id}
										>
											{" "}
										</ProductCart>
									);
								})}
					</div>
				</div>
			</div>

			{/* shop list products */}
			<div className="flex items-center justify-center">
				<div
					className={`grid grid-cols-1 gap-10  ${
						listActivate ? "d-block" : "d-none"
					}`}
				>
					{products &&
						products.map((single) => {
							const wishlistItem = wishlistItems.filter(
								(wishlistItem) => wishlistItem.id === single.id
							)[0];
							return (
								<div className="mb-10" key={single.id}>
									<ProductCart
										product={single}
										key={single.id}
									>
										{" "}
									</ProductCart>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};

ShopProducts.propTypes = {
	products: PropTypes.array,
};

export default ShopProducts;

// <div
// 	className="list-product border-bottom--medium"
// 	key={single.id}
// >
// 	<button
// 		className={`icon ${
// 			wishlistItem !== undefined
// 				? "active"
// 				: ""
// 		}`}
// 		disabled={wishlistItem !== undefined}
// 		onClick={() => addToWishlist(single)}
// 	>
// 		<ReactSVG src="assets/img/icons/heart-dark.svg" />
// 	</button>
// 	<div className="list-product__image">
// 		<Link
// 			to={
// 				import.meta.env
// 					.VITE_API_PUBLIC_URL +
// 				`/product/${single.id}`
// 			}
// 		>
// 			{/* <img
// 				src={
// 					import.meta.env
// 						.VITE_API_PUBLIC_URL +
// 					single.image[0]
// 				}
// 				className="img-fluid"
// 				alt=""
// 			/> */}
// 		</Link>
// 	</div>
// 	<div className="list-product__content">
// 		<h3 className="title">
// 			<Link
// 				to={
// 					import.meta.env
// 						.VITE_API_PUBLIC_URL +
// 					`/product/${single.id}`
// 				}
// 			>
// 				{single.name}
// 			</Link>
// 		</h3>
// 		{/* <span className="category">
// 			{single.map((item, index, arr) => {
// 				return (
// 					item +
// 					(index !== arr.length - 1
// 						? ", "
// 						: "")
// 				);
// 			})}
// 		</span> */}
// 		<div className="price">
// 			{single.discount &&
// 			single.discount > 0 ? (
// 				<Fragment>
// 					<span className="main-price me-1">{`$${single.price}`}</span>
// 					<span className="discounted-price">{`$${getDiscountPrice(
// 						single.price,
// 						single.discount
// 					)}`}</span>
// 				</Fragment>
// 			) : (
// 				<span className="discounted-price">{`$${single.price}`}</span>
// 			)}
// 		</div>
// 		<p>{single.shortDescription}</p>
// 	</div>
// </div>
