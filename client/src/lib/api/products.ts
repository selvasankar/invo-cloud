// client/src/lib/api/products.ts
import axios from "./axios";

export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
}

export async function listProducts() {
  const res = await axios.get("/products");
  return res.data;
}

export async function getProduct(id: string) {
  const res = await axios.get(`/products/${id}`);
  return res.data;
}

export async function createProduct(payload: Partial<Product>) {
  const res = await axios.post("/products", payload);
  return res.data;
}
