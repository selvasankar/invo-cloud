// client/src/pages/InvoiceViewPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvoice } from "../lib/api/invoices";
import { useToast } from "../components/ToastProvider";

export default function InvoiceViewPage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<any>(null);
  const toast = useToast();

  useEffect(() => {
    if (!id) return;
    getInvoice(id)
      .then((res) => setInvoice(res))
      .catch((err) => toast.push({ message: err?.normalized?.message || "Failed to load", type: "error" }));
  }, [id]);

  if (!invoice) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Invoice {invoice.invoice_number}</h1>
      <div className="mb-4">
        <strong>Customer:</strong> {invoice.customer?.name ?? invoice.customer_name}
      </div>
      <div className="mb-4">
        <strong>Date:</strong> {invoice.invoice_date}
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100"><tr><th className="p-2 border">SKU</th><th className="p-2 border">Description</th><th className="p-2 border">Qty</th><th className="p-2 border">Price</th></tr></thead>
        <tbody>
          {invoice.lines?.map((l:any)=>(
            <tr key={l.id}>
              <td className="p-2 border">{l.sku}</td>
              <td className="p-2 border">{l.description}</td>
              <td className="p-2 border">{l.qty}</td>
              <td className="p-2 border">{l.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <div><strong>Subtotal:</strong> {invoice.subtotal}</div>
        <div><strong>Tax:</strong> {invoice.tax}</div>
        <div><strong>Total:</strong> {invoice.total}</div>
      </div>
    </div>
  );
}
