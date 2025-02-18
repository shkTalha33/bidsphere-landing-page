import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from "./apiSlice";
import authSlice from "./loginForm";
import { apiSlice2 } from "./apiSlice2";
import sidebarSlice from "./sidebarRedux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "./cart";
import { ChatSlice } from './chat-message';
import { auctionRegistrationSlice } from './auctionRegistration';


const rootReducer = combineReducers({
  auth: authSlice,
  sidebar: sidebarSlice,
  cart: cartSlice,
  chat: ChatSlice.reducer,
  auctionRegistration : auctionRegistrationSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [apiSlice2.reducerPath]: apiSlice2.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['auth', 'cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables serializable state invariant middleware
    }).concat(apiSlice2.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);