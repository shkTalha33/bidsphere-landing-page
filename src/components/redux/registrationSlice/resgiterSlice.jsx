import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  activeStep: "personal",
  progress: 0,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },

    setsliceProgress: (state, action) => {
      state.progress += action.payload;
    },

    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },

    clearRegisterData: (state) => {
      state.data = {};
      state.activeStep = "personal";
      state.progress = 0;
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
