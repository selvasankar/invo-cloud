// client/src/pages/InvoiceCreatePage.tsx
import React from "react";
import InvoiceForm from "../components/InvoiceForm";
import { useNavigate } from "react-router-dom";

export default function InvoiceCreatePage() {
  const nav = useNavigate();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Create Invoice</h1>
      <InvoiceForm onCreated={(res) => {
        const id = res?.invoice?.id || res?.invoice;
        if (id) nav(`/invoices/${id}`);
      }} />
    </div>
  );
}
