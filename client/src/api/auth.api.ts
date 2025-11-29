import http from "./http";

export const loginApi = async (email: string, password: string) => {
  const res = await http.post("/auth/login", { email, password });
  return res.data;
};

export const registerApi = async (payload:any) => {
  const res = await http.post("/auth/register", payload);
  return res.data;
};

export const forgotPasswordApi = async (email: string) => {
  const res = await http.post("/auth/forgot", { email });
  return res.data;
};

export const resetPasswordApi = async (payload: { email: string; token: string; password: string }) => {
  const res = await http.post("/auth/reset", payload);
  return res.data;
};
