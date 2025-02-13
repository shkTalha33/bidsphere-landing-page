'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Collapse, Input } from "reactstrap";

const FilterCategory = ({ data }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);

  // Sync local state with URL params on initial load
  useEffect(() => {
    const params = searchParams.get("category")?.split(",") || [];
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
      params.set("category", Array.from(newSelected).join(","));
    } else {
      params.delete("category");
    }

    // Push updated query params without reloading the page
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggleCategory}>
        Category
      </h3>
      <Collapse isOpen={isCategoryOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-brand-filter">
            {data?.map((item, index) => (
              <div
                className="form-check custom-checkbox collection-filter-checkbox ms-2"
                key={index}
              >
                <Input
                  type="checkbox"
                  className="custom-control-input"
                  id={item?.category?._id}
                  checked={selectedCategories.has(item?.category?._id)}
                  onChange={() => updateCategory(item?.category?._id)}
                />
                <label
                  className="custom-control-label"
                  htmlFor={item?.category?._id}
                >
                  {item?.category?.name} ({item?.count})
                </label>
              </div>
            ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default FilterCategory;
