// server/src/repositories/inventory.repository.ts
import db from "../db/knex"; // adjust path if your knex export is elsewhere

type ListArgs = { page?: number; perPage?: number } | number;

export default {
  /**
   * List inventory rows.
   * Accepts:
   *  - no args -> returns all
   *  - (page, perPage) as numbers -> returns paginated
   *  - ({page, perPage}) -> returns paginated
   */
  async list(arg1?: any, arg2?: any) {
    // no args -> return all
    if (arg1 === undefined) {
      return db("inventory").select("*").orderBy("id", "desc");
    }

    // if first arg is object -> treat as options
    if (typeof arg1 === "object") {
      const { page = 1, perPage = 50 } = arg1;
      const offset = (Number(page) - 1) * Number(perPage);
      return db("inventory").select("*").limit(Number(perPage)).offset(offset).orderBy("id", "desc");
    }

    // if two numeric args: page, perPage
    const page = Number(arg1 || 1);
    const perPage = Number(arg2 || 50);
    const offset = (page - 1) * perPage;
    return db("inventory").select("*").limit(perPage).offset(offset).orderBy("id", "desc");
  },

  async getById(id: number) {
    return db("inventory").where({ id }).first();
  },

  /**
   * Add stock (create inventory row)
   * payload expected: { product_id: number, quantity: number }
   */
  async addStock(payload: { product_id: number; quantity: number }) {
    const record = {
      product_id: payload.product_id,
      quantity: payload.quantity,
      created_at: db.fn.now(),
      updated_at: db.fn.now(),
    };

    try {
      const [row] = await db("inventory").insert(record).returning("*");
      // some DBs (sqlite) don't support returning; fallback:
      return row || (await db("inventory").where({ product_id: payload.product_id }).orderBy("id", "desc").first());
    } catch (err) {
      // fallback for DBs without returning
      await db("inventory").insert(record);
      return db("inventory").where({ product_id: payload.product_id }).orderBy("id", "desc").first();
    }
  },

  /**
   * Update stock: expects inventory row id or product_id depending on your usage.
   * We'll implement by inventory id.
   */
  async updateStock(id: number, quantity: number) {
    await db("inventory").where({ id }).update({ quantity, updated_at: db.fn.now() });
    return db("inventory").where({ id }).first();
  },

  /**
   * Optionally update by product id (helper)
   */
  async updateStockByProduct(productId: number, quantity: number) {
    await db("inventory").where({ product_id: productId }).update({ quantity, updated_at: db.fn.now() });
    return db("inventory").where({ product_id: productId }).first();
  },

  // other helpers if needed
};
