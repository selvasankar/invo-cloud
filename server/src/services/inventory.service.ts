// server/src/services/inventory.service.ts
import inventoryRepo from "../repositories/inventory.repository";

type AddStockPayload = { product_id: number; quantity: number };

export default {
  /**
   * list called as: invoiceService.list({ page, perPage }) OR list() or list(page, perPage)
   */
  async list(opts?: { page?: number; perPage?: number } | number, maybePerPage?: number) {
    if (opts === undefined) {
      return inventoryRepo.list();
    }
    if (typeof opts === "object") {
      return inventoryRepo.list(opts);
    }
    // numeric signature
    return inventoryRepo.list(opts as number, maybePerPage);
  },

  async getById(id: number) {
    const row = await inventoryRepo.getById(id);
    if (!row) throw { status: 404, message: "Inventory row not found" };
    return row;
  },

  async addStock(payload: AddStockPayload) {
    if (!payload || typeof payload.product_id !== "number") {
      throw { status: 400, message: "Invalid payload" };
    }
    const created = await inventoryRepo.addStock(payload);
    return created;
  },

  async updateStock(id: number, quantity: number) {
    if (typeof id !== "number" || typeof quantity !== "number") {
      throw { status: 400, message: "Invalid parameters" };
    }
    const updated = await inventoryRepo.updateStock(id, quantity);
    return updated;
  },

  // convenience: update by product id (if frontend uses product_id)
  async updateStockByProduct(productId: number, quantity: number) {
    if (typeof productId !== "number" || typeof quantity !== "number") {
      throw { status: 400, message: "Invalid parameters" };
    }
    const updated = await (inventoryRepo as any).updateStockByProduct(productId, quantity);
    return updated;
  },
};
