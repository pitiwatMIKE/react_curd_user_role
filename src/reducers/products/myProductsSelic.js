import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "../users/userInfoSlice";

const initialState = {
  loading: false,
  error: false,
  errorMessage: "",
  value: [],
};

const myProdutsSlice = createSlice({
  name: "myProducts",
  initialState,
  reducers: {
    loading: (state) => {
      return { ...state, loading: true, error: false };
    },
    error: (state, action) => {
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      };
    },
    success: (state, actoin) => {
      return { ...state, loading: false, error: false, value: actoin.payload };
    },
  },
});

const { loading, error, success } = myProdutsSlice.actions;

const authHeaderConfig = (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: {
      Authorization: "Bearer " + userInfo?.token,
    },
  };
  const logoutWithStatus401 = (errorStatus = false) =>
    errorStatus === 401 ? dispatch(logout()) : false; 
  return { config, logoutWithStatus401 };
};

export const getMyProducts =
  ({ page }) =>
  async (dispatch) => {
    const { config, logoutWithStatus401 } = authHeaderConfig(dispatch);
    const currentPage = page ? `page=${page}` : "";
    dispatch(loading());
    try {
      const response = await axios.get(
        `/api/products/myproducts?${currentPage}`,
        config
      );
      dispatch(success(response.data));
    } catch (e) {
      logoutWithStatus401(e.response.status);
      dispatch(error(e.response.data.message));
    }
  };

export const deleteMyProduct = (id) => async (dispatch, getState) => {
  const { config, logoutWithStatus401 } = authHeaderConfig(dispatch);
  dispatch(loading());
  try {
    const response = await axios.delete(
      `/api/products/${id}/deletemyproduct`,
      config
    );
    let { myProducts, maxPage } = getState().myProducts.value;
    let newMyProducts = myProducts.filter((item) => item.id !== id);
    dispatch(
      success({ myProducts: newMyProducts, maxPage, message: response.data })
    );
  } catch (e) {
    logoutWithStatus401(e.response.status);
    dispatch(error(e.response.data.message));
  }
};

export const myProductsSelector = (state) => state.myProducts;
export default myProdutsSlice.reducer;
