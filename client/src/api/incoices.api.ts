import http from "./http";

export const getInvoices = async (page = 1) => {
  const res = await http.get(`/invoices?page=${page}`);
  return res.data.data;
};

export const createInvoice = async (payload) => {
  const res = await http.post("/invoices", payload);
  return res.data.data;
};

export const getInvoiceById = async (id) => {
  const res = await http.get(`/invoices/${id}`);
  return res.data.data;
};
