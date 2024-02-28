import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetFieldsMutation } from "@/services/productsApi";

export function FilterSelect() {
  const [fields, setFields] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [getFields] = useGetFieldsMutation();
  useEffect(() => {
    (async () => {
      const { data: brands } = await getFields({ field: "brand" });
      const filteredBrands = [...new Set(brands?.filter(value => value !== null))];
      setFields(filteredBrands);
    })();
  }, []);

  const onBrandChange = e => {
    const value = e.target.value;
    if (!value) {
      searchParams.delete("brand");
    } else {
      searchParams.set("brand", value);
    }
    setSearchParams(searchParams);
  };

  return (
    <div>
      <label htmlFor="brands">Брэнды:</label>
      <select onChange={onBrandChange} name="brands" id="brands">
        <option value="">Все</option>
        {fields.map(brand => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
    </div>
  );
}
