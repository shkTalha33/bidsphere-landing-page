import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  activeStep: "personal", // Initial step
  progress: 0 // Initial progress value
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterData: (state, action) => {
      state.data = { ...state.data, ...action.payload }; // Merge new data with existing data
    },

    setsliceProgress: (state, action) => {
      state.progress += action.payload; // Ensure the addition is happening
    },
    
    setActiveStep: (state, action) => {
      state.activeStep = action.payload; // Store the active step
    },

    clearRegisterData: (state) => {
      state.data = {}; // Reset form data
      state.activeStep = "personal"; // Reset active step
      state.progress = 0; // Reset progress
    },
  },
});

export const {
  setRegisterData,
  setActiveStep,
  clearRegisterData,
  setsliceProgress,
} = registerSlice.actions;

export const selectRegisterData = (state) => state.register.data;
export const selectActiveStep = (state) => state.register.activeStep;
export const selectProgress = (state) => state.register.progress;

export default registerSlice.reducer;
