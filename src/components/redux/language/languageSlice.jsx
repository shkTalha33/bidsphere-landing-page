// languageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem("language", action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export const getLanguage = (state) => state.language.language;
export default languageSlice.reducer;
