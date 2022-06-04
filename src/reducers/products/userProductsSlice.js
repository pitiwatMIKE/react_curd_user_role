import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { authHeaderConfig } from "../../utils/authHeaderConfig";

const initialState = {
  loading: false,
  error: false,
  errorMessage: "",
  value: [],
};

const userProductsSlice = createSlice({
  name: "userProducts",
  initialState,
  reducers: {
    loading: (state) => {
      return { ...state, loading: false, error: false };
    },
    error: (state, action) => {
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: action.payload,
      };
    },
    success: (state, action) => {
      return { ...state, loading: false, error: false, value: action.payload };
    },
  },
});

const { loading, error, success } = userProductsSlice.actions;

export const getUserProducts =
  ({ userId, page }) =>
  async (dispatch) => {
    const { config, logoutWithStatus } = authHeaderConfig(dispatch);
    const currentPage = page ? `page=${page}` : "";
    dispatch(loading());
    try {
      const response = await axios.get(
        `/api/products/${userId}/getuserproducts?${currentPage}`,
        config
      );
      dispatch(success(response.data));
    } catch (e) {
      logoutWithStatus(e.response.status, 401);
      logoutWithStatus(e.response.status, 403);
      dispatch(error(e.response.data.message));
    }
  };

export const updateUserProducts =
  (id, data, navigate) => async (dispatch, getState) => {
    const { config, logoutWithStatus } = authHeaderConfig(dispatch);
    config.headers["Content-Type"] = "multipart/form-data";
    
    dispatch(loading());
    try {
      await axios.put(`/api/products/${id}/update`, data, config);
      dispatch(success(getState().userProducts.value));
      navigate(-1);
    } catch (e) {
      logoutWithStatus(e.response.status, 401);
      logoutWithStatus(e.response.status, 402);
      dispatch(e.reponse.data.message);
    }
  };

export const deleteUserProducts = (id) => async (dispatch, getState) => {
  const { config, logoutWithStatus } = authHeaderConfig(dispatch);
  dispatch(loading());
  try {
    await axios.delete(`/api/products/${id}/delete`, config);
    const { userProducts, maxPage } = getState().userProducts.value;
    const newUserProducts = userProducts.filter((item) => item.id !== id);
    dispatch(success({ userProducts: newUserProducts, maxPage }));
  } catch (e) {
    logoutWithStatus(e.response.state, 401);
    logoutWithStatus(e.response.state, 403);
    dispatch(error(e.response.data.message));
  }
};
export const userProductsSelector = (state) => state.userProducts;
export default userProductsSlice.reducer;
