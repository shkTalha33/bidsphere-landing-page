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
      <div className="relative flex items-center justify-evenly">
        <div className="custom-prev bg-[#236A7638] w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer p-1">
          <IoChevronBack className="text-white text-[25px]" />
        </div>
        <Swiper
          spaceBetween={spaceBetween}
          loop={loop}
          navigation={navigation ? { nextEl: ".custom-next", prevEl: ".custom-prev" } : false}
          pagination={pagination}
          modules={[Navigation, Pagination]} // ✅ Use the correct modules
          className="mySwiper mx-3"
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {children}
        </Swiper>
        <div className="custom-next bg-[#236A7638] w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer p-1">
          <IoChevronForward className="text-white text-[25px]" />
        </div>
      </div>
    </section>
  );
};

export default CustomSwiper;
