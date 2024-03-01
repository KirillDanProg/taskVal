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
      async queryFn({ action, params }, queryApi, extraOptions, baseQuery) {
        const offset = params.offset;
        if (action === "filter") {
          delete params.offset; // delete offset from arg before "filter" request
        }
        const { data, error } = await baseQuery({
          url: "/",
          method: "POST",
          body: { action, params },
        });
        if (error) {
          return { error: error.data };
        }
        let result = data?.result;
        if (action === "filter" && result.length > 50) {
          result = [...new Set(result.slice(offset, offset + 50))]; // Implemented custom pagination with limit cause server doesn't support limit for filter action
        }
        if (action === "get_ids") {
          result = [...new Set(result)];
        }
        if (action === "get_items") {
          const existingIds = [];
          result = result.filter(product => {
            if (!existingIds.includes(product.id)) {
              existingIds.push(product.id);
              return true;
            }
            return null;
          }); // transform response: skiped items with id duplicates
        }
        return { data: result };
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
      transformErrorResponse: responseError => responseError.data,
      transformResponse: response => response.result,
    }),
  }),
});

export const { useGetEntitiesByActionMutation, useGetFieldsMutation } = productsApi;
