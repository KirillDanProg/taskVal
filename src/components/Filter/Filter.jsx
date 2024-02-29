import s from "./Filter.module.scss";
import { FilterInput } from "./FilterSearchInput/FilterInput";
import { FilterSelect } from "./FilterBrandSelect/FilterSelect";
import { PriceInput } from "./FilterPriceInput/PriceInput";
import React from "react";

export const Filter = React.memo(() => {
  return (
    <div className={s.filterContainer}>
      <FilterSelect />
      <FilterInput />
      <PriceInput />
    </div>
  );
});

Filter.displayName = "Filter";
