import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/Cart";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
};
