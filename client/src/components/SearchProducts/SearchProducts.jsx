import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ReactSVG } from "react-svg";

import { getDiscountPrice, getProducts } from "../../helpers/product";
import { api } from "../../lib/api";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import ProductCart from "../ProductCart/ProductCart";

const SearchProducts = ({ limit }) => {
	const [allProducts, setAllProducts] = useState([]);
	const dispatch = useDispatch();
	const { keyword } = useParams();

	useEffect(() => {
		api.get(`/shopperproduct/get-searched-product/${keyword}`).then(
			(response) => {
				setAllProducts(response.data);
				// console.log(response.data, "response.data");
			}
		);
	}, [keyword]);
	const prods = getProducts(allProducts, limit);

	// const { wishlistItems } = useSelector((state) => state.wishlist);

	if (!prods?.length) return <p>No products found</p>;

	return (
		<div className="search-products-area">
			<div className="container">
				<div className="row">
					<div className="col-12">
						{/* featured products */}
						<div className="search-products-wrapper space-mt--30 space-mb-m--20">
							<div className="grid grid-cols-2 gap-3">
								{prods.map((single) => {
									// const wishlistItem = wishlistItems.find(
									// 	(wishlistItem) =>
									// 		wishlistItem.id === single.id
									// );
									return (
										<ProductCart
											key={single.id}
											product={single}
										></ProductCart>
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

SearchProducts.propTypes = {
	limit: PropTypes.number,
};

export default SearchProducts;
