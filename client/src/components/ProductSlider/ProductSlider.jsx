/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCart from "../ProductCart/ProductCart";

const ProductSlider = ({ products }) => {
	// console.log(products, "products");

	return (
		<div>
			<div className="">
				<Swiper
					slidesPerView={2.1}
					spaceBetween={15}
					grabCursor={true}
					pagination={{
						clickable: true,
					}}
					className="mySwiper"
					breakpoints={{
						// When screen width is greater than or equal to 768px, show 4 slides per view
						768: {
							slidesPerView: 6,
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
