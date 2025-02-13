'use client';

import React, { useState, useEffect } from "react";
import { Collapse, Input } from "reactstrap";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const FilterSubMainCategory = ({ mainCategoryData }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);

  // Sync state with URL params on initial load
  useEffect(() => {
    const params = searchParams.get("mainCat")?.split(",") || [];
    setSelectedCategories(new Set(params));
  }, [searchParams]);

  const updateCategory = (categoryId) => {
    const newSelected = new Set(selectedCategories);
    
    if (newSelected.has(categoryId)) {
      newSelected.delete(categoryId); // Remove if already selected
    } else {
      newSelected.add(categoryId); // Add if not selected
    }

    setSelectedCategories(newSelected);

    // Update URL params
    const params = new URLSearchParams(searchParams.toString());
    if (newSelected.size > 0) {
      params.set("mainCat", Array.from(newSelected).join(","));
    } else {
      params.delete("mainCat");
    }

    // Push updated query params without reloading the page
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggleCategory}>
        Sub-Main Category
      </h3>
      <Collapse isOpen={isCategoryOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-brand-filter">
            {mainCategoryData?.map((item, index) => (
              <div
                className="form-check custom-checkbox collection-filter-checkbox ms-2"
                key={index}
              >
                <Input
                  type="checkbox"
                  className="custom-control-input"
                  id={item?.subCategoryL1?._id}
                  checked={selectedCategories.has(item?.subCategoryL1?._id)}
                  onChange={() => updateCategory(item?.subCategoryL1?._id)}
                />
                <label
                  className="custom-control-label"
                  htmlFor={item?.subCategoryL1?._id}
                >
                  {item?.subCategoryL1?.name} ({item?.count})
                </label>
              </div>
            ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default FilterSubMainCategory;
