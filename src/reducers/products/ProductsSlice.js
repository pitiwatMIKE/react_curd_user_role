import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  value: [],
};

export const getProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, search }) => {
    try {
      const currentPage = page ? `page=${page}` : "";
      const keyword = search ? `search=${search}` : "";

      const response = await axios.get(
        `/api/products?${currentPage}&${keyword}`
      );

      return response.data;
    } catch (e) {
      throw new Error(e.message);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.value = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.value = action.error.message;
      });
  },
});

export const productsSelector = (state) => state.products;
export default productsSlice.reducer;
