import { useEffect } from "react";
import {
  useGetProductsIdsMutation,
  useGetProductsMutation,
} from "@/services/productsApi";

export const useGetProducts = params => {
  const [getProductsIds, { error: productsIdsError, isLoading: idsLoading }] =
    useGetProductsIdsMutation();
  const [
    getProductsByIds,
    { data: products, isLoading: productsLoading, error: productsError },
  ] = useGetProductsMutation();

  const getProductsByIdsHandler = async () => {
    const { data: productIds } = await getProductsIds(params);
    if (productIds) {
      await getProductsByIds({ ids: productIds });
    }
  };

  const error = productsIdsError || productsError;

  useEffect(() => {
    getProductsByIdsHandler();
  }, [error, params]);

  return { products, idsLoading, productsLoading, error };
};
