import axios from "axios";

import { createApi } from "@reduxjs/toolkit/query/react";

// Create Axios instance
const axiosBaseQuery =
  ({ baseUrl }) =>
    async ({ url, method, data, params }) => {
      try {
        const token = localStorage.getItem("token"); // Get token from AsyncStorage
        const headers = token
          ? { "x-auth-token": token, "Content-Type": "application/json" }
          : { "Content-Type": "application/json" };

        const result = await axios({
          url: baseUrl + url,
          method,
          data,
          params,
          headers,
        });

        return { data: result.data };
      } catch (axiosError) {
        // Log the URL and the error message
        // console.log(Error with URL: ${baseUrl + url});
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

// RTK Query API Slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_APP_BASEURL,
  }),
  tagTypes: ["Products", "Shops", "Auth"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: "/auth", method: "GET" }),
      providesTags: ["auth"],
      keepUnusedDataFor: 60, // Cache data for 60 seconds after last use
      refetchOnMountOrArgChange: true, // Refetch data on mount
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/auth/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 60, // Cache data for 60 seconds after last use
      refetchOnMountOrArgChange: true, // Refetch data on mount
    }),
    postUser: builder.mutation({
      query: ({ data, endpoint }) => ({
        url: endpoint,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, updatedData, endpoint }) => ({
        url: `${endpoint}/${id}`,
        method: "PUT",
        data: updatedData,
      }),
      invalidatesTags: ["Auth"],
    }),
    deleteProduct: builder.mutation({
      query: ({ id, updatedData, endpoint }) => ({
        url: `${endpoint}/${id}`,
        method: "DELETE",
        data: updatedData,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

// Export hooks
export const {
  useGetProductsQuery,
  useGetProductQuery,
  usePostUserMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = apiSlice;
