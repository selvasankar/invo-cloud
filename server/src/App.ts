import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import invoiceRoutes from "./routes/invoices";
import customerRoutes from "./routes/customers";
import productRoutes from "./routes/products";
import inventoryRoutes from "./routes/inventory";
import authRoutes from "./routes/auth";
import taxRoutes from "./routes/tax";
import errorHandler from "./middleware/errorHandler";

const app = express();

// Core middlewares
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// Static assets
app.use(
  "/assets",
  express.static(path.join(__dirname, "../assets"))
);

// API Routes
app.use("/api/v1/invoices", invoiceRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/inventory", inventoryRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tax", taxRoutes);

const PORT = process.env.DB_PASSWORD || 4000;


app.listen(PORT, () => console.log("listening", PORT));

// 404 Handler
app.use((req, res, next) => {
  return res.status(404).json({
    status: false,
    message: "Endpoint not found",
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;
