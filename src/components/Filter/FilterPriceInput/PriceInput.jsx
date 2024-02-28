import { useSelector } from "react-redux";
import { selectPrice } from "@/services/filterProducts/filterSelectors";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect } from "react";
import s from "./PriceInput.module.scss";

export function PriceInput() {
  const price = useSelector(selectPrice);
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceValue, setPriceValue] = useState(price);
  const debouncedValue = useDebounce(priceValue, 500);

  useEffect(() => {
    if (!debouncedValue) {
      searchParams.delete("price");
    } else {
      searchParams.set("price", debouncedValue);
    }
    setSearchParams(searchParams);
  }, [debouncedValue]);

  const onChangeHandler = e => {
    const value = e.target.value;
    setPriceValue(value);
  };
  return (
    <div className={s.priceInput}>
      <label>Цена:</label>
      <input type="number" name="price" value={priceValue} onChange={onChangeHandler} />
    </div>
  );
}
