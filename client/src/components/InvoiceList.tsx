// client/src/components/InvoiceList.tsx
import React, { useEffect, useState } from "react";
import { listInvoices, deleteInvoice } from "../lib/api/invoices";
import { useToast } from "./ToastProvider";
import { Link } from "react-router-dom";

export default function InvoiceList() {
  const [data, setData] = useState<any>({ data: [], page: 1, limit: 20, total: 0 });
  const toast = useToast();

  const load = async (page = 1) => {
    try {
      const res = await listInvoices(page, data.limit);
      // res may be { data, page, limit, total } or raw array — handle both
      const payload = res.data ? res : { data: res, page: 1, limit: 20, total: res.length };
      setData(payload);
    } catch (err: any) {
      toast.push({ message: err?.normalized?.message || "Failed to load invoices", type: "error" });
    }
  };

  useEffect(() => {
    load(1);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete invoice?")) return;
    try {
      await deleteInvoice(id);
      toast.push({ message: "Deleted", type: "success" });
      load(data.page);
    } catch (err: any) {
      toast.push({ message: err?.normalized?.message || "Delete failed", type: "error" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Invoices</h2>
        <Link to="/invoices/new" className="px-3 py-1 bg-blue-600 text-white rounded">New Invoice</Link>
      </div>

      <table className="w-full border-collapse border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Customer</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.data?.length === 0 && (
            <tr><td colSpan={5} className="p-4 text-center">No invoices</td></tr>
          )}
          {data.data?.map((inv: any) => (
            <tr key={inv.id}>
              <td className="p-2 border">{inv.invoice_number}</td>
              <td className="p-2 border">{inv.customer_name ?? inv.customer?.name ?? "—"}</td>
              <td className="p-2 border">{inv.invoice_date}</td>
              <td className="p-2 border">{inv.total ?? inv.subtotal}</td>
              <td className="p-2 border">
                <Link className="text-blue-600 mr-2" to={`/invoices/${inv.id}`}>View</Link>
                <button className="text-red-600" onClick={() => handleDelete(inv.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center">
        <div>Showing {data.data?.length || 0} of {data.total}</div>
        <div className="space-x-2">
          <button disabled={data.page <= 1} onClick={() => load(data.page - 1)} className="px-2 py-1 border rounded">Prev</button>
          <button disabled={data.page * data.limit >= data.total} onClick={() => load(data.page + 1)} className="px-2 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
}
