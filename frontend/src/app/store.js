import { configureStore } from "@reduxjs/toolkit";
import authReducer  from "../feature/auth/authSlice.js";
import cartReducer  from "../feature/cart/cartSlice.js";

export const store = configureStore({
  reducer: {
    auth:authReducer,
    cart:cartReducer
  },
});
