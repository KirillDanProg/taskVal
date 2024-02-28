import { useEffect } from "react";
import { useGetEntitiesByActionMutation } from "@/services/productsApi";
import { useSelector } from "react-redux";
import { selectParams } from "@/services/filterProducts/filterSelectors";

export const useGetProducts = () => {
  const { limit, offset, ...filterParams } = useSelector(selectParams);
  const [getEntities, { data, error, isLoading, originalArgs }] = useGetEntitiesByActionMutation();
  const isProducts = originalArgs?.action === "get_items";

  useEffect(() => {
    const getProductsByIdsHandler = async () => {
      let params = { offset, limit };
      let action = "get_ids";

      const paramsEntries = Object.entries(filterParams).filter(([key]) => filterParams[key]);
      if (paramsEntries.length) {
        params = Object.fromEntries(paramsEntries);
        action = "filter";
      }
      const { data: productIds } = await getEntities({
        action,
        params,
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
  }, [error, offset, ...Object.values(filterParams)]);

  return { data: isProducts ? data : undefined, isLoading, error };
};
