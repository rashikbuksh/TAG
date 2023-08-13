import Axios from "axios";
import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShopProducts } from "../../components";
import {
	getIndividualCategories,
	getIndividualColors,
	getSortedProducts,
	setActiveSort,
	toggleShopTopFilter,
} from "../../helpers/product";

const Shop = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [category, setCategory] = useState([]);

	useEffect(() => {
		Axios.get(
			`${
				import.meta.env.VITE_APP_API_URL
			}/shopperproduct/getshopperproduct`
		)
			.then((response) => {
				setProducts(response.data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});

		Axios.get(
			`${import.meta.env.VITE_APP_API_URL}/category/getcategoryonProduct`
		).then((response) => {
			setCategory(response.data);
		});
	}, []);

	const [sortType, setSortType] = useState("");
	const [sortValue, setSortValue] = useState("");
	const [finalSortedProducts, setFinalSortedProducts] = useState([]);

	const uniqueCategories = getIndividualCategories(category);

	const getSortParams = (sortType, sortValue) => {
		setSortType(sortType);
		setSortValue(sortValue);
	};

	useEffect(() => {
		let sortedProducts = getSortedProducts(products, sortType, sortValue);
		console.log(sortedProducts);
		setFinalSortedProducts(sortedProducts);
	}, [products, sortType, sortValue]);

	return (
		<div className="body-wrapper space-pt--70 space-pb--120">
			<div className="shop-header bg-color--grey">
				<div className="container space-y--15">
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
					<div className="container space-mt--15 space-mb--50">
						<div className="row">
							<div className="col-12">
								<div className="shop-filter-block">
									<h4 className="shop-filter-block__title space-mb--15">
										Categories
									</h4>
									<div className="shop-filter-block__content">
										{uniqueCategories ? (
											<ul className="shop-filter-block__category">
												<li>
													<button
														onClick={(e) => {
															getSortParams(
																"category",
																""
															);
															setActiveSort(e);
														}}
													>
														All
													</button>
												</li>
												{uniqueCategories.map(
													(category, key) => {
														return (
															<li key={key}>
																<button
																	onClick={(
																		e
																	) => {
																		getSortParams(
																			"category",
																			category.product_id
																		);
																		setActiveSort(
																			e
																		);
																	}}
																>
																	{
																		category.name
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
			{finalSortedProducts && (
				<ShopProducts products={finalSortedProducts} />
			)}
		</div>
	);
};

export default Shop;
