import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartDetail: [],
  },
  reducers: {
    setCartDetail: (state, action) => {
      state.cartDetail = action.payload;
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.cartDetail?.findIndex(
        (item) => item?.productId === newItem?.productId
      );
      if (existingItemIndex === -1) {
        state.cartDetail?.push(newItem);
      } else {
        state.cartDetail[existingItemIndex] = newItem
      }
    },

    updateCartItem: (state, action) => {
      const { product, updatedItem } = action.payload;
      const itemIndex = state.cartDetail?.findIndex(
        (item) => item?.productId === product
      );
      if (itemIndex !== -1) {
        state.cartDetail[itemIndex] = updatedItem;
      }
    },

    removeItemFromCart: (state, action) => {
      const { product } = action.payload;
      state.cartDetail = state.cartDetail?.filter(
        (item) => item?.productId !== product
      );
    },

    incrementItemQuantity: (state, action) => {
      const { product } = action.payload;
      const item = state.cartDetail?.find((item) => item?.productId === product);
      if (item && item.quantity < item.totalQuantity) {
        item.quantity += 1;
        item.totalPrice = item.quantity * (item.price || 0); // Automatically update the total price
      }
    },
    
    decrementItemQuantity: (state, action) => {
      const { product } = action.payload;
      const item = state.cartDetail?.find((item) => item?.productId === product);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * (item.price || 0); // Automatically update the total price
      }
    },
    

  },
});

export const {
  addToCart,
  updateCartItem,
  removeItemFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
  setCartDetail
} = cartSlice.actions;

export default cartSlice.reducer;