import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../api/axiosInstance";

export const footerApiSlice = createApi({
  reducerPath: "footerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      const token = localStorage.getItem("auction_portal");
      if (token) {
        headers.set("x-auth-token", token); 
      }
      return headers;
    },
  }),
  tagTypes: ["Footers"],
  endpoints: (builder) => ({
    footers: builder.query({
      query: ({ endpoint, id, params }) => {
        const url = id ? `${endpoint}${id}` : endpoint;
        return {
          url,
          method: "GET",
          params: params || undefined,
        };
      },
      providesTags: (result) =>
        result && result._id
          ? [
              { type: "Footers", id: result._id },
              { type: "Footers", id: "LIST" },
            ]
          : [{ type: "Footers", id: "LIST" }],
    }),
  }),
});

export const { useFootersQuery } = footerApiSlice;
