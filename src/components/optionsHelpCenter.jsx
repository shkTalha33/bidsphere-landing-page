"use client";

/* eslint-disable no-unused-vars */

const OptionsHelpCenter = ({ items }) => {
  return (
    <div className="p-md-1 w-full cursor-pointer">
      <div className="shadow-sm mb-2 p-3 border flex flex-col gap-2 rounded-2 w-full">
        <h4 className="lg:text-[16px] poppins_semibold">{items?.title}</h4>
        <p className="mb-0 text-[15px] line-clamp-4 poppins_regular">
          {items?.desc}
        </p>
      </div>
    </div>
  );
};

export default OptionsHelpCenter;
