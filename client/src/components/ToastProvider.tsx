// client/src/components/ToastProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

type Toast = { id: string; message: string; type?: "info" | "success" | "error" };

const ToastContext = createContext(null as any);

export function useToast() {
  return useContext(ToastContext) as {
    push: (t: Omit<Toast, "id">) => void;
    remove: (id: string) => void;
  };
}

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function push(t: Omit<Toast, "id">) {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((s) => [...s, { id, ...t }]);
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 4500);
  }
  function remove(id: string) {
    setToasts((s) => s.filter((x) => x.id !== id));
  }

  return (
    <ToastContext.Provider value={{ push, remove }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`max-w-sm p-3 rounded shadow-md text-white ${
              t.type === "error" ? "bg-red-600" : t.type === "success" ? "bg-green-600" : "bg-gray-800"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
