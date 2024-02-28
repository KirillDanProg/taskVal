import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  initialState: {
    params: {
      offset: 0,
      limit: 50,
      product: "",
      brand: "",
      price: 0,
    },
  },
  name: "filter",
  reducers: {
    resetFilters: state => {
      state.params = {
        offset: 0,
        limit: 50,
        product: "",
        brand: undefined,
        price: undefined,
      };
    },
    setOffset: (state, action) => {
      state.params.offset = action.payload;
    },
    setProductQuery: (state, action) => {
      state.params.product = action.payload;
    },
    setBrand: (state, action) => {
      state.params.brand = action.payload;
    },
    setPrice: (state, action) => {
      state.params.price = action.payload;
    },
  },
});

export const { setBrand, setOffset, setPrice, setProductQuery, resetFilters } = filterSlice.actions;
