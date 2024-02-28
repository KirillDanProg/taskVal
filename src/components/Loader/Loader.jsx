import s from "./Loader.module.scss";
export function Loader() {
  return (
    <div className={s.loaderContainer}>
      <div className={s.loader}></div>
    </div>
  );
}
