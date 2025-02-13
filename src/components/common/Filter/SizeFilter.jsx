'use client';

import React, { useState, useEffect, useMemo } from "react";
import { Collapse } from "reactstrap";
import { Slider } from "antd";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import debounce from "debounce";

const PriceFilter = ({ defaultMin = 0, defaultMax = 5000 }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [priceRange, setPriceRange] = useState([defaultMin, defaultMax]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggle = () => setIsOpen(!isOpen);

  const currentRange = useMemo(() => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    return [
      minPrice ? Number(minPrice) : defaultMin,
      maxPrice ? Number(maxPrice) : defaultMax,
    ];
  }, [searchParams, defaultMin, defaultMax]);

  useEffect(() => {
    setPriceRange(currentRange);
  }, [currentRange]);

  const updatePriceRange = debounce((minPrice, maxPrice) => {
    const params = new URLSearchParams(searchParams.toString());

    if (minPrice === defaultMin && maxPrice === defaultMax) {
      params.delete("minPrice");
      params.delete("maxPrice");
    } else {
      params.set("minPrice", minPrice.toString());
      params.set("maxPrice", maxPrice.toString());
    }

    router.push(`${pathname}?${params.toString()}`);
  }, 300); // Debounce with 300ms delay

  const onAfterChange = (value) => {
    setPriceRange(value);
    updatePriceRange(value[0], value[1]);
  };

  return (
    <div className="collection-collapse-block border-0 open">
      <h3 className="collapse-block-title" onClick={toggle}>
        Price
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-size-filter product-detail">
            <h6 className="mb-3 text-sm popins_medium text-[#777]">
              ${priceRange[0]} - ${priceRange[1]}
            </h6>
            <Slider
              min={defaultMin}
              max={defaultMax}
              range
              value={priceRange}
              onChange={setPriceRange}
              onAfterChange={onAfterChange}
              className="price-slider"
            />
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default PriceFilter;
