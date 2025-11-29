import { Request, Response } from 'express';
import knex from '../db/knex';
import { v4 as uuidv4 } from 'uuid';

export async function listInventory(req: Request, res: Response) {
  const { page = 1, limit = 20, q } = req.query as any;
  const offset = (Number(page) - 1) * Number(limit);
  try {
    const qb = knex('inventory').join('products', 'inventory.product_id', 'products.id').select('inventory.*', 'products.sku', 'products.name');
    if (q) qb.where('products.name', 'ilike', `%${q}%`).orWhere('products.sku', 'ilike', `%${q}%`);
    const totalObj = await knex('inventory').count('* as count').first();
    const rows = await qb.orderBy('inventory.created_at', 'desc').limit(Number(limit)).offset(offset);
    res.json({ meta: { total: Number((totalObj as any)?.count || 0), page: Number(page), limit: Number(limit) }, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list inventory' });
  }
}

export async function getInventory(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const inv = await knex('inventory').where({ id }).first();
    if (!inv) return res.status(404).json({ error: 'Inventory item not found' });
    res.json(inv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
}

export async function createInventory(req: Request, res: Response) {
  const payload = req.body;
  try {
    const id = payload.id || uuidv4();
    await knex('inventory').insert({
      id,
      product_id: payload.product_id || null,
      quantity: payload.quantity || 0,
      location: payload.location || null,
      batch_number: payload.batch_number || null,
      expiry_date: payload.expiry_date || null,
      metadata: payload.metadata || null,
      created_at: knex.fn.now()
    });
    const created = await knex('inventory').where({ id }).first();
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create inventory' });
  }
}

export async function updateInventory(req: Request, res: Response) {
  const { id } = req.params;
  const payload = req.body;
  try {
    await knex('inventory').where({ id }).update({
      quantity: payload.quantity,
      location: payload.location,
      batch_number: payload.batch_number,
      expiry_date: payload.expiry_date,
      metadata: payload.metadata || null,
      updated_at: knex.fn.now()
    });
    const updated = await knex('inventory').where({ id }).first();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update inventory' });
  }
}

export async function deleteInventory(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await knex('inventory').where({ id }).del();
    res.json({ message: 'Inventory deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete inventory' });
  }
}
