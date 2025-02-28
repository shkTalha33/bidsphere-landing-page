import { createSlice } from "@reduxjs/toolkit";

export const auctionProductSlice = createSlice({
  name: "auctionProduct",
  initialState: {
    auctionProductData: {},
    auctionLot:{}
  },
  reducers: {
    setAuctionProduct: (state, action) => {
      state.auctionProductData = action.payload;
    },
    setAuctionLot: (state, action) => {
      state.auctionLot = action.payload;
    },
  },
});

export const { setAuctionProduct, setAuctionLot } = auctionProductSlice.actions;

export default auctionProductSlice.reducer;
