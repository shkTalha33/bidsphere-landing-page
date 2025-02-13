import React, { useEffect, useState } from "react";
import FilterCategory from "./FilterCategory";
import FilterSubMainCategory from "./FilterSubMainCategory";
import FilterSubCategory from "./filterSubCategory";
import FilterBrand from "./FilterBrand";
import SizeFilter from "./SizeFilter";
import GenderFilter from "./GenderFilter";

const AllFilterPages = ({ filterData }) => {
 
  return (
    <>
      {/* {filterData ? */}
        <div className="collection-filter-block cutsmbor00">
          <FilterCategory data={filterData?.category} />
          <FilterSubMainCategory
            mainCategoryData={filterData?.subMainCategory}
          />
          <FilterSubCategory subCategoryData={filterData?.subCategory} />
          <GenderFilter genderData={filterData?.gender} />
          <FilterBrand brandData={filterData?.brand} />
          <SizeFilter />
        </div>
    </>
  );
};

export default AllFilterPages;
