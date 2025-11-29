import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Invoices from "./pages/Invoices";
import AddInvoice from "./pages/AddInvoice";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import Taxes from "./pages/Taxes";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <AuthProvider>      
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> 

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <Customers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path="/invoices"
            element={
              <ProtectedRoute>
                <Invoices />
              </ProtectedRoute>
            }
          />

          <Route
            path="/invoices/add"
            element={
              <ProtectedRoute>
                <AddInvoice />
              </ProtectedRoute>
            }
          />

          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tax"
            element={
              <ProtectedRoute>
                <Taxes />
              </ProtectedRoute>
            }
          />
        </Routes>
    </AuthProvider>
  );
}
