import { useEffect } from "react";
import { useGetEntitiesByActionMutation } from "@/services/productsApi";

export const useGetProducts = offset => {
  const [getEntities, { data, error, isLoading, originalArgs }] = useGetEntitiesByActionMutation();
  const isProducts = originalArgs?.action === "get_items";

  useEffect(() => {
    const getProductsByIdsHandler = async () => {
      const { data: productIds } = await getEntities({
        action: "get_ids",
        params: {
          offset,
          limit: 50,
        },
      });
      if (productIds) {
        await getEntities({
          action: "get_items",
          params: {
            ids: productIds,
          },
        });
      }
    };
    getProductsByIdsHandler();
  }, [offset, error]);

  return { data: isProducts ? data : undefined, isLoading, error };
};
