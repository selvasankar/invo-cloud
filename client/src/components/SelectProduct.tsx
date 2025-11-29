// client/src/components/SelectProduct.tsx
import React, { useEffect, useState } from "react";
import { listProducts, Product } from "../lib/api/products";

type Props = {
  value?: string;
  onChange: (sku: string) => void;
};

export default function SelectProduct({ value, onChange }: Props) {
  const [options, setOptions] = useState<Product[]>([]);

  useEffect(() => {
    listProducts().then((res) => {
      const data = res.data ?? res;
      setOptions(data);
    }).catch(() => setOptions([]));
  }, []);

  return (
    <select value={value || ""} onChange={(e) => onChange(e.target.value)} className="border p-2 rounded w-full">
      <option value="">Select product</option>
      {options.map((p) => (
        <option key={p.id} value={p.sku}>
          {p.sku} — {p.name} — ₹{p.price}
        </option>
      ))}
    </select>
  );
}
