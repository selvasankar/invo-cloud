// client/src/context/AuthContext.tsx
import React, { createContext, useEffect, useState } from "react";
import { loginApi, registerApi } from "../api/auth.api";

type AuthContextValue = {
  user: any;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<any>;
  logout: () => void;
  register?: (name: string, email: string, password: string, remember?: boolean) => Promise<any>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // init: prefer localStorage (persistent) then sessionStorage
  useEffect(() => {
    const persistentToken = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("token");
    const effectiveToken = persistentToken || sessionToken;

    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");

    if (effectiveToken) {
      setToken(effectiveToken);
    }
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  // login: remember === true -> persist to localStorage; else use sessionStorage
  async function login(email: string, password: string, remember = false) {
    const res = await loginApi(email, password);
    const authToken = res.token || res.data?.token || (res as any).token;
    const authUser = res.user || res.data?.user || (res as any).user;

    setToken(authToken);
    setUser(authUser);

    if (remember) {
      localStorage.setItem("token", authToken);
      localStorage.setItem("user", JSON.stringify(authUser));
      // clear session storage if any
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    } else {
      sessionStorage.setItem("token", authToken);
      sessionStorage.setItem("user", JSON.stringify(authUser));
      // optionally remove persistent
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    return { user: authUser, token: authToken };
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }

  // optional register helper placed in context for convenience
  async function register(name: string, email: string, password: string, remember = true) {
    // call API
    const res = await registerApi({ name, email, password });
    // if successful, auto-login
    await login(email, password, remember);
    return res;
  }

  const value: AuthContextValue = {
    user,
    token,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
