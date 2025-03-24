import { baseURL } from "../api/axiosInstance";

const { createApi, fetchBaseQuery } = require("@reduxjs/toolkit/query/react");

export const apiSlice2 = createApi({
  reducerPath: "api2",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      const token = localStorage.getItem("auction_user_token");
      if (token) {
        headers.set("x-auth-token", token);
      }
      return headers;
    },
  }),
  tagTypes: ["Payments"],
  endpoints: (builder) => ({
    payment: builder.query({
      query: ({ endpoint, id, params }) => {
        const url = id ? `${endpoint}${id}` : endpoint;
        return {
          url,
          method: "GET",
          params: params || undefined,
        };
      },
      // Add proper cache invalidation
      providesTags: (result) =>
        result
          ? [
              ...result.applications.map((item) => ({
                type: "Payments",
                id: item?._id,
              })),
              "Payments",
            ]
          : ["Payments"],
    }),
  }),
});

export const { usePaymentQuery } = apiSlice2;
