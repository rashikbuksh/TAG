import { Footer, Header, ShopProducts } from "@components";
import ShowCartIcon from "@components/ShowCartIcon/ShowCartIcon";
import { setActiveSort, toggleShopTopFilter } from "@helpers/product";
import { api } from "@lib/api";
import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const Shop = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [category, setCategory] = useState([]);
	const [allProduct, SetAllProduct] = useState([]);
	const { params } = useParams();

	// console.log("🚀 ~ Shop ~ params:", params);
	useEffect(() => {
		if (params === "verified") {
			const isVerifiedProduct = allProduct.filter(
				(product) => product.isVerified === "verified"
			);
			setProducts(isVerifiedProduct);
		} else if (params === "offer") {
			const isOfferProduct = allProduct.filter(
				(product) => product.discount > 0 || product.discount === null
			);
			setProducts(isOfferProduct);
		} else {
			setProducts(allProduct);
		}
	}, [params,allProduct]);


	useEffect(() => {
		api.get(`/shopperproduct/getshopperproduct`)
			.then((response) => {
				SetAllProduct(response.data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});

		api.get(`/category/get/category`).then((response) => {
			setCategory(response.data);
		});
	}, []);

	const [sortType, setSortType] = useState("");
	const [sortValue, setSortValue] = useState("");

	const [filterCategory, setFilterCategory] = useState(null);
	const filteredProduct =
		filterCategory === null
			? products
			: products.filter((product) => {
					return product.category_id === filterCategory;
			  });

	return (
		<>
			<Header />
			<Footer />
			<ShowCartIcon />
			<div className="body-wrapper  space-pt--70 space-pb--120">
				<div className="shop-header bg-color--grey">
					<div className="space-y--15 container">
						<div className="row align-items-center">
							<div className="col-3">
								<Link
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/home"
									}
									className="back-link"
								>
									{" "}
									<FaAngleLeft /> Back
								</Link>
							</div>
							<div className="col-6">
								<h4 className="category-title text-center">
									{sortType === "category" || ""
										? sortValue === ""
											? "All Categories"
											: sortValue
										: "All Categories"}
								</h4>
							</div>
							<div className="col-3 text-end">
								<button
									className="filter-trigger"
									id="filter-trigger"
									onClick={(e) => toggleShopTopFilter(e)}
								>
									Filter
								</button>
							</div>
						</div>
					</div>
					<div className="shop-filter" id="shop-filter-menu">
						<div className="space-mt--15 space-mb--50 container">
							<div className="row">
								<div className="col-12">
									<div className="shop-filter-block">
										<h4 className="shop-filter-block__title space-mb--15">
											Categories
										</h4>
										<div className="shop-filter-block__content">
											{category ? (
												<ul className="shop-filter-block__category">
													<li>
														<button
															onClick={(e) => {
																setFilterCategory(
																	null
																);
																setActiveSort(
																	e
																);
															}}
														>
															All
														</button>
													</li>
													{category.map(
														(category, key) => {
															return (
																<li key={key}>
																	<button
																		onClick={(
																			e
																		) => {
																			setActiveSort(
																				e
																			);
																			setFilterCategory(
																				category.category_id
																			);
																		}}
																	>
																		{
																			category.category_name
																		}
																	</button>
																</li>
															);
														}
													)}
												</ul>
											) : (
												"No categories found"
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* shop products */}
				{filteredProduct && <ShopProducts products={filteredProduct} />}
			</div>
		</>
	);
};

export default Shop;
