import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getFavouriteAuctions, likeAuction } from "../api/ApiRoutesFile";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.castle-auction.com/api/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      const token = localStorage.getItem("auction_user_token");
      if (token) {
        headers.set("x-auth-token", token);
      }
      return headers;
    },
  }),
  tagTypes: ["Products", "Auction", "User", "Bid"],
  endpoints: (builder) => ({
    // Get auctions with pagination - using your original endpoint structure
    getAuctions: builder.query({
      query: ({ endpoint, id, params }) => ({
        url: id ? `${endpoint}/${id}` : endpoint,
        method: "GET",
        params,
      }),
      // Create a unique cache key for each tab type
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { endpoint, params } = queryArgs;
        // Include all params in the cache key to ensure different tabs have different caches
        return `${endpointName}-${endpoint}-${JSON.stringify(params || {})}`;
      },
      // Merge incoming data with existing data for "load more"
      merge: (currentCache, newItems, { arg }) => {
        // If it's the first page, replace everything
        if (arg.id === 1) {
          return newItems;
        }
        // Append new auctions to existing ones
        return {
          ...newItems,
          auctions: [
            ...(currentCache.auctions || []),
            ...(newItems.auctions || []),
          ],
        };
      },
      // Only have one active subscription per endpoint+params set
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.id !== previousArg?.id ||
          currentArg?.endpoint !== previousArg?.endpoint ||
          JSON.stringify(currentArg?.params) !==
            JSON.stringify(previousArg?.params)
        );
      },
      providesTags: (result, error, { params }) => {
        // Create unique tags for each tab type
        const tabType = params?.trending
          ? "trending"
          : params?.popular
          ? "popular"
          : "all";

        return result?.auctions
          ? [
              ...result.auctions.map(({ _id }) => ({
                type: "Auction",
                id: _id,
              })),
              { type: "Auction", id: tabType },
            ]
          : [{ type: "Auction", id: tabType }];
      },
    }),

    // Other endpoints remain the same...
    getAuctionById: builder.query({
      query: (id) => `auctions/${id}`,
      providesTags: (result, error, id) => [{ type: "Auction", id }],
    }),

    createAuction: builder.mutation({
      query: (data) => ({
        url: "auctions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        { type: "Auction", id: "all" },
        { type: "Auction", id: "trending" },
        { type: "Auction", id: "popular" },
      ],
    }),

    updateAuction: builder.mutation({
      query: ({ id, data }) => ({
        url: `auctions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Auction", id },
        { type: "Auction", id: "all" },
        { type: "Auction", id: "trending" },
        { type: "Auction", id: "popular" },
      ],
    }),

    deleteAuction: builder.mutation({
      query: (id) => ({
        url: `auctions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Auction", id: "all" },
        { type: "Auction", id: "trending" },
        { type: "Auction", id: "popular" },
      ],
    }),

    likeAuction: builder.mutation({
      query: (id) => ({
        url: `${likeAuction}${id}`,
        method: "PUT",
      }),
      // Only invalidate the specific auction
      invalidatesTags: (result, error, id) => [{ type: "Auction", id }],

      // Use onQueryStarted to manually update the cache for all three tabs
      onQueryStarted: async (id, { dispatch, queryFulfilled, getState }) => {
        try {
          // Wait for the mutation to complete
          await queryFulfilled;

          // Update auction in all tabs without refetching
          const updateCache = (endpointName, queryParams) => {
            dispatch(
              apiSlice.util.updateQueryData(
                endpointName,
                queryParams,
                (draft) => {
                  if (draft && draft.auctions) {
                    const auctionIndex = draft.auctions.findIndex(
                      (auction) => auction._id === id
                    );

                    if (auctionIndex !== -1) {
                      // Toggle the likes status
                      const auction = draft.auctions[auctionIndex];
                      auction.likes = !auction.likes;
                    }
                  }
                }
              )
            );
          };

          // Update "all" auctions tab
          updateCache("getAuctions", {
            endpoint: "auctions",
            id: 1,
            params: {},
          });

          // Update "trending" auctions tab
          updateCache("getAuctions", {
            endpoint: "auctions",
            id: 1,
            params: { trending: true },
          });

          // Update "popular" auctions tab
          updateCache("getAuctions", {
            endpoint: "auctions",
            id: 1,
            params: { popular: true },
          });
        } catch (err) {
          // Error handling is already done in your component with the optimistic update
        }
      },
    }),
    getFavoriteAuctions: builder.query({
      query: (page = 1) => `${getFavouriteAuctions}${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg }) => {
        // If it's the first page, replace everything
        if (arg === 1) {
          return newItems;
        }
        // Append new auctions to existing ones
        return {
          ...newItems,
          auctions: [
            ...(currentCache.auctions || []),
            ...(newItems.auctions || []),
          ],
        };
      },
      // Only refetch when page number changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result) =>
        result?.auctions
          ? [
              ...result.auctions.map(({ _id }) => ({
                type: "Favorites",
                id: _id,
              })),
              { type: "Favorites", id: "LIST" },
            ]
          : [{ type: "Favorites", id: "LIST" }],
    }),
    toggleFavoriteAuction: builder.mutation({
      query: (id) => ({
        url: `${likeAuction}${id}`,
        method: "PUT",
      }),
      // Only invalidate the specific auction in the favorites list
      invalidatesTags: (result, error, id) => [
        { type: "Favorites", id },
        { type: "Favorites", id: "LIST" },
      ],

      // Handle optimistic updates for the favorites list
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        // Get a reference to the current favorites data
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getFavoriteAuctions", 1, (draft) => {
            if (draft && draft.auctions) {
              // Find and remove the auction (since unliking removes from favorites)
              const index = draft.auctions.findIndex(
                (auction) => auction._id === id
              );
              if (index !== -1) {
                draft.auctions.splice(index, 1);
              }
            }
          })
        );

        try {
          // Wait for the API call to complete
          await queryFulfilled;
        } catch {
          // If the API call fails, revert the optimistic update
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAuctionsQuery,
  useGetAuctionByIdQuery,
  useCreateAuctionMutation,
  useUpdateAuctionMutation,
  useDeleteAuctionMutation,
  useLikeAuctionMutation,
  useGetFavoriteAuctionsQuery,
  useToggleFavoriteAuctionMutation,
} = apiSlice;
