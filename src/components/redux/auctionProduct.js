import { createSlice } from "@reduxjs/toolkit";

export const auctionProductSlice = createSlice({
  name: "auctionProduct",
  initialState: {
    auctionProductData: [],
    allAuctions: [],
    favirouteAuctions: [],
    auctionLot: {},
  },
  reducers: {
    setAuctionProduct: (state, action) => {
      state.auctionProductData = action.payload;
    },
    setAllAuctions: (state, action) => {
      state.allAuctions = [...state.allAuctions, ...action.payload];
    },
    setTrendingAuctions: (state, action) => {
      state.auctionProductData = action.payload;
    },
    setPopularAuctions: (state, action) => {
      state.auctionProductData = action.payload;
    },
    setFavouriteAuctions: (state, action) => {
      state.favirouteAuctions = action.payload;
    },
    setAuctionLot: (state, action) => {
      state.auctionLot = action.payload;
    },
  },
});

export const {
  setAuctionProduct,
  setAuctionLot,
  setAllAuctions,
  setFavouriteAuctions,
  setPopularAuctions,
  setTrendingAuctions,
} = auctionProductSlice.actions;

export default auctionProductSlice.reducer;
