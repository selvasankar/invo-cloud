import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCustomers } from "../api/customers.api";
import { getProducts } from "../api/products.api";
import { createInvoice } from "../api/incoices.api";
import AddCustomerModal from "./AddCustomerModal";
import Button from "../components/Button";
import Input from "../components/Input";
import useModal from "../hooks/useModal";
import handleError from "../utils/handleError";

export default function AddInvoice() {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const addCustomerModal = useModal();

  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([...items, { product_id: 0, quantity: 1, price: 0 }]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const loadData = async () => {
    setCustomers(await getCustomers());
    setProducts(await getProducts());
  };

  useEffect(() => {
    loadData();
  }, []);

  const total = items.reduce(
    (t, i) => t + (Number(i.quantity) * Number(i.price || 0)),
    0
  );

  const onSubmit = async (data) => {
    try {
      await createInvoice({ ...data, items });
      alert("Invoice Created!");
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Create Invoice</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between mb-4">
          <label className="font-medium">Customer</label>
          <Button onClick={addCustomerModal.open}>Add Customer</Button>
        </div>

        <select {...register("customer_id")} className="border p-2 rounded w-full mb-4">
          <option value="">Select Customer</option>
          {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <Input label="Invoice Date" type="date" name="invoice_date" register={register} errors={errors} />

        <h2 className="font-semibold mt-6 mb-2">Items</h2>

        {items.map((item, idx) => (
          <div key={idx} className="border p-3 rounded mb-4">
            <select
              value={item.product_id}
              onChange={(e) => updateItem(idx, "product_id", Number(e.target.value))}
              className="border p-2 rounded w-full mb-2"
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            <Input
              label="Quantity"
              name={`qty_${idx}`}
              register={() => {}}
              errors={{}}
              type="number"
              min="1"
              onChange={(e) => updateItem(idx, "quantity", Number(e.target.value))}
            />

            <Input
              label="Price"
              name={`price_${idx}`}
              register={() => {}}
              errors={{}}
              type="number"
              min="0"
              onChange={(e) => updateItem(idx, "price", Number(e.target.value))}
            />
          </div>
        ))}

        <Button className="w-full mb-4" onClick={addItem} type="button">
          + Add Item
        </Button>

        <h3 className="text-lg font-semibold mb-4">Total: ₹{total}</h3>

        <Button type="submit" className="w-full">Create Invoice</Button>
      </form>

      <AddCustomerModal
        isOpen={addCustomerModal.isOpen}
        onClose={addCustomerModal.close}
        onSuccess={loadData}
      />
    </div>
  );
}
