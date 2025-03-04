import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "./cart";
import { ChatSlice } from './chat-message';
import authSlice from "./loginForm";
import sidebarSlice from "./sidebarRedux";
import { auctionProductSlice } from './auctionProduct';
import { auctionRegistrationSlice } from './auctionRegistration';


const rootReducer = combineReducers({
  auth: authSlice,
  sidebar: sidebarSlice,
  cart: cartSlice,
  chat: ChatSlice.reducer,
  auctionProduct: auctionProductSlice.reducer,
  auctionRegistration: auctionRegistrationSlice.reducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['auth', 'cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);