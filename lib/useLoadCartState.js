// hooks/useLoadCartState.js

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCartState } from "./store/features/cart/Cart";

const useLoadCartState = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadState = () => {
      try {
        const serializedState = localStorage.getItem("cart");
        if (serializedState !== null) {
          const state = JSON.parse(serializedState);
          dispatch(setCartState(state));
        }
      } catch (err) {
        console.error("Could not load cart state", err);
      }
    };

    loadState();
  }, [dispatch]);
};

export default useLoadCartState;
