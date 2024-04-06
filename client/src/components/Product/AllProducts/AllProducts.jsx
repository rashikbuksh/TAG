import { api } from "@lib/api";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import LoadingPage from "../../LoadingPage/LoadingPage";
import HeroSlider from "../../MainComponent/HeroSlider/HeroSlider";
import ProductSlider from "../ProductSlider/ProductSlider";
import { MdVerifiedUser } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import "./tooltip.css";

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

				<div className="rounded border border-red-500 ">
					{prods && (
						<h2 className="section-title  mb-2 border-b-2 py-2">
							<span className="pl-2 text-xl font-bold">
								Popular Product{" "}
							</span>

							<Link
								className="primary-text pr-2 "
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
				</div>

				<div className="my-4"></div>

				<div className="rounded border border-red-500 ">
					{prods && (
						<h2 className="section-title mb-2 border-b-2 py-2">
							<span className="pl-2 text-xl font-bold">
								Offer Products{" "}
							</span>

							<Link
								className="primary-text pr-2"
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/shop/offer"
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
				</div>

				<div className="my-4"></div>
				<div className="rounded border border-red-500">
					{prods && (
						<div className="section-title mb-2 border-b-2 py-2 ">
							<div className="flex items-center gap-3 pl-2 text-xl font-bold">
								<span>Verified Product</span>

								<div
									data-tooltip-id="my-tooltip"
									data-tooltip-content="100% Good Quality And Authentic products"
									className="  z-10 mt-0"
									data-tip="hello"
								>
									<button className="">
										<MdVerifiedUser
											id="my-tooltip"
											color="#0866FF"
											className={`mt-1 cursor-pointer `}
										></MdVerifiedUser>
										<Tooltip id="my-tooltip" />
									</button>
								</div>
							</div>

							<Link
								className="primary-text pr-2"
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/shop/verified"
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
						</div>
					)}
					<ProductSlider products={isVerifiedProduct}></ProductSlider>
				</div>

				<div className="my-4"></div>
				<div className="">
					<HeroSlider sliderData={sliderData} isAutoPlay={false} />
				</div>
				<div className="my-4"></div>

				<div className="rounded border border-red-500">
					{prods && (
						<h2 className="section-title mb-2 border-b-2 py-2">
							<span className="pl-2 text-xl font-bold">
								All Products{" "}
							</span>

							<Link
								className="primary-text pr-2"
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
			</div>
		</div>
	);
};

AllProducts.propTypes = {
	limit: PropTypes.number,
	sliderData: PropTypes.array,
};

export default AllProducts;
