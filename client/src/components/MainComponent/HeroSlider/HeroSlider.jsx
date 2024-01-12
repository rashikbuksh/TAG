import useFetch from "../../../hooks/use-fetch";
import { api } from "../../../lib/api";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import Preloader from "../../Preloader/Preloader";
import Swiper, { SwiperSlide } from "../../swiper";

import Axios from "axios";
import React, { useEffect, useState } from "react";

const HeroSlider = ({ sliderData, isAutoPlay = true }) => {
	// const { data, isLoading, errorMessage } = useFetch("/heroslider/getslider");
	const params = {
		loop: true,
		speed: 1000,
		autoplay: isAutoPlay
			? {
					delay: 3500,
					disableOnInteraction: false,
			  }
			: false,
		pagination: true,
	};
	if (window.matchMedia("(min-width: 1024px)").matches) {
		params.slidesPerView = 2;
	}
	return (
		<div className="hero-slider -mx-4  max-w-7xl lg:mx-auto">
			<div className="hero-slider-wrapper">
				{!!sliderData.length && (
					<Swiper options={params}>
						{sliderData.map((single) => (
							<SwiperSlide key={single.id}>
								{/* <div
												className="hero-slider-item flex bg-img"
												style={{
													backgroundImage: `url(${
														import.meta.env
															.VITE_APP_IMG_URL +
														"/heroslider/" +
														single.image
													})`,
												}}
											>
											</div> */}
								<img
									src={
										import.meta.env.VITE_APP_IMG_URL +
										"/heroslider/" +
										single.image
									}
									className="mx-auto h-[216px]  w-full md:w-auto"
									alt=""
								/>
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
	);
};

export default HeroSlider;
