import axios from 'axios';
import { createApi } from '@reduxjs/toolkit/query/react';

// Create Axios instance
const axiosBaseQuery =
    ({ baseUrl }) =>
        async ({ url, method, data, params }) => {
            try {
                const token = localStorage.getItem("setofshops_user_token");
                const headers = token
                    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "accept-language": 'ar' }
                    : { "Content-Type": "application/json", "accept-language": 'ar' };
                const result = await axios({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers,
                });

                return { data: result.data };
            } catch (axiosError) {
                if (axiosError.response) {
                    console.log("Error Message:", axiosError.response.data.message);
                } else {
                    console.log(
                        `API URL==> ${baseUrl + url} Error==> ${axiosError.message}`
                    );
                }

                const err = axiosError.response
                    ? { status: axiosError.response.status, data: axiosError.response.data }
                    : axiosError;

                return { error: err };
            }
        };

export const apiSlice2 = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({
        baseUrl: 'https://setofshopsbackend.onrender.com/',
    }),
    tagTypes: ['Products', 'Shops', 'User', 'Auth', 'Category', 'SubCategory', 'MainMenu', 'Compaigns', 'Favorite', 'Stripe', 'Paypal', 'Shops', 'Order', 'Brand', 'Influencer', 'AssignProducts', 'Campaigns'],
    endpoints: (builder) => ({
        get: builder.query({
            query: ({ endpoint, params }) => ({
                url: endpoint,
                method: 'GET',
                params: params // Add params support here
            }),
            providesTags: (result, error, { tag }) => (tag ? [tag] : []),
        }),
        getById: builder.query({
            query: ({ endpoint, id, params }) => ({
                url: `${endpoint}/${id}`,
                method: 'GET',
                params: params // Add params support here
            }),
            providesTags: (result, error, { tag }) => (tag ? [tag] : []),
        }),
        post: builder.mutation({
            query: ({ endpoint, data, params }) => ({
                url: endpoint,
                method: 'POST',
                data,
                params: params // Add params support here
            }),
            invalidatesTags: (result, error, { tag }) => (tag ? [tag] : []),
        }),
        put: builder.mutation({
            query: ({ endpoint, id, updatedData, params }) => ({
                url: `${endpoint}/${id}`,
                method: 'PUT',
                data: updatedData,
                params: params // Add params support here
            }),
            invalidatesTags: (result, error, { tag }) => (tag ? [tag] : []),
        }),
        delete: builder.mutation({
            query: ({ endpoint, id, params }) => ({
                url: `${endpoint}/${id}`,
                method: 'DELETE',
                params: params // Add params support here
            }),
            invalidatesTags: (result, error, { tag }) => (tag ? [tag] : []),
        }),
    }),
});


// Upload File Function
export const uploadFile = async ({ data }) => {
    const token = localStorage.getItem("setofshops_user_token");
    try {
        const res = await axios.post(`https://setofshopsbackend.onrender.com/api/uploads/file`, data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return res?.data
    } catch (error) {
        console.log(error, "error");
        throw error;
    }
};

export const {
    useGetQuery,
    useGetByIdQuery,
    usePostMutation,
    usePutMutation,
    useDeleteMutation,
} = apiSlice2;