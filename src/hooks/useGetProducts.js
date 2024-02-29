import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetEntitiesByActionMutation } from "@/services/productsApi";
import { selectParams } from "@/services/filterProducts/filterSelectors";

export const useGetProducts = () => {
  const [getEntities, { data, error, isLoading, originalArgs }] = useGetEntitiesByActionMutation();
  const { limit, offset, ...filterParams } = useSelector(selectParams);
  const dependencies = Object.values(filterParams); //deps to trigger effect if url params changed
  const isProducts = originalArgs?.action === "get_items"; //isProducts flag need to return data only when items received

  useEffect(() => {
    (async () => {
      let params = { offset, limit };
      let action = "get_ids";

      const paramsEntries = Object.entries(filterParams).filter(([key]) => filterParams[key]);
      if (paramsEntries.length) {
        params = Object.fromEntries(paramsEntries);
        action = "filter";
      } // reasign action and params if there is an url param

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
    })();
  }, [error, offset, ...dependencies]);

  return { data: isProducts ? data : undefined, isLoading, error };
};
