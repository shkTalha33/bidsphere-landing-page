'use client';

import React, { useState, useEffect } from "react";
import { Collapse, Input } from "reactstrap";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const GenderFilter = ({ genderData }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [selectedGenders, setSelectedGenders] = useState(new Set());
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);

  // Sync state with URL params on initial load
  useEffect(() => {
    const params = searchParams.get("gender")?.split(",") || [];
    setSelectedGenders(new Set(params));
  }, [searchParams]);

  const updateCategory = (gender) => {
    const newSelected = new Set(selectedGenders);
    
    if (newSelected.has(gender)) {
      newSelected.delete(gender); // Remove if already selected
    } else {
      newSelected.add(gender); // Add if not selected
    }

    setSelectedGenders(newSelected);

    // Update URL params
    const params = new URLSearchParams(searchParams.toString());
    if (newSelected.size > 0) {
      params.set("gender", Array.from(newSelected).join(","));
    } else {
      params.delete("gender");
    }

    // Push updated query params without reloading the page
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggleCategory}>
        Gender
      </h3>
      <Collapse isOpen={isCategoryOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-brand-filter">
            {genderData?.map((item, index) => (
              <div
                className="form-check custom-checkbox collection-filter-checkbox ms-2"
                key={index}
              >
                <Input
                  type="checkbox"
                  className="custom-control-input"
                  id={item.gender}
                  checked={selectedGenders.has(item.gender)}
                  onChange={() => updateCategory(item.gender)}
                />
                <label className="custom-control-label" htmlFor={item.gender}>
                  {item.gender} ({item.count})
                </label>
              </div>
            ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default GenderFilter;
