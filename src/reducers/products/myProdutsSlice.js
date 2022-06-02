import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { authHeaderConfig } from "../../utils/authHeaderConfig";

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

export const getMyProducts =
  ({ page }) =>
  async (dispatch) => {
    const { config, logoutWithStatus } = authHeaderConfig(dispatch);
    const currentPage = page ? `page=${page}` : "";
    dispatch(loading());
    try {
      const response = await axios.get(
        `/api/products/myproducts?${currentPage}`,
        config
      );
      dispatch(success(response.data));
    } catch (e) {
      logoutWithStatus(e.response.status, 401);
      dispatch(error(e.response.data.message));
    }
  };

export const deleteMyProduct = (id) => async (dispatch, getState) => {
  const { config, logoutWithStatus } = authHeaderConfig(dispatch);
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
    logoutWithStatus(e.response.status, 401);
    dispatch(error(e.response.data.message));
  }
};

export const createMyProduct =
  (product, navigate) => async (dispatch, getState) => {
    const { config, logoutWithStatus } = authHeaderConfig(dispatch);
    config.headers["Content-Type"] = "multipart/form-data";

    dispatch(loading());
    try {
      await axios.post("/api/products/create", product, config);
      dispatch(
        success({
          value: getState().myProducts.value,
          message: "Creaet Product Success",
        })
      );
      navigate("/dashboard/myproducts");
    } catch (e) {
      logoutWithStatus(e.response.status, 401);
      dispatch(error(e.response.data.message));
    }
  };

export const updateMyProduct =
  (id, product, navigate) => async (dispatch, getState) => {
    const { config, logoutWithStatus } = authHeaderConfig(dispatch);
    config.headers["Content-Type"] = "multipart/form-data";

    dispatch(loading());
    try {
      await axios.put(`/api/products/${id}/updatemyproduct`, product, config);
      dispatch(
        success({
          value: getState().myProducts.value,
          message: "Update Product Success",
        })
      );
      navigate("/dashboard/myproducts");
    } catch (e) {
      logoutWithStatus(e.response.status, 401);
      dispatch(error(e.response.data.message));
    }
  };

export const myProductsSelector = (state) => state.myProducts;
export default myProdutsSlice.reducer;
