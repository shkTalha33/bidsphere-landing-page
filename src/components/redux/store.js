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
import { apiSlice2 } from "./apiSlice2";
import { currencySlice } from "./currency";
import { footerApiSlice } from "./footerSlice";
import registerReducer from "./registrationSlice/resgiterSlice";
import stripKeyReducer from "./stripKey/stripKey";
const rootReducer = combineReducers({
  auth: authSlice,
  sidebar: sidebarSlice,
  cart: cartSlice,
  chat: ChatSlice.reducer,
  auctionProduct: auctionProductSlice.reducer,
  auctionRegistration: auctionRegistrationSlice.reducer,
  currency: currencySlice.reducer,
  register: registerReducer,
  stripKey: stripKeyReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [apiSlice2.reducerPath]: apiSlice2.reducer,
  [footerApiSlice.reducerPath]: footerApiSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart", "register", "stripKey"],
  blacklist: [apiSlice.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      apiSlice.middleware,
      apiSlice2.middleware,
      footerApiSlice.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});
export const persistor = persistStore(store);
