import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keysObject: {}, // Object to store the keys
};

const stripKeySlice = createSlice({
  name: "stripKey",
  initialState,
  reducers: {
    // Action to save the object with keys
    setKeysObject: (state, action) => {
      state.keysObject = { ...action.payload }; // Merge the new object
    },

    // Action to get the object (optional if you need a selector)
    getKeysObject: (state) => {
      return state.keysObject; // Simply return the keys object
    },

    // Action to reset the object
    resetKeysObject: (state) => {
      state.keysObject = {}; // Reset to an empty object
    },
  },
});

export const { setKeysObject, getKeysObject, resetKeysObject } = stripKeySlice.actions;

// Selector to access the keys object from the store
export const selectKeysObject = (state) => state.stripKey.keysObject;

export default stripKeySlice.reducer;
