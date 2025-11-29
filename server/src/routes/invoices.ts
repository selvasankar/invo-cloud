// server/src/routes/invoices.ts
import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler";
import requireAuth from "../middleware/requireAuth";
import invoiceController from "../controllers/invoices.controller";

const router = Router();
router.use(requireAuth); // protect invoice routes

router.get("/", asyncHandler(invoiceController.listInvoices));
router.get("/:id", asyncHandler(invoiceController.getInvoiceById));
router.post("/", asyncHandler(invoiceController.createInvoice));

// change status route (PATCH)
router.patch("/:id/status", asyncHandler(invoiceController.updateStatus));

// delete invoice
router.delete("/:id", asyncHandler(invoiceController.deleteInvoice));

// payments
router.post("/:id/payments", asyncHandler(invoiceController.addPayment));

export default router;
