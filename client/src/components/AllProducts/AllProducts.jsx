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
import LoadingPage from "../LodingPage/LoadingPage";
import { FaCheckCircle } from "react-icons/fa";

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
				// alert(error);
			});
		api.get(`/shopperproduct/getPopularShopperProduct`)
			.then((response) => {
				setPopularProducts(response.data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
				// alert(error);
			});
	}, []);

	const isVerifiedProduct = prods.filter(
		(product) => product.isVerified === "verified"
	);
	// console.log(isVerifiedProduct,"isVerifiedProduct");

	if (!prods?.length) return <LoadingPage></LoadingPage>;

	// console.log(prods,"Product for check varify");

	return (
		<div className=" mx-auto  max-w-7xl">
			<div className="">
				<div className="">
					{/* Popular Product  */}
					{prods && (
						<h2 className="section-title space-mb--20">
							<span className="text-xl font-bold">
								Popular Product{" "}
							</span>

							<Link className="primary-text"
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
					)}

					<ProductSlider products={popularProducts}></ProductSlider>
					<div className="my-2"></div>
					{prods && (
						<h2 className="section-title space-mb--20 ">
							<p className="text-xl font-bold flex items-center gap-3">
							<span>Verified Product</span>{" "}<FaCheckCircle className=" primary-text"></FaCheckCircle>
							</p>

							<Link className="primary-text"
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
					)}
					<ProductSlider products={isVerifiedProduct}></ProductSlider>
					<div className="my-2"></div>
					{prods && (
						<h2 className="section-title space-mb--20">
							<span className="text-xl font-bold">Product </span>

							<Link className="primary-text"
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
					)}
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
