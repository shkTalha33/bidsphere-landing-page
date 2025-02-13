'use client';

import React, { useState, useEffect } from "react";
import { Collapse, Input } from "reactstrap";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const FilterBrand = ({ brandData }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState(new Set());
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);

  // Sync selected brands with URL parameters on component mount
  useEffect(() => {
    const params = searchParams.get("brand")?.split(",") || [];
    setSelectedBrands(new Set(params));
  }, [searchParams]);

  const updateBrand = (brandId) => {
    const newSelected = new Set(selectedBrands);
    
    if (newSelected.has(brandId)) {
      newSelected.delete(brandId); // Remove if already selected
    } else {
      newSelected.add(brandId); // Add if not selected
    }

    setSelectedBrands(newSelected);

    // Update URL parameters
    const params = new URLSearchParams(searchParams.toString());
    if (newSelected.size > 0) {
      params.set("brand", Array.from(newSelected).join(","));
    } else {
      params.delete("brand");
    }

    // Update the URL without reloading the page
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggleCategory}>
        Brand
      </h3>
      <Collapse isOpen={isCategoryOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-brand-filter">
            {brandData?.map((item, index) => (
              <div
                className="form-check custom-checkbox collection-filter-checkbox ms-2"
                key={index}
              >
                <Input
                  type="checkbox"
                  className="custom-control-input"
                  id={item?.brand?._id}
                  checked={selectedBrands.has(item?.brand?._id)}
                  onChange={() => updateBrand(item?.brand?._id)}
                />
                <label className="custom-control-label" htmlFor={item?.brand?._id}>
                  {item?.brand?.name} ({item?.count})
                </label>
              </div>
            ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default FilterBrand;
