'use client'
import React, { Fragment } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import ProductCard from './product-card';
import { useGetQuery } from '../redux/apiSlice2';
import { ProductCardSkeleton } from './productCardSkeleton';
const ProductSwiper = () => {

  const { data: products, isLoading: isLoadingPosts, error: postsError } = useGetQuery({
    endpoint: "api/products",
    category: 'Products',
  });

  return (
    <div className='home-slider-1 prod-slider'>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        modules={[Navigation, Autoplay]}

        navigation={{ enabled: false }}
        breakpoints={{
          640: {
            navigation: { enabled: true },
          },
        }}
        className="p-slide"
      >
        {isLoadingPosts
          ? Array.from({ length: 8 }).map((_, index) => (
            <SwiperSlide key={index}>
              <ProductCardSkeleton />
            </SwiperSlide>
          ))
          : products?.products?.map((item, index) => (
            <SwiperSlide key={index}>
              <ProductCard data={item} />
            </SwiperSlide>
          ))}
      </Swiper>

    </div>
  )
}

export default ProductSwiper