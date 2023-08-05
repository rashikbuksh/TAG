import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import useFetch from "../../hooks/use-fetch";
import ErrorMessage from "../ErrorMessage";
import Preloader from "../Preloader";
import Swiper, { SwiperSlide } from "../swiper";

const params = {
	spaceBetween: 15,
	breakpoints: {
		370: {
			slidesPerView: 5,
		},
		320: {
			slidesPerView: 3,
		},
	},
};

const CategorySlider = () => {
	// fetch category data from server
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_APP_API_URL}/category/getcategory`)
			.then((response) => response.json())
			.then((data) => {
				setData(data);
				setIsLoading(false);
			})
			.catch((error) => {
				setErrorMessage(error.message);
				setIsLoading(false);
			});
	}, []);

	if (isLoading) return <Preloader />;
	if (errorMessage) return <ErrorMessage errorMessage={errorMessage} />;

	return (
		<div className="category-slider-area bg-color--grey space-pb--25 space-mb--25">
			<div className="container">
				<div className="row">
					<div className="col-12">
						{/* section title */}
						<h2 className="section-title space-mt--10 space-mb--20">
							Categories
						</h2>
						{/* category slider */}
						<div className="category-slider-wrapper">
							{!!data.length && (
								<Swiper options={params}>
									{data.map((single) => (
										<SwiperSlide key={single.id}>
											<div className="category-item ">
												<div className="category-item__image">
													<Link
														to={
															import.meta.env
																.VITE_API_PUBLIC_URL +
															single.url
														}
													>
														{/* <ReactSVG
															src={
																import.meta.env
																	.VITE_API_PUBLIC_URL +
																single.image
															}
														/> */}
													</Link>
												</div>
												<div className="category-item__title">
													<Link
														to={
															import.meta.env
																.VITE_API_PUBLIC_URL +
															single.url
														}
													>
														{single.name}
													</Link>
												</div>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategorySlider;
