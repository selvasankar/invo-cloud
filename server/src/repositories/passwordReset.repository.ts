import db from "../db/knex";

export default {
  async create(email: string, tokenHash: string, expiresAt: Date) {
    const [row] = await db("password_resets")
      .insert({ email, token_hash: tokenHash, expires_at: expiresAt })
      .returning("*");
    return row;
  },

  async findValidByEmailAndHash(email: string, tokenHash: string) {
    return db("password_resets")
      .where({ email, token_hash: tokenHash })
      .andWhere("expires_at", ">", db.fn.now())
      .first();
  },

  async deleteByEmail(email: string) {
    return db("password_resets").where({ email }).del();
  },
};
