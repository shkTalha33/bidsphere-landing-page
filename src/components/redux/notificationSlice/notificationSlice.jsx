// redux/notificationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: 0,
  messageUnseen: 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setMessageUnseen: (state, action) => {
      state.messageUnseen = action.payload;
    },
    incrementNotification: (state) => {
      state.notifications += 1;
    },
    incrementMessageUnseen: (state) => {
      state.messageUnseen += 1;
    },
    decrementMessageUnseen: (state, action) => {
      state.messageUnseen -= action.payload;
      if (state.messageUnseen < 0) state.messageUnseen = 0;
    },
    resetNotification: (state) => {
      state.notifications = 0;
    },
    resetMessageUnseen: (state) => {
      state.messageUnseen = 0;
    },
  },
});

export const {
  setNotifications,
  setMessageUnseen,
  incrementNotification,
  incrementMessageUnseen,
  decrementMessageUnseen,
  resetNotification,
  resetMessageUnseen,
} = notificationSlice.actions;
export const getNotifications = (state) => state.notification.notifications;
export const getMessageUnseen = (state) => state.notification.messageUnseen;


export default notificationSlice.reducer;
