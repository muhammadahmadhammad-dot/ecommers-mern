import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
  buyNowItem: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const isExistItem = state.items.find((p) => p._id === item._id);
      if (isExistItem) {
        isExistItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((p) => p._id != action.payload);
    },
    decreaseQuantity(state, action) {
      const productId = action.payload;
      const item = state.items.find((item) => item._id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearCart(state) {
      state.items = [];
    },
    buyNow(state, action) {
      state.buyNowItem = { ...action.payload, quantity: 1 };
    },
    clearBuyNow(state) {
      state.buyNowItem = null;
    },
  },
});

export const {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  buyNow,
  clearBuyNow,
} = cartSlice.actions;

export const totalCartItems = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const totalCartItemsPrice = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export default cartSlice.reducer;
