import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useResetFilterValue } from "@/hooks/useResetFilterValue";

export function FilterInput() {
  const { searchParams, setParam, deleteParam } = useQueryParams();
  const productQuery = searchParams.get("product") || "";
  const [searchValue, setSearchValue] = useState(productQuery);
  const debouncedValue = useDebounce(searchValue, 800);

  useResetFilterValue(productQuery, setSearchValue); //reset input value if url param deleted

  useEffect(() => {
    if (!debouncedValue) {
      deleteParam("product");
    } else {
      setParam("product", debouncedValue.trim());
    }
  }, [debouncedValue]);

  const onChangeHandler = e => {
    const value = e.target.value;
    if (value.trim() || value === "") {
      setSearchValue(value);
    }
  };

  return (
    <div>
      <label>Название товара:</label>
      <input
        name="product"
        value={searchValue}
        onChange={onChangeHandler}
        placeholder="Введите название..."
        autoComplete="off"
      />
    </div>
  );
}
