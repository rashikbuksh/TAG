
import { Swiper, SwiperSlide } from "swiper/react";
import ShopCart from "../ShopCart/ShopCart";

const ShopSlider = ({ shops }) => {
	return (
		<div>
			<div className="p-2">
				<Swiper
					slidesPerView={2.2}
				
					grabCursor={true}
					pagination={{
						clickable: true,
					}}
					className="mySwiper"
					breakpoints={{
                        260: {
							slidesPerView: 1.5,
							spaceBetween: 20,
						},
						320: {
							slidesPerView: 1.5,
							spaceBetween: 20,
						},
                        360: {
							slidesPerView: 2.5,
							spaceBetween: 20,
						},
                        410: {
							slidesPerView: 2.2,
							spaceBetween: 20,
						},
                        510: {
							slidesPerView: 2.5,
							spaceBetween: 20,
						},

						640: {
							slidesPerView: 3.2,
							spaceBetween: 20,
						},
						768: {
							slidesPerView: 4.1,
							spaceBetween: 30,
						},
						1024: {
							slidesPerView: 6.2,
							spaceBetween: 40,
						},
					}}
				>
					{shops &&
						shops.map((shop, index) => (
							<SwiperSlide key={index}>
								<ShopCart
									shop={shop}
									// shopper_id={product.shopper_id}
								></ShopCart>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</div>
	);
};

export default ShopSlider;
