import s from "./Products.module.scss";
export function Product({ productItem }) {
  const { id, price, brand, product } = productItem;
  return (
    <div className={s.card} key={id}>
      <div className={s.cardInfo}>
        <p className={s.textTitle}>ID: {id}</p>
        <p className={s.textBody}>Брэнд: {brand ?? "Отсутствует"}</p>
        <p className={s.textTitle}>
          Название товара: <br />
          {product}
        </p>
      </div>
      <div className={s.cardFooter}>
        <span className={s.textTitle}>Цена: {price}</span>
      </div>
    </div>
  );
}
