import s from "./Products.module.scss";
import { Product } from "./Product";
import { memo } from "react";
import { Loader } from "@/components/Loader/Loader";

export const Products = memo(({ isLoading, products }) => {
  const mappedProducts = products?.map(product => {
    return <Product key={product.id} productItem={product} />;
  });
  const isProductsReady = products && products?.length > 0;
  return (
    <div className={s.productsContainer}>
      {isLoading ? <Loader /> : isProductsReady ? mappedProducts : "Не найдено"}
    </div>
  );
});

Products.displayName = "Products";
