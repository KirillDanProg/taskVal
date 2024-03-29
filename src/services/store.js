import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsApi";
import { filterSlice } from "./filterProducts/filterSlice";
import { errorHandlingMiddleware } from "@/utils/errorHandlingMiddleware";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [filterSlice.name]: filterSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(productsApi.middleware).concat(errorHandlingMiddleware),
});
