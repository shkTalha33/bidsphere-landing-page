"use client";

/* eslint-disable no-unused-vars */

const OptionsHelpCenter = ({ items, language }) => {
  return (
    <div className="p-md-1 w-full cursor-pointer">
      <div className="shadow-sm mb-2 p-3 border flex flex-col gap-2 rounded-2 w-full">
        <h4
          className={`text-sm md:text-base poppins_medium ${
            language === "ar" ? "text-end" : "text-start"
          }`}
        >
          {items?.title}
        </h4>
        <p
          className={`mb-0 text-xs md:text-sm line-clamp-4 poppins_regular ${
            language === "ar" ? "text-end" : "text-start"
          }`}
        >
          {items?.desc}
        </p>
      </div>
    </div>
  );
};

export default OptionsHelpCenter;
