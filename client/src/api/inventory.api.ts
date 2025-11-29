// client/src/api/inventory.api.ts
import http from "./http";

export const getInventory = async () => {
  const res = await http.get("/inventory");
  return res.data.data || res.data;
};

export const addStock = async (payload: { product_id: number; quantity: number }) => {
  const res = await http.post("/inventory", payload);
  return res.data;
};

export const updateStock = async (id: number, quantity: number) => {
  const res = await http.patch(`/inventory/${id}`, { quantity });
  return res.data;
};
