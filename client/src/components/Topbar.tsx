import React from "react";
import { useLocation } from "react-router-dom";

export default function Topbar() {
  const location = useLocation();

  // page title mapping
  const title =
    location.pathname === "/"
      ? "Dashboard"
      : location.pathname.startsWith("/profile")
      ? "Profile"
      : location.pathname.startsWith("/settings")
      ? "Settings"
      : "Invo";

  // placeholder user (replace with your auth / user context)
  const user = { name: "Selva", email: "selva@example.com" };

  return (
    <header className="w-full bg-white border-b px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-sm text-gray-500 hidden sm:inline">Manage invoices and customers</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right mr-2 hidden sm:block">
          <div className="text-sm font-medium">{user.name}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>

        <button
          aria-label="User"
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700"
        >
          {user.name[0]}
        </button>
      </div>
    </header>
  );
}
