import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Settings } from "lucide-react";

type NavItem = {
  to: string;
  label: string;
  icon: React.ReactNode;
};

const nav: NavItem[] = [
  { to: "/", label: "Dashboard", icon: <Home size={16} /> },
  { to: "/profile", label: "Profile", icon: <User size={16} /> },
  { to: "/settings", label: "Settings", icon: <Settings size={16} /> },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-white border-r hidden md:flex flex-col">
      <div className="px-6 py-6 border-b">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold">
            IV
          </div>
          <div>
            <h1 className="text-lg font-semibold">Invo</h1>
            <p className="text-xs text-gray-500">Invoice App</p>
          </div>
        </Link>
      </div>

      <nav className="px-4 py-6 flex-1">
        <ul className="space-y-1">
          {nav.map((n) => {
            const active = location.pathname === n.to || (n.to === "/" && location.pathname === "/");
            return (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm ${
                    active
                      ? "bg-indigo-50 text-indigo-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className="text-gray-400">{n.icon}</span>
                  <span>{n.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-4 py-4 border-t">
        <Link to="/settings" className="text-xs text-gray-500 hover:text-gray-700">
          Help & Settings
        </Link>
      </div>
    </aside>
  );
}
