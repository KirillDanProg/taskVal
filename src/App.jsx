import { Products } from "@/components/Products/Products";
import { Pagination } from "@/components/Pagination/Pagination";
import { Filter } from "@/components/Filter/Filter";

export function App() {
  return (
    <div className="app">
      <Filter />
      <Products />
      <Pagination />
    </div>
  );
}
