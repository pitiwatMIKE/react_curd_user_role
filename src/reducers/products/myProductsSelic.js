import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "../users/userInfoSlice";

const initialState = {
  loading: false,
  error: false,
  errrorMessage: "",
  value: [],
};

const myProdutsSlice = createSlice({
  name: "myProducts",
  initialState,
  reducers: {
    loading: (state) => {
      return { ...initialState, loading: true };
    },
    error: (state, action) => {
      return { ...initialState, error: true, errrorMessage: action.payload };
    },
    success: (state, actoin) => {
      return { ...initialState, value: actoin.payload };
    },
  },
});

const { loading, error, success } = myProdutsSlice.actions;

export const getMyProducts =
  () =>
  async (dispatch) => {
    const { token } = await JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    dispatch(loading());
    try {
      const response = await axios.get("/api/products/myproducts", config);
      dispatch(success(response.data));
    } catch (e) {
      if (e.response.status === 401) {
        dispatch(logout());
      }
      dispatch(error(e.response.data.message));
    }
  };

export const myProductsSelector = (state) => state.myProducts;

export default myProdutsSlice.reducer;
