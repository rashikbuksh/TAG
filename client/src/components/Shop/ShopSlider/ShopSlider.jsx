import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import ShopCart from '../ShopCart/ShopCart';
const ShopSlider = ({shops}) => {
    return (
        <div>
        <div className="p-2">
            <Swiper
                slidesPerView={2.2}
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