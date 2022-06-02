import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { authHeaderConfig } from "../../utils/authHeaderConfig";

const initialState = {
  loading: false,
  error: false,
  errorMessage: "",
  value: [],
};

const userSlice = createSlice({
  name: "users",
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
    success: (state, action) => {
      return { ...state, loading: false, error: false, value: action.payload };
    },
  },
});

const { loading, error, success } = userSlice.actions;

export const getUsers = () => async (dispatch) => {
  const { config, logoutWithStatus } = authHeaderConfig(dispatch);
  dispatch(loading());
  try {
    const response = await axios.get("/api/users", config);
    dispatch(success(response.data));
  } catch (e) {
    logoutWithStatus(e.response.status, 401);
    logoutWithStatus(e.response.status, 403);
    dispatch(error(e.response.data.message));
  }
};
export const userSelector = (state) => state.users;
export default userSlice.reducer;
