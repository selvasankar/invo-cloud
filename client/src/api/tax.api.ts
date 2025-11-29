// client/src/api/tax.api.ts
import http from "./http";

export const getTaxRates = async () => {
  const res = await http.get("/tax");
  return res.data.data || res.data;
};

export const createTax = async (payload: { name: string; rate: number }) => {
  const res = await http.post("/tax", payload);
  return res.data;
};

export const updateTax = async (id: number, payload: { name?: string; rate?: number }) => {
  const res = await http.put(`/tax/${id}`, payload);
  return res.data;
};

export const deleteTax = async (id: number) => {
  const res = await http.delete(`/tax/${id}`);
  return res.data;
};
