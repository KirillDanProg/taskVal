import { useSearchParams } from "react-router-dom";

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParam = (key, value) => {
    deleteAll();
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };
  const deleteParam = key => {
    searchParams.delete(key);
    setSearchParams(searchParams);
  };

  const deleteAll = () => {
    const paramKeys = [...searchParams.keys()];
    paramKeys.forEach(p => searchParams.delete(p));
    setSearchParams(searchParams);
  };

  return { searchParams, setParam, deleteParam };
};
