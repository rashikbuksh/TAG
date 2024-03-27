/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCart from "../ProductCart/ProductCart";

const ProductSlider = ({ products }) => {
	return (
		<div>
			<div className="p-1">
				<Swiper
					slidesPerView={2.2}
					spaceBetween={15}
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
							slidesPerView: 2,
							spaceBetween: 15,
						},
                        410: {
							slidesPerView: 2,
							spaceBetween: 20,
						},

						640: {
							slidesPerView: 2.5,
							spaceBetween: 20,
						},
						768: {
							slidesPerView: 4,
							spaceBetween: 30,
						},
						1024: {
							slidesPerView: 5,
							spaceBetween: 40,
						},
					}}
				>
					{products &&
						products.map((product, index) => (
							<SwiperSlide key={index}>
								<ProductCart
									product={product}
									shopper_id={product.shopper_id}
								></ProductCart>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</div>
	);
};

export default ProductSlider;
