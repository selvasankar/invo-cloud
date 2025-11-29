import http from "./http";

export const getCustomers = async () => {
  const res = await http.get("/customers");
  return res.data.data;
};

export const createCustomer = async (payload) => {
  const res = await http.post("/customers", payload);
  return res.data.data;
};
