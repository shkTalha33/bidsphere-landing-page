"use client"; // Add this at the top if using Next.js App Router

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules"; // ✅ Correct way to import Swiper modules
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const CustomSwiper = ({
  spaceBetween = 30, // ✅ Change to a number (not a string)
  pagination = true,
  loop = true,
  navigation = true,
  children,
}) => {
  return (
    <section>
      <div className="relative flex items-center main_swiper justify-evenly">
        <Swiper
          spaceBetween={spaceBetween}
          loop={loop}
          navigation={
            navigation
              ? { nextEl: ".custom-next", prevEl: ".custom-prev" }
              : false
          }
          pagination={pagination}
          modules={[Navigation, Pagination]}
          className="mySwiper mx-2"
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          // style={{ padding: "30px" }}
        >
          {children}
        </Swiper>
      </div>
      <div className="flex items-center justify-end mr-4 gap-2 md:gap-3 my-2 md:my-[26px]">
        <div className="custom-prev bg_primary w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center cursor-pointer">
          <IoChevronBack className="text-white text-4 md:text-6" />
        </div>
        <div className="custom-next bg_primary w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center cursor-pointer p-1">
          <IoChevronForward className="text-white text-4 md:text-6" />
        </div>
      </div>
    </section>
  );
};

export default CustomSwiper;
