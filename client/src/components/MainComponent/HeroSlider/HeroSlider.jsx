import React from "react";
import { Link } from "react-router-dom";
import Swiper, { SwiperSlide } from "../../swiper";

const HeroSlider = ({ sliderData, isAutoPlay = true }) => {
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
								<Link
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/search/" +
										single.title
									}
								>
									<img
										src={
											import.meta.env.VITE_APP_IMG_URL +
											"/heroslider/" +
											single.image
										}
										className="mx-auto h-[216px] w-full md:w-auto"
										alt=""
									/>
								
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
				)}
			</div>
		</div>
	);
};

export default HeroSlider;
