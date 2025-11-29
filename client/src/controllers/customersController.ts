import { Request, Response } from 'express';
import knex from '../db/knex';
import { v4 as uuidv4 } from 'uuid';

export async function listCustomers(req: Request, res: Response) {
  const { page = 1, limit = 20, q } = req.query as any;
  const offset = (Number(page) - 1) * Number(limit);
  try {
    const qb = knex('customers').where('deleted', false);
    if (q) qb.andWhere((b:any) => b.where('name', 'ilike', `%${q}%`).orWhere('email', 'ilike', `%${q}%`));
    const totalObj = await qb.clone().count('* as count').first();
    const total = Number((totalObj as any)?.count || 0);
    const rows = await qb.select('*').orderBy('created_at', 'desc').limit(Number(limit)).offset(offset);
    res.json({ meta: { total, page: Number(page), limit: Number(limit) }, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list customers' });
  }
}

export async function getCustomer(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const c = await knex('customers').where({ id }).first();
    if (!c) return res.status(404).json({ error: 'Customer not found' });
    res.json(c);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
}

export async function createCustomer(req: Request, res: Response) {
  const payload = req.body;
  try {
    const id = payload.id || uuidv4();
    await knex('customers').insert({
      id,
      name: payload.name,
      email: payload.email || null,
      phone: payload.phone || null,
      address: payload.address || null,
      gstin: payload.gstin || null,
      metadata: payload.metadata || null,
      deleted: false,
      created_at: knex.fn.now()
    });
    const created = await knex('customers').where({ id }).first();
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create customer' });
  }
}

export async function updateCustomer(req: Request, res: Response) {
  const { id } = req.params;
  const payload = req.body;
  try {
    await knex('customers').where({ id }).update({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      address: payload.address,
      gstin: payload.gstin,
      metadata: payload.metadata || null,
      updated_at: knex.fn.now()
    });
    const updated = await knex('customers').where({ id }).first();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update customer' });
  }
}

export async function deleteCustomer(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await knex('customers').where({ id }).update({ deleted: true, deleted_at: knex.fn.now() });
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
}
