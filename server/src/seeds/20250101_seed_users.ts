/**
 * @param {import('knex').Knex} knex
 */
import bcrypt from "bcryptjs";

export async function seed(knex) {
  // clean
  await knex("users").del();

  const passwordPlain = "password123";
  const hashed = await bcrypt.hash(passwordPlain, 10);

  await knex("users").insert([
    {
      name: "Admin User",
      email: "admin@example.com",
      password: hashed,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
