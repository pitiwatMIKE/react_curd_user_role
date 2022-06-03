import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import productsReducer from "./reducers/products/ProductsSlice";
import userInfoReducer from "./reducers/users/userInfoSlice";
import myProductsReducer from "./reducers/products/myProdutsSlice";
import userReducer from "./reducers/users/userSllice";
import userProductsReducer from "./reducers/products/userProductsSlice";
// export const store = configureStore({
//   reducer: {
//     products: productsReducer,
//     userInfo: userInfoReducer,
//     myProducts: myProductsReducer,
//   },
// });

// update from above code
// https://stackoverflow.com/questions/59061161/how-to-reset-state-of-redux-store-when-using-configurestore-from-reduxjs-toolki
// How to reset state of Redux Store when Logout
const combinedReducer = combineReducers({
  products: productsReducer,
  userInfo: userInfoReducer,
  myProducts: myProductsReducer,
  users: userReducer,
  userProducts: userProductsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "userInfo/logout") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
});
