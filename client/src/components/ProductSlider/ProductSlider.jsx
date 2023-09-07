/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCart from "../ProductCart/ProductCart";

const ProductSlider = ({ products }) => {
  console.log(products, "products");

  return (
    <div>
      <div className="">
        <Swiper
          slidesPerView={1.6}
          spaceBetween={10}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
          breakpoints={{
            // When screen width is greater than or equal to 768px, show 4 slides per view
            768: {
              slidesPerView: 4,
            },
          }}
        >
          {products &&
            products.map((product, index) => (
              <SwiperSlide key={index}>
                <ProductCart product={product}></ProductCart>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSlider;
