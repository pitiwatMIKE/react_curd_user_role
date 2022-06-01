import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/products/ProductsSlice";
import userInfoREducer from "./reducers/users/userInfoSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    userInfo: userInfoREducer,
  },
});
