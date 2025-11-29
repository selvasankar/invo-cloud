// client/src/components/SelectCustomer.tsx
import React, { useEffect, useState } from "react";
import { listCustomers } from "../lib/api/customers";
import { Customer } from "../lib/api/customers";

type Props = {
  value?: string;
  onChange: (id: string) => void;
  placeholder?: string;
};

export default function SelectCustomer({ value, onChange, placeholder = "Select customer" }: Props) {
  const [options, setOptions] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    listCustomers()
      .then((res) => {
        // res might be paginated: prefer res.data
        const data = res.data ?? res;
        setOptions(data);
      })
      .catch(() => setOptions([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded w-full"
      aria-label="customer-select"
    >
      <option value="">{loading ? "Loading..." : placeholder}</option>
      {options.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name} {c.email ? `(${c.email})` : ""}
        </option>
      ))}
    </select>
  );
}
