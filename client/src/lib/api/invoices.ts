// client/src/lib/api/invoices.ts
import axios from "./axios";
import { InvoiceItem } from "../types/invoice";

export interface InvoiceCreateDTO {
  invoice_number: string;
  customer_id: string;
  invoice_date: string;
  due_date?: string;
  items: InvoiceItem[];
  notes?: string;
}

export async function listInvoices(page = 1, limit = 20) {
  const res = await axios.get("/invoices", { params: { page, limit } });
  return res.data;
}

export async function getInvoice(id: string) {
  const res = await axios.get(`/invoices/${id}`);
  return res.data;
}

export async function createInvoice(payload: InvoiceCreateDTO) {
  const res = await axios.post("/invoices", payload);
  return res.data;
}

export async function updateInvoice(id: string, payload: Partial<InvoiceCreateDTO>) {
  const res = await axios.put(`/invoices/${id}`, payload);
  return res.data;
}

export async function deleteInvoice(id: string) {
  const res = await axios.delete(`/invoices/${id}`);
  return res.data;
}
