'use client';

import React, { useState, useEffect } from "react";
import { Collapse, Input } from "reactstrap";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const FilterSubCategory = ({ subCategoryData }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [selectedSubCategories, setSelectedSubCategories] = useState(new Set());
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);

  // Sync state with URL params on initial load
  useEffect(() => {
    const params = searchParams.get("subCat")?.split(",") || [];
    setSelectedSubCategories(new Set(params));
  }, [searchParams]);

  const updateSubCategory = (subCategoryId) => {
    const newSelected = new Set(selectedSubCategories);
    
    if (newSelected.has(subCategoryId)) {
      newSelected.delete(subCategoryId); // Remove if already selected
    } else {
      newSelected.add(subCategoryId); // Add if not selected
    }

    setSelectedSubCategories(newSelected);

    // Update URL params
    const params = new URLSearchParams(searchParams.toString());
    if (newSelected.size > 0) {
      params.set("subCat", Array.from(newSelected).join(","));
    } else {
      params.delete("subCat");
    }

    // Push updated query params without reloading the page
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggleCategory}>
        Sub Category
      </h3>
      <Collapse isOpen={isCategoryOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-brand-filter">
            {subCategoryData?.map((item, index) => (
              <div
                className="form-check custom-checkbox collection-filter-checkbox ms-2"
                key={index}
              >
                <Input
                  type="checkbox"
                  className="custom-control-input"
                  id={item?.subCategoryL2?._id}
                  checked={selectedSubCategories.has(item?.subCategoryL2?._id)}
                  onChange={() => updateSubCategory(item?.subCategoryL2?._id)}
                />
                <label
                  className="custom-control-label"
                  htmlFor={item?.subCategoryL2?._id}
                >
                  {item?.subCategoryL2?.name} ({item?.count})
                </label>
              </div>
            ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default FilterSubCategory;
