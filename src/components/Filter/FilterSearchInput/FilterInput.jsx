import { useSelector } from "react-redux";
import { useDebounce } from "@/hooks/useDebounce";
import { selectProductQuery } from "@/services/filterProducts/filterSelectors";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import s from "./FilterInput.module.scss";
import { useEffect } from "react";

export function FilterInput() {
  const productQuery = useSelector(selectProductQuery);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(productQuery);
  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!debouncedValue) {
      searchParams.delete("product");
    } else {
      searchParams.set("product", debouncedValue);
    }
    setSearchParams(searchParams);
  }, [debouncedValue]);

  const onChangeHandler = e => {
    const value = e.target.value;
    setSearchValue(value);
  };
  return (
    <div>
      <label>Название товара:</label>
      <input
        name="product"
        value={searchValue}
        onChange={onChangeHandler}
        className={s.searchInput}
      />
    </div>
  );
}
