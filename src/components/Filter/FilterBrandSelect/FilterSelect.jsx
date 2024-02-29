import { useState, useEffect } from "react";
import { useGetFieldsMutation } from "@/services/productsApi";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useResetFilterValue } from "@/hooks/useResetFilterValue";

export function FilterSelect() {
  const [getFields] = useGetFieldsMutation();
  const { searchParams, setParam, deleteParam } = useQueryParams();
  const brand = searchParams.get("brand") || "";
  const [brandValue, setBrandValue] = useState(brand);
  const [fields, setFields] = useState([]);

  useResetFilterValue(brand, setBrandValue); //reset select value if url param deleted

  useEffect(() => {
    (async () => {
      const { data: brands } = await getFields({ field: "brand" });
      const filteredBrands = [...new Set(brands?.filter(value => value !== null))];
      setFields(filteredBrands);
    })();
  }, []); //getting all brands for select

  const onBrandChange = e => {
    const value = e.target.value;
    setBrandValue(value);
    if (value === "Все") {
      deleteParam("brand");
    } else {
      setParam("brand", value);
    }
  };

  return (
    <div>
      <label htmlFor="brands">Брэнды:</label>
      <select value={brandValue} onChange={onBrandChange} name="brands" id="brands">
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
