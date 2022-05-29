import { configureStore } from "@reduxjs/toolkit";
import allProductsReducer from "./reducers/products/allProductsSlice";

export const store = configureStore({
  reducer: {
    allProducts: allProductsReducer,
  },
});
