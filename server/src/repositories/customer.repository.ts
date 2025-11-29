import db from "../db/knex";

export default {
  list() {
    return db("customers").where({ deleted: false }).orderBy("id", "desc");
  },

  get(id: number) {
    return db("customers").where({ id, deleted: false }).first();
  },

  create(data: any) {
    return db("customers").insert(data).returning("*");
  },

  update(id: number, data: any) {
    return db("customers").where({ id }).update(data);
  },

  delete(id: number) {
    return db("customers").where({ id }).update({ deleted: true });
  },
};
