// client/src/components/InvoiceForm.tsx
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectCustomer from "./SelectCustomer";
import SelectProduct from "./SelectProduct";
import { createInvoice } from "../lib/api/invoices";
import { useToast } from "./ToastProvider";

const ItemSchema = z.object({
  sku: z.string().min(1),
  qty: z.number().min(1),
  price: z.number().min(0),
  description: z.string().optional(),
  tax_rate: z.number().optional(),
});

const InvoiceSchema = z.object({
  invoice_number: z.string().min(1),
  customer_id: z.string().min(1),
  invoice_date: z.string().min(10),
  due_date: z.string().optional(),
  items: z.array(ItemSchema).min(1),
  notes: z.string().optional(),
});

type InvoiceFormValues = z.infer<typeof InvoiceSchema>;

export default function InvoiceForm({ onCreated }: { onCreated?: (x: any) => void }) {
  const toast = useToast();
  const { register, control, handleSubmit, setValue, watch, reset } = useForm<InvoiceFormValues>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      invoice_number: `INV-${Date.now()}`,
      invoice_date: new Date().toISOString().slice(0, 10),
      items: [{ sku: "", qty: 1, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({ name: "items", control });

  const onSubmit = async (data: InvoiceFormValues) => {
    try {
      const payload = {
        ...data,
        items: data.items.map((it) => ({ ...it, qty: Number(it.qty), price: Number(it.price) })),
      };
      const res = await createInvoice(payload);
      toast.push({ message: "Invoice created", type: "success" });
      reset();
      onCreated?.(res);
    } catch (err: any) {
      toast.push({ message: err?.normalized?.message || "Failed to create invoice", type: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input {...register("invoice_number")} className="border p-2 rounded" placeholder="Invoice #" />
        <input type="date" {...register("invoice_date")} className="border p-2 rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Customer</label>
        {/* Controlled SelectCustomer: update form value */}
        <SelectCustomer
          value={watch("customer_id")}
          onChange={(id) => setValue("customer_id", id)}
        />
      </div>

      <div>
        <label className="block font-medium mb-2">Items</label>
        <div className="space-y-2">
          {fields.map((f, idx) => (
            <div key={f.id} className="grid grid-cols-6 gap-2 items-center">
              <div className="col-span-2">
                <SelectProduct
                  value={f.sku}
                  onChange={(sku) => setValue(`items.${idx}.sku` as any, sku)}
                />
              </div>
              <input
                className="col-span-1 border p-2 rounded"
                type="number"
                {...register(`items.${idx}.qty` as const, { valueAsNumber: true })}
              />
              <input
                className="col-span-1 border p-2 rounded"
                type="number"
                step="0.01"
                {...register(`items.${idx}.price` as const, { valueAsNumber: true })}
              />
              <input
                className="col-span-1 border p-2 rounded"
                {...register(`items.${idx}.description` as const)}
                placeholder="descr"
              />
              <button type="button" className="col-span-1 text-red-600" onClick={() => remove(idx)}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <div>
          <button type="button" onClick={() => append({ sku: "", qty: 1, price: 0 })} className="mt-2 px-3 py-1 bg-gray-200 rounded">
            + Add item
          </button>
        </div>
      </div>

      <div>
        <label className="block mb-1">Notes</label>
        <textarea {...register("notes")} className="w-full border p-2 rounded" rows={3} />
      </div>

      <div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Create Invoice</button>
      </div>
    </form>
  );
}
