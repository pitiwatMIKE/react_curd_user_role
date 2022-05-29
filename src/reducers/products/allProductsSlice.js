import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  value: [],
};

export const getAllProducts = createAsyncThunk(
  "allProduct/fetchAllproducts",
  async () => {
    try {
      const response = await axios.get("/api/products");
      return response.data;
    } catch (e) {
      throw new Error(e.message);
    }
  }
);

export const allProductsSlice = createSlice({
  name: "allProducts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.value = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
        state.value = action.error.message;
      });
  },
});

export const allProductsSelector = (state) => state.allProducts;
export default allProductsSlice.reducer;
