import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { selectOffset } from "@/services/filterProducts/filterSelectors";
import ArrowRight from "@/assets/icons/arrow-right.svg?react";
import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import s from "./Pagination.module.scss";

export function Pagination({ isLoading }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const offset = useSelector(selectOffset);

  const setOffsetHandler = value => {
    searchParams.set("offset", value);
    setSearchParams(searchParams);
  };

  const disabled = offset === 0 || isLoading;

  return (
    <div className={`${s.pagination} ${disabled ? s.disabled : ""}`}>
      <button
        disabled={disabled}
        onClick={() => setOffsetHandler(+offset - 50)}
        className={s.arrowBack}
      >
        <ArrowLeft />
      </button>
      <button disabled={isLoading} onClick={() => setOffsetHandler(+offset + 50)}>
        <ArrowRight />
      </button>
    </div>
  );
}
