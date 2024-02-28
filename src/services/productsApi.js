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
    getEntitiesByAction: build.mutation({
      query: ({ action, params }) => ({
        url: "/",
        method: "POST",
        body: {
          action,
          params,
        },
      }),
      transformErrorResponse: responseError => responseError.data,
      transformResponse: (response, meta, args) => {
        if (args.action === "get_ids") {
          return [...new Set(response.result)];
        }
        if (args.action === "get_items") {
          const existingIds = [];
          return response.result.filter(product => {
            if (!existingIds.includes(product.id)) {
              existingIds.push(product.id);
              return true;
            }
            return null;
          });
        }
        return response.result;
      },
    }),
    getFields: build.mutation({
      query: params => ({
        url: "/",
        method: "POST",
        body: {
          action: "get_fields",
          params,
        },
      }),
      transformResponse: response => response.result,
    }),
  }),
});

export const { useGetEntitiesByActionMutation, useGetFieldsMutation } = productsApi;
