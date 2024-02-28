import { useEffect } from "react";
import {
  setOffset,
  setProductQuery,
  setBrand,
  setPrice,
} from "@/services/filterProducts/filterSlice";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

export const useSetFilteres = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const offset = Number(searchParams.get("offset"));
  const price = Number(searchParams.get("price"));
  const product = searchParams.get("product") || "";
  const brand = searchParams.get("brand") || "";

  useEffect(() => {
    dispatch(setOffset(offset));
  }, [offset, dispatch]);

  useEffect(() => {
    dispatch(setProductQuery(product));
  }, [product, dispatch]);

  useEffect(() => {
    dispatch(setBrand(brand));
  }, [brand, dispatch]);

  useEffect(() => {
    dispatch(setPrice(price));
  }, [price, dispatch]);
};
