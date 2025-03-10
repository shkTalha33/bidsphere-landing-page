import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "./cart";
import { ChatSlice } from "./chat-message";
import authSlice from "./loginForm";
import sidebarSlice from "./sidebarRedux";
import { auctionProductSlice } from "./auctionProduct";
import { auctionRegistrationSlice } from "./auctionRegistration";
import { apiSlice } from "./apiSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  sidebar: sidebarSlice,
  cart: cartSlice,
  chat: ChatSlice.reducer,
  auctionProduct: auctionProductSlice.reducer,
  auctionRegistration: auctionRegistrationSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"],
  blacklist: [apiSlice.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
export const persistor = persistStore(store);
