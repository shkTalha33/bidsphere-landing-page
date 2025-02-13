/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import debounce from "debounce";
import axiosInstance from "@/components/api/axiosInstance";

const useFetchProductsAndFilters = (filterQuery, searchQuery) => {
    const [products, setProducts] = useState([]);
    const [filterData, setFilterData] = useState(null);
    const [isLoading, setIsLoading] = useState({ products: false, filters: false });

    const fetchProductsAndFilters = async (query) => {
        setIsLoading({ products: true, filters: true });
        try {
            const [productsResponse, filtersResponse] = await Promise.all([
                axiosInstance.post("products/filter/1", query),
                axiosInstance.post("products/side-filter", query),
            ]);

            if (productsResponse.data.products?.length > 0) {
                setProducts(productsResponse.data.products);
            } else setProducts([]);

            if (filtersResponse.data.success) {
                setFilterData(filtersResponse.data.filter);
            } 
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setIsLoading({ products: false, filters: false });
        }
    };

    // Debounced function
    // const debouncedFetch = useCallback(debounce(fetchProductsAndFilters, 300), []);

    useEffect(() => {
        if (filterQuery) {
            fetchProductsAndFilters(filterQuery);
        }
    }, [filterQuery, searchQuery]);

    return { products, filterData, isLoading };
};

export default useFetchProductsAndFilters;
