// server/src/repositories/tax.repository.ts
import db from "../db/knex";

export default {
  async list({ offset = 0, limit = 50 } = {}) {
    return db("tax_rates")
      .select("*")
      .offset(offset)
      .limit(limit)
      .orderBy("id", "desc");
  },

  async getById(id: number) {
    return db("tax_rates").where({ id }).first();
  },

  async create(payload: { name: string; rate: number }) {
    const record = {
      name: payload.name,
      rate: payload.rate,
      created_at: db.fn.now(),
      updated_at: db.fn.now(),
    };

    try {
      const [row] = await db("tax_rates").insert(record).returning("*");
      return row;
    } catch {
      // SQLite fallback
      await db("tax_rates").insert(record);
      return db("tax_rates").where({ name: payload.name }).orderBy("id", "desc").first();
    }
  },

  async update(id: number, data: Partial<{ name: string; rate: number }>) {
    await db("tax_rates").where({ id }).update({ ...data, updated_at: db.fn.now() });
    return db("tax_rates").where({ id }).first();
  },

  async delete(id: number) {
    return db("tax_rates").where({ id }).del();
  },
};
