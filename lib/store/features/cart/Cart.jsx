import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (e) {
    console.warn("Could not load cart from localStorage", e);
    return [];
  }
};

// Save cart to localStorage
const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem("cart", serializedCart);
  } catch (e) {
    console.warn("Could not save cart to localStorage", e);
  }
};

const initialState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      console.log("Item added to cart:", action.payload);
      console.log("Current cart state:", state.items);
      saveCartToLocalStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.collection_id !== action.payload.collection_id
      );
      console.log("Item removed from cart:", action.payload);
      console.log("Current cart state:", state.items);
      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      console.log("Cart cleared");
      saveCartToLocalStorage(state.items);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
