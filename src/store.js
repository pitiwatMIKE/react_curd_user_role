import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/products/ProductsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
