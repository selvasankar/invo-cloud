import db from "../db/knex";

export default {
  list() {
    return db("products").where({ deleted: false }).orderBy("id", "desc");
  },

  get(id: number) {
    return db("products").where({ id, deleted: false }).first();
  },

  create(data: any) {
    return db("products").insert(data).returning("*");
  },

  update(id: number, data: any) {
    return db("products").where({ id }).update(data);
  },

  delete(id: number) {
    return db("products").where({ id }).update({ deleted: true });
  },
};
