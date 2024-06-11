// features/cart/cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      items: [],
      totalQuantity: 0,
      totalAmount: 0,
    };
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const initialState = loadState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      console.log("state===>", state, "Action ====>", action);
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          quantity: 1,
          price: newItem.price,
          total: newItem.price,
          image: newItem.image,
        });
        state.totalQuantity++;
        state.totalAmount += newItem.price;
      } else {
        existingItem.quantity++;
        existingItem.total += newItem.price;
        state.totalAmount += newItem.price;
      }
      saveState(state);
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
          state.totalQuantity--;
          state.totalAmount -= existingItem.price;
        } else {
          existingItem.quantity--;
          existingItem.total -= existingItem.price;
          state.totalAmount -= existingItem.price;
        }
      }
      saveState(state);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
