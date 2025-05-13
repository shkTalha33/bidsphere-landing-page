import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getFavouriteAuctions, likeAuction } from "../api/ApiFile";
import { baseURL } from "../api/axiosInstance";
import { handleError } from "../api/errorHandler";

export const apiSlice = createApi({
  reducerPath: "api",
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
  tagTypes: ["Products", "Auction", "User", "Bid", "Favorites"],
  endpoints: (builder) => ({
    // Get auctions with pagination - using your original endpoint structure
    getAuctions: builder.query({
      query: ({ endpoint, id, params }) => ({
        url: id ? `${endpoint}/${id}` : endpoint,
        method: "GET",
        params: { ...params },
      }),
      // Create a unique cache key for each tab type
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { endpoint, params, filterVersion } = queryArgs;
        // Include all params plus the filterVersion in the cache key
        return `${endpointName}-${endpoint}-${
          filterVersion || ""
        }-${JSON.stringify(params || {})}`;
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
        { type: "Favorites", id: "LIST" },
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
        { type: "Favorites", id: "LIST" },
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
        { type: "Favorites", id: "LIST" },
      ],
    }),

    likeAuction: builder.mutation({
      query: (id) => ({
        url: `${likeAuction}${id}`,
        method: "PUT",
      }),
      // Only invalidate the specific auction
      invalidatesTags: (result, error, id) => [
        { type: "Auction", id },
        { type: "Favorites", id: "LIST" }, // Added to invalidate favorites when liking/unliking
      ],

      // Use onQueryStarted to manually update the cache for all tabs
      onQueryStarted: async (id, { dispatch, queryFulfilled, getState }) => {
        try {
          const { data } = await queryFulfilled;
          // Determine if this was a like or unlike action based on response
          // Assuming your API returns the updated auction with the likes status
          const isLiked = data?.likes || false;

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
                      // Update the likes status based on the response
                      const auction = draft.auctions[auctionIndex];
                      auction.likes = isLiked;
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

          // Update favorites cache based on whether it was liked or unliked
          if (isLiked) {
            // If liked, add to favorites if not already there
            dispatch(
              apiSlice.util.updateQueryData(
                "getFavoriteAuctions",
                1,
                (draft) => {
                  // Only proceed if we have draft data
                  if (draft && draft.auctions) {
                    // Check if auction already exists in favorites
                    const existingIndex = draft.auctions.findIndex(
                      (auction) => auction._id === id
                    );

                    // If not in favorites, fetch the auction details and add it
                    if (existingIndex === -1) {
                      // Find the auction in one of the other caches
                      const state = getState();
                      const allAuctionsCache =
                        apiSlice.endpoints.getAuctions.select({
                          endpoint: "auctions",
                          id: 1,
                          params: {},
                        })(state);

                      if (allAuctionsCache.data) {
                        const auction = allAuctionsCache.data.auctions.find(
                          (a) => a._id === id
                        );

                        if (auction) {
                          // Add to favorites with likes set to true
                          const auctionToAdd = { ...auction, likes: true };
                          draft.auctions.unshift(auctionToAdd);
                        }
                      }
                    }
                  }
                }
              )
            );
          } else {
            // If unliked, remove from favorites
            dispatch(
              apiSlice.util.updateQueryData(
                "getFavoriteAuctions",
                1,
                (draft) => {
                  if (draft && draft.auctions) {
                    const index = draft.auctions.findIndex(
                      (auction) => auction._id === id
                    );
                    if (index !== -1) {
                      draft.auctions.splice(index, 1);
                    }
                  }
                }
              )
            );
          }
        } catch (err) {
          handleError(err);
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
      // Invalidate both Favorites and the specific auction
      invalidatesTags: (result, error, id) => [
        { type: "Favorites", id },
        { type: "Favorites", id: "LIST" },
        { type: "Auction", id }, // Also invalidate this specific auction everywhere
      ],

      // Handle optimistic updates for both favorites and regular auction views
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        // Update the Favorites list optimistically
        const favoritesPatchResult = dispatch(
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

        // Also update auctions in all tabs optimistically
        const updateAuctionTab = (params) => {
          return dispatch(
            apiSlice.util.updateQueryData(
              "getAuctions",
              {
                endpoint: "auctions",
                id: 1,
                params,
              },
              (draft) => {
                if (draft && draft.auctions) {
                  const auctionIndex = draft.auctions.findIndex(
                    (auction) => auction._id === id
                  );

                  if (auctionIndex !== -1) {
                    // Update the likes status to false (unliked)
                    const auction = draft.auctions[auctionIndex];
                    auction.likes = false;
                  }
                }
              }
            )
          );
        };

        // Update all three tabs
        const allPatchResult = updateAuctionTab({});
        const trendingPatchResult = updateAuctionTab({ trending: true });
        const popularPatchResult = updateAuctionTab({ popular: true });

        try {
          // Wait for the API call to complete
          await queryFulfilled;
        } catch {
          // If the API call fails, revert all optimistic updates
          favoritesPatchResult.undo();
          allPatchResult.undo();
          trendingPatchResult.undo();
          popularPatchResult.undo();
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
