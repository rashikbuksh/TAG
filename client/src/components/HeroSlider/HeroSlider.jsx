import useFetch from "../../hooks/use-fetch";
import { api } from "../../lib/api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Preloader from "../Preloader/Preloader";
import Swiper, { SwiperSlide } from "../swiper";

import Axios from "axios";
import React, { useEffect, useState } from "react";

const params = {
	loop: true,
	speed: 1000,
	autoplay: {
		delay: 3500,
		disableOnInteraction: false,
	},
	pagination: true,
};

const HeroSlider = () => {
	// const { data, isLoading, errorMessage } = useFetch("/heroslider/getslider");

	const [sliderData, setSliderData] = useState([]);
	useEffect(() => {
		api.get("/heroslider/getslider")
			.then((res) => {
				setSliderData(res.data);
			})
			.catch((err) => {
				// console.log(err);
			});
	}, []);
	return (
		<div className="hero-slider  space-y--10 max-w-7xl mx-auto">
			<div className="">
				<div className="">
					<div className="">
						<div className="hero-slider-wrapper">
							{!!sliderData.length && (
								<Swiper options={params}>
									{sliderData.map((single) => (
										<SwiperSlide key={single.id}>
											<div
												className="hero-slider-item d-flex bg-img"
												style={{
													backgroundImage: `url(${
														import.meta.env
															.VITE_APP_IMG_URL +
														"/heroslider/" +
														single.image
													})`,
												}}
											>
											</div>
											{/* <div className="container">
													<div className="row">
														<div className="col-12">
															hero slider content
															<div className="hero-slider-content">
																<h2
																	className="hero-slider-content__title space-mb--10"
																	dangerouslySetInnerHTML={{
																		__html: single.title,
																	}}
																></h2>
																<p className="hero-slider-content__text">
																	{
																		single.subtitle
																	}
																</p>
															</div>
														</div>
													</div>
												</div> */}
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

export default HeroSlider;
