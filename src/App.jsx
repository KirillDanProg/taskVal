import { Products } from "@/components/Products/Products";
import { Pagination } from "@/components/Pagination/Pagination";
import { Filter } from "@/components/Filter/Filter";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useSetFilteres } from "@/hooks/useSetFilteres";

export function App() {
  useSetFilteres();

  const { data, isLoading } = useGetProducts();

  return (
    <div className="app">
      <h1 className="title">TaskTestValantis</h1>
      <Filter />
      <Products products={data} isLoading={isLoading} />
      <Pagination isMore={data?.length > 40} isLoading={isLoading} />
    </div>
  );
}
