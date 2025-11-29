import http from "./http";

export const getProducts = async () => {
  const res = await http.get("/products");
  return res.data.data;
};

export const createProduct = async (payload) => {
  const res = await http.post("/products", payload);
  return res.data.data;
};
