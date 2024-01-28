import Axios from "axios";
import PropTypes from "prop-types";
import { Fragment, default as React, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { getDiscountPrice, getProducts } from "../../../helpers/product";
import { api } from "../../../lib/api";
import { addToWishlist } from "../../../store/slices/wishlist-slice";
import LoadingPage from "../../LodingPage/LoadingPage";
import HeroSlider from "../../MainComponent/HeroSlider/HeroSlider";
import ProductCart from "../ProductCart/ProductCart";
import ProductSlider from "../ProductSlider/ProductSlider";
import { shuffleArray } from "../../../helpers/shuffleArray";

const AllProducts = ({ limit, sliderData }) => {
	const { wishlistItems } = useSelector((state) => state.wishlist);
	const [prods, setProds] = useState([]);
	const [popularProducts, setPopularProducts] = useState([]);
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		api.get(`/shopperproduct/getshopperproduct`)
			.then((response) => {
				const shuffledProds = shuffleArray(response.data);
				setProds(shuffledProds);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
		api.get(`/shopperproduct/getPopularShopperProduct`)
			.then((response) => {
				setPopularProducts(response.data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
	}, []);

	const isVerifiedProduct = prods.filter(
		(product) => product.isVerified === "verified"
	);
	const isOfferProduct = prods.filter(
		(product) => product.discount > 0 || product.discount === null
	);

	if (!prods?.length) return <LoadingPage></LoadingPage>;
	if (loading) return <LoadingPage></LoadingPage>;

	return (
		<div className=" mx-auto  max-w-7xl">
			<div className="">
				<div className="">
					{/* Popular Product  */}
					{prods && (
						<h2 className="section-title  mb-2">
							<span className="text-xl font-bold">
								Popular Product{" "}
							</span>

							<Link
								className="primary-text"
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
					<div className="my-4"></div>
					{prods && (
						<h2 className="section-title mb-2">
							<span className="text-xl font-bold">
								Offer Products{" "}
							</span>

							<Link
								className="primary-text"
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
					<ProductSlider products={isOfferProduct}></ProductSlider>
					<div className="my-4"></div>
					{prods && (
						<h2 className="section-title mb-2 ">
							<p className="flex items-center gap-3 text-xl font-bold">
								<span>Verified Product</span>{" "}
								<FaCheckCircle className=" primary-text"></FaCheckCircle>
							</p>

							<Link
								className="primary-text"
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
					<div className="my-4"></div>
					<HeroSlider sliderData={sliderData} isAutoPlay={false} />
					<div className="my-4"></div>
					{prods && (
						<h2 className="section-title mb-2">
							<span className="text-xl font-bold">
								All Products{" "}
							</span>

							<Link
								className="primary-text"
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
