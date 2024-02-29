import { useQueryParams } from "@/hooks/useQueryParams";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { useResetFilterValue } from "@/hooks/useResetFilterValue";

export function PriceInput() {
  const { searchParams, setParam, deleteParam } = useQueryParams();
  const price = Number(searchParams.get("price"));
  const [priceValue, setPriceValue] = useState(price);
  const debouncedValue = useDebounce(priceValue, 500);

  useEffect(() => {
    if (!debouncedValue) {
      deleteParam("price");
    } else {
      setParam("price", debouncedValue);
    }
  }, [debouncedValue]);

  useResetFilterValue(price, setPriceValue); // сбрасываем значение инпута если url параметр удален

  const onChangeHandler = e => {
    const value = e.target.value;
    setPriceValue(+value);
  };
  const onFocusHandler = e => {
    if (+e.target.value < 1) {
      e.target.value = "";
    }
  };

  return (
    <div>
      <label>Цена:</label>
      <input
        type="number"
        name="price"
        value={priceValue}
        onChange={onChangeHandler}
        onFocus={onFocusHandler}
        onBlur={e => (e.target.value = price)}
      />
    </div>
  );
}
