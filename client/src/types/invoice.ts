// client/src/types/invoice.ts
export interface InvoiceItem {
  sku: string;
  description?: string;
  qty: number;
  price: number;
  tax_rate?: number;
}

export interface Invoice {
  id?: string;
  invoice_number: string;
  customer_id: string;
  invoice_date: string;
  due_date?: string;
  items: InvoiceItem[];
  subtotal?: number;
  tax?: number;
  total?: number;
  notes?: string;
}
