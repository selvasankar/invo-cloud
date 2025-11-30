import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ROUTING

/**
 * DARK / LIGHT theme hook
 */
function useTheme() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return { theme, toggleTheme };
}

/**
 * TOPBAR
 */
function Topbar({
  onToggleSidebar,
  toggleTheme,
  theme
}: {
  onToggleSidebar: () => void;
  toggleTheme: () => void;
  theme: string;
}) {
  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-900 border-b dark:border-gray-700 px-4 py-3">
      <div className="flex items-center gap-3">
        {/* Mobile burger icon */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          ☰
        </button>

        <Link to="/" className="text-lg font-semibold dark:text-white">
          Invoice and Inventory Management System
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Dark/Light Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-xl"
          title="Toggle Theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* Notifications */}
        <Link
          to="/notifications"
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          🔔
        </Link>

        {/* Profile */}
        <Link
          to="/profile"
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          👤
        </Link>
      </div>
    </header>
  );
}

/**
 * SIDEBAR
 */
function Sidebar({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-20 md:hidden transition-opacity 
        ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      <aside
        className={`fixed z-30 top-0 left-0 h-full w-64 
        bg-white dark:bg-gray-900 border-r dark:border-gray-700
        transform transition-transform
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static`}
      >
        <div className="h-full flex flex-col">
          <div className="px-4 py-5 border-b dark:border-gray-700">
            <div className="text-lg font-semibold dark:text-white">Invo</div>
            <div className="text-sm text-slate-600  dark:text-white">From Cloudtree</div>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1 text-gray-700 dark:text-gray-300">

            <Link className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" to="/">
              🧾 Dashboard
            </Link>

            <Link className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" to="/invoices/new">
              ➕ New Invoice
            </Link>

            <Link className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" to="/customers">
              👥 Customers
            </Link>

            <Link className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" to="/inventory">
              📦 Inventory
            </Link>

            <Link className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" to="/reports">
              📊 Reports
            </Link>

            <Link className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" to="/settings">
              ⚙️ Settings
            </Link>
          </nav>

          <div className="px-4 py-3 border-t dark:border-gray-700">
            <Link
              to="/logout"
              className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              🚪 Sign out
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

/**
 * MAIN DASHBOARD
 */
export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        <Topbar
          onToggleSidebar={() => setSidebarOpen((s) => !s)}
          toggleTheme={toggleTheme}
          theme={theme}
        />

        <main className="p-4 md:px-8 md:py-6">
          <div className="max-w-7xl mx-auto">

            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold dark:text-white">Dashboard</h3>

              <div className="hidden sm:flex gap-3">
                <Link
                  to="/invoices/new"
                  className="px-3 py-2 border rounded bg-white dark:bg-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  New Invoice
                </Link>

                <Link
                  to="/customers/new"
                  className="px-3 py-2 border rounded bg-white dark:bg-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  Add Customer
                </Link>
              </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">Invoices</div>
                <div className="text-2xl font-bold dark:text-white mt-2">12</div>
              </div>

              <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">Due</div>
                <div className="text-2xl font-bold dark:text-white mt-2">3</div>
              </div>

              <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">Revenue (30d)</div>
                <div className="text-2xl font-bold dark:text-white mt-2">₹45,200</div>
              </div>
            </div>

            {/* Content Area */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold dark:text-white mb-2">Recent invoices</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No invoices yet — create your first invoice to get started.
                  </p>
                </div>
              </div>

              {/* Right column */}
              <aside className="lg:col-span-1 space-y-4">
                <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-4">
                  <h5 className="font-medium dark:text-white mb-2">Top Customers</h5>
                  <ul className="space-y-2 text-sm dark:text-gray-300">
                    <li className="flex justify-between"><span>Raj Stores</span><span>₹ 28,000</span></li>
                    <li className="flex justify-between"><span>MK Traders</span><span>₹ 12,400</span></li>
                    <li className="flex justify-between"><span>Rani Mart</span><span>₹ 9,500</span></li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-4">
                  <h5 className="font-medium dark:text-white mb-2">Low Stock</h5>
                  <ul className="space-y-2 text-sm dark:text-gray-300">
                    <li className="flex justify-between"><span>HDMI Cable</span><span>12 pcs</span></li>
                    <li className="flex justify-between"><span>Mouse</span><span>8 pcs</span></li>
                  </ul>
                </div>
              </aside>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
