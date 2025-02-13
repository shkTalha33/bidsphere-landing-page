import axiosInstance from "./axiosInstance";



export const allCategories = async (page, search_query, status) => {
    const params = new URLSearchParams();

    if (page) params.append("page", page);
    if (search_query) params.append("search_query", search_query);
    if (status) params.append("status", status);
    try {
        const res = await axiosInstance.get(`category/search`, {
            params: params,
        });
        return res;
    } catch (error) {
        console.log(error, "error");
    }
};
export const allSubMainCategories = async (catId) => {
    try {
        const res = await axiosInstance.get(`sub_main_category/${catId}/all`);
        return res;
    } catch (error) {
        console.log(error, "error");
    }
};
export const allSubCategories = async (sub_cat_id) => {
    try {
        const res = await axiosInstance.get(`subcategory/${sub_cat_id}/all`);
        return res;
    } catch (error) {
        console.log(error, "error");
    }
};




export const updateProductStatus = async (id, data) => {
    try {
        const res = await axiosInstance.put(`products/${id}/admin/update-status`, data);
        return res;
    } catch (error) {
        console.log(error, "error");
    }
};