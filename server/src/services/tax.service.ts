// server/src/services/tax.service.ts
import taxRepo from "../repositories/tax.repository";
import * as taxEngine from "../services/taxEngine"

type ListOptions = {
  page?: number;
  perPage?: number;
};

type TaxPayload = {
  name: string;
  rate: number;   // percentage (e.g., 18 for 18%)
};

export default {
  /**
   * List all tax rates (paginated)
   */
  async list({ page = 1, perPage = 50 }: ListOptions) {
    const offset = (page - 1) * perPage;
    const rows = await taxRepo.list({ offset, limit: perPage });
    return rows;
  },

  /**
   * Get a single tax rate by ID
   */
  async get(id: number) {
    const tax = await taxRepo.getById(id);
    if (!tax) throw { status: 404, message: "Tax rate not found" };
    return tax;
  },

    /** Create tax rate
    * Create a new tax rate
   */
    async create(payload: TaxPayload) {
    if (!taxEngine.validateRate(payload.rate)) {
        throw { status: 400, message: "Invalid tax rate" };
    }
    const created = await taxRepo.create(payload);
    return created;
    },
  /**
   * Update existing tax
   */
  async update(id: number, payload: Partial<TaxPayload>) {
    const existing = await taxRepo.getById(id);
    if (!existing) throw { status: 404, message: "Tax rate not found" };

    if (payload.rate !== undefined && !taxEngine.validateRate(payload.rate)) {
      throw { status: 400, message: "Invalid tax rate" };
    }

    const updated = await taxRepo.update(id, payload);
    return updated;
  },



  /**
   * Delete tax rate
   */
  async delete(id: number) {
    const existing = await taxRepo.getById(id);
    if (!existing) throw { status: 404, message: "Tax rate not found" };

    await taxRepo.delete(id);
    return true;
  },
};
