import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { genAuthorizedQuery } from "@/utils/genAuthorizedQuery";

export const productsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://api.valantis.store:40000",
    prepareHeaders: headers => {
      headers.set("X-Auth", genAuthorizedQuery());
      return headers;
    },
  }),
  tagTypes: ["Products"],
  endpoints: build => ({
    getProductsIds: build.mutation({
      query: params => ({
        url: "/",
        method: "POST",
        body: {
          action: "get_ids",
          params,
        },
      }),
      transformErrorResponse: responseError => responseError.data,
      transformResponse: response => response.result,
    }),
    getProducts: build.mutation({
      query: params => ({
        url: "/",
        method: "POST",
        body: {
          action: "get_items",
          params,
        },
      }),
      transformErrorResponse: responseError => responseError.data,
      transformResponse: response => {
        const existingIds = [];
        return response.result.filter(product => {
          if (!existingIds.includes(product.id)) {
            existingIds.push(product.id);
            return true;
          }
        });
      },
    }),
    getFields: build.mutation({
      query: () => ({
        url: "/",
        method: "POST",
        body: {
          action: "get_fields",
          params: { field: "price" },
        },
      }),
    }),
    getFilteredProducts: build.mutation({
      query: () => ({
        url: "/",
        method: "POST",
        body: {
          action: "filter",
          params: { price: 17500 },
        },
      }),
      // transformErrorResponse: responseError => responseError.data
    }),
  }),
});

export const {
  useGetFilteredProductsMutation,
  useGetProductsIdsMutation,
  useGetProductsMutation,
  useGetFieldsMutation,
} = productsApi;
