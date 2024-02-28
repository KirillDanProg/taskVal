import s from "./Filter.module.scss";
import { FilterInput } from "./FilterSearchInput/FilterInput";
import { FilterSelect } from "./FilterBrandSelect/FilterSelect";
import { PriceInput } from "./FilterPriceInput/PriceInput";

export function Filter() {
  const onSubmitHandler = e => {
    e.preventDefault();
  };

  return (
    <div className={s.filterContainer}>
      <form onSubmit={onSubmitHandler} className={s.form}>
        <FilterSelect />
        <FilterInput />
        <PriceInput />
      </form>
    </div>
  );
}
