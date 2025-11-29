// client/src/lib/api/customers.ts
import axios from "./axios";

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

export async function listCustomers() {
  const res = await axios.get("/customers");
  return res.data;
}

export async function getCustomer(id: string) {
  const res = await axios.get(`/customers/${id}`);
  return res.data;
}

export async function createCustomer(payload: Partial<Customer>) {
  const res = await axios.post("/customers", payload);
  return res.data;
}
