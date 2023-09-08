import Axios from "axios";
import PropTypes from "prop-types";
import { Fragment, default as React, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { getDiscountPrice, getProducts } from "../../helpers/product";
import { api } from "../../lib/api";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import ProductCart from "../ProductCart/ProductCart";
import ProductSlider from "../ProductSlider/ProductSlider";

const AllProducts = ({ limit }) => {
	const { wishlistItems } = useSelector((state) => state.wishlist);
	const [prods, setProds] = useState([]);
	const [popularProducts, setPopularProducts] = useState([]);
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// get userid from local storage
	const userId = localStorage.getItem("user-id");

	if (userId === null) {
		window.location.href = "/login";
	}

	useEffect(() => {
		api.get(`/shopperproduct/getshopperproduct`)
			.then((response) => {
				setProds(response.data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
				alert(error);
			});
		api.get(`/shopperproduct/getPopularShopperProduct`)
			.then((response) => {
				setPopularProducts(response.data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
				alert(error);
			});
	}, []);

	if (!prods?.length) return <p>No products found</p>;

	return (
		<div className=" mx-auto w-[95%]">
			<div className="">
				<div className=" my-10">
					{/* Popular Product  */}
					<div className="my-10 mb-2 flex items-center  justify-between">
						<div>
							<p className="text-xl font-bold">Popular Product</p>
						</div>
						<div className="rounded-full border border-gray-100 px-2 py-2">
							<FaArrowRight className="text-3xl "></FaArrowRight>
						</div>
					</div>
					<ProductSlider products={popularProducts}></ProductSlider>
					<div className=" my-10 mb-2 flex items-center  justify-between">
						<div>
							<p className="text-xl font-bold">
								Verified Product
							</p>
						</div>
						<div className="rounded-full border border-gray-100 px-2 py-2">
							<FaArrowRight className="text-3xl "></FaArrowRight>
						</div>
					</div>
					<ProductSlider products={prods}></ProductSlider>
					<div className=" my-10 mb-2 flex items-center  justify-between">
						<div>
							<p className="text-xl font-bold">Products</p>
						</div>
						<div className="rounded-full border border-gray-100 px-2 py-2">
							<FaArrowRight className="text-3xl "></FaArrowRight>
						</div>
					</div>
					<ProductSlider products={prods}></ProductSlider>
					{/* <div className="">
						<div className="grid gap-10 lg:grid-cols-4">
							{prods.map((single) => {
								const wishlistItem = wishlistItems.find(
									(wishlistItem) =>
										wishlistItem.id === single.id
								);
								return (
									//?this is product cart style
									<ProductCart
										product={single}
										key={single.id}
									>
										{" "}
									</ProductCart>
								);
							})}
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
};

AllProducts.propTypes = {
	limit: PropTypes.number,
};

export default AllProducts;
