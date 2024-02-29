import { useEffect } from "react";

export const useResetFilterValue = (filter, setFunction) => {
  useEffect(() => {
    if (!filter) {
      setFunction(filter);
    }
  }, [filter]);
};
