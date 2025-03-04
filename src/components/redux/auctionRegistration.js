import { createSlice } from "@reduxjs/toolkit";

export const auctionRegistrationSlice = createSlice({
  name: "auctionRegistration",
  initialState: {
    auctionRegistrationData: {},
  },
  reducers: {
    setAuctionRegistrationData: (state, action) => {
        state.auctionRegistrationData = {...state.auctionRegistrationData, ...action.payload}
      },
  },
});

export const {
    setAuctionRegistrationData
} = auctionRegistrationSlice.actions;

export default auctionRegistrationSlice.reducer;