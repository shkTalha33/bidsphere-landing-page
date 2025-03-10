import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://auctionhousebackend.onrender.com/api/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      const token = localStorage.getItem("auction_user_token");
      if (token) {
        headers.set("x-auth-token", token);
      }
      return headers;
    },
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    request: builder.query({
      query: ({ endpoint, id, params, headers }) => ({
        url: id ? `${endpoint}/${id}` : endpoint,
        method: "GET",
        params,
        headers,
      }),
      providesTags: (result, error, { tag }) => (tag ? [tag] : []),
    }),
    mutate: builder.mutation({
      query: ({ endpoint, id, method, data, params, headers }) => ({
        url: id ? `${endpoint}/${id}` : endpoint,
        method,
        body: data,
        params,
        headers,
      }),
      invalidatesTags: (result, error, { tag }) => (tag ? [tag] : []),
    }),
  }),
});

export const { useRequestQuery, useMutateMutation } = apiSlice;
