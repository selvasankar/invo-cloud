import db from "../db/knex";

export default {
  getUserByEmail(email: string) {
    return db("users").where({ email }).first();
  },

  createUser(user: any) {
    return db("users").insert(user).returning("*");
  },

  async updatePasswordByEmail(email: string, hashedPassword: string) {
    await db("users").where({ email }).update({ password: hashedPassword, updated_at: db.fn.now() });
    return db("users").where({ email }).first();
  },
};
