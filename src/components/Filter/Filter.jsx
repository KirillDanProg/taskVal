import s from "./Filter.module.scss";
import { FilterInput } from "./FilterInput/FilterInput";
import { FilterSelect } from "./FilterSelect/FilterSelect";

export function Filter() {
  const onSubmitHandler = e => {
    e.preventDefault();
  };

  return (
    <div className={s.filterContainer}>
      <form onSubmit={onSubmitHandler} className={s.form}>
        <FilterSelect />
        <FilterInput />
      </form>
    </div>
  );
}
