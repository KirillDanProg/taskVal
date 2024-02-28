import s from "./Products.module.scss";
import { Product } from "./Product";

import { Loader } from "@/components/Loader/Loader";

export function Products({ isLoading, products }) {
  const mappedProducts = products?.map(product => {
    return <Product key={product.id} productItem={product} />;
  });
  const isProductsReady = products && products?.length > 0;
  return (
    <div className={s.productsContainer}>
      {isLoading ? <Loader /> : isProductsReady ? mappedProducts : "Не найдено"}
    </div>
  );
}
