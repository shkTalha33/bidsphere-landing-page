import { createSlice } from "@reduxjs/toolkit";

export const auctionProductSlice = createSlice({
  name: "auctionProduct",
  initialState: {
    auctionProductData: {},
  },
  reducers: {
    setAuctionProduct: (state, action) => {
      state.auctionProductData = action.payload;
    },
  },
});

export const { setAuctionProduct } = auctionProductSlice.actions;

export default auctionProductSlice.reducer;
