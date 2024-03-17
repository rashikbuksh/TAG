import useFetch from "@hooks/use-fetch";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
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
	// const [data, setData] = useState([]);
	// const [isLoading, setIsLoading] = useState(true);
	// const [errorMessage, setErrorMessage] = useState(null);

	// useEffect(() => {
	// 	fetch(`${import.meta.env.VITE_APP_API_URL}/category/getcategory`, {
	// 		headers: {
	// 			Authorization: Cookies?.get("auth"),
	// 		},
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setData(data);
	// 			setIsLoading(false);
	// 		})
	// 		.catch((error) => {
	// 			setErrorMessage(error.message);
	// 			setIsLoading(false);
	// 		});
	// }, []);

	// if (isLoading) return <Preloader />;
	// if (errorMessage) return <ErrorMessage errorMessage={errorMessage} />;

	const data = [1, 2, 3];

	return (
		<div className=" mx-4 my-12 ">
			<div className="">
				<div className="">
					<div className="">
						{/* section title */}
						<h2 className="section-title space-mt--10 space-mb--20">
							Hot News
						</h2>
						{/* category slider */}
						<div className="">
							{!!data.length && (
								<Swiper options={params}>
									{data.map((single) => (
										<SwiperSlide key={single.id}>
											<div className="w- h-12 bg-red-100"></div>
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

{
	/* <div className="category-item ">
												<div className="category-item__image">
													<Link
														to={
															import.meta.env
																.VITE_API_PUBLIC_URL +
															single.url
														}
													>
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
											</div> */
}
