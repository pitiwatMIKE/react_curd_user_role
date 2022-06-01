import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  value: "",
  errorMessage: "",
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    loading: (state) => {
      state.loading = true;
      state.error = false;
    },
    error: (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    success: (state, action) => {
      state.loading = false;
      state.error = false;
      state.value = action.payload;
    },
    setUseInfo: (state, action) => {
      state.loading = false;
      state.error = false;
      state.errorMessage = "";
      state.value = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("userInfo");
      return { ...initialState };
    },
  },
});

const { loading, error, success } = userInfoSlice.actions;
export const { setUseInfo, logout } = userInfoSlice.actions;

export const register = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axios.post(`/api/users/register`, data);
    localStorage.setItem("userInfo", JSON.stringify(response.data));
    dispatch(success(JSON.parse(localStorage.getItem("userInfo"))));
  } catch (e) {
    dispatch(error(e.response.data.message));
  }
};

export const login = (data) => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(loading());
  try {
    const response = await axios.post(`/api/users/login`, data);
    localStorage.setItem("userInfo", JSON.stringify(response.data));
    dispatch(success(JSON.parse(localStorage.getItem("userInfo"))));
  } catch (e) {
    dispatch(error(e.response.data.message));
  }
};

export const userInfoSelector = (state) => state.userInfo;
export default userInfoSlice.reducer;
