import { api } from "@lib/api";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import LoadingPage from "../../LoadingPage/LoadingPage";
import HeroSlider from "../../MainComponent/HeroSlider/HeroSlider";
import ProductSlider from "../ProductSlider/ProductSlider";

const AllProducts = ({ limit, sliderData }) => {
	const [popularProducts, setPopularProducts] = useState([]);
	const [prods, setProds] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [popularResponse, prodsResponse] = await Promise.all([
					api.get(`/shopperproduct/getPopularShopperProduct`),
					api.get(`/shopperproduct/getshopperproduct`),
				]);
				setPopularProducts(popularResponse.data);
				setProds(prodsResponse.data);
				setLoading(false);
			} catch (error) {
				setError(error.message);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const isVerifiedProduct = useMemo(
		() => prods.filter((product) => product.isVerified === "verified"),
		[prods]
	);
	const isOfferProduct = useMemo(
		() =>
			prods.filter(
				(product) => product.discount > 0 || product.discount === null
			),
		[prods]
	);

	// if (loading) return <LoadingPage />;

	return (
		<div className="mx-auto max-w-7xl">
			<div className="">
					{/* Popular Product  */}

					<div className="border border-red-500 p-2">
						{prods && (
							<h2 className="section-title  mb-2">
								<span className="text-xl font-bold">
									Popular Product{" "}
								</span>

								<Link
									className="primary-text "
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

						<ProductSlider
							products={popularProducts}
						></ProductSlider>
					</div>

					<div className="my-4"></div>

					<div className="border border-red-500 p-2">
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
						<ProductSlider
							products={isOfferProduct}
						></ProductSlider>
					</div>

					<div className="my-4"></div>
					<div className="border border-red-500 p-2">
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
						<ProductSlider
							products={isVerifiedProduct}
						></ProductSlider>
					</div>

					<div className="my-4"></div>
					<div className="border border-red-500 p-2">
						<HeroSlider
							sliderData={sliderData}
							isAutoPlay={false}
						/>
					</div>
					<div className="my-4"></div>

					<div></div>

					<div className="border border-red-500 p-2">
						{prods && (
							<h2 className="section-title mb-2">
								<span className="text-xl font-bold">
									All Products{" "}	</span>


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
					</div>

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

							</Link>
						</h2>
						<ProductSlider products={prods} />
					</div>
				)}

			</div>
		</div>
	);
};

AllProducts.propTypes = {
	limit: PropTypes.number,
	sliderData: PropTypes.array,
};

export default AllProducts;
