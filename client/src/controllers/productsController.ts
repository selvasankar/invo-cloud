import { Request, Response } from 'express';
import knex from '../db/knex';
import { v4 as uuidv4 } from 'uuid';

export async function listProducts(req: Request, res: Response) {
  const { page = 1, limit = 20, q, active } = req.query as any;
  const offset = (Number(page) - 1) * Number(limit);
  try {
    const qb = knex('products');
    if (active !== undefined) qb.where('active', active === 'true' || active === true);
    if (q) qb.andWhere((b:any) => b.where('name', 'ilike', `%${q}%`).orWhere('sku', 'ilike', `%${q}%`));
    const totalObj = await qb.clone().count('* as count').first();
    const total = Number((totalObj as any)?.count || 0);
    const rows = await qb.select('*').orderBy('created_at', 'desc').limit(Number(limit)).offset(offset);
    res.json({ meta: { total, page: Number(page), limit: Number(limit) }, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list products' });
  }
}

export async function getProduct(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const p = await knex('products').where({ id }).first();
    if (!p) return res.status(404).json({ error: 'Product not found' });
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
}

export async function createProduct(req: Request, res: Response) {
  const payload = req.body;
  try {
    const id = payload.id || uuidv4();
    await knex('products').insert({
      id,
      sku: payload.sku,
      name: payload.name,
      description: payload.description || null,
      price: payload.price || 0,
      unit: payload.unit || 'pcs',
      gst_pct: payload.gst_pct || 0,
      active: payload.active !== undefined ? payload.active : true,
      metadata: payload.metadata || null,
      created_at: knex.fn.now()
    });
    const created = await knex('products').where({ id }).first();
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product' });
  }
}

export async function updateProduct(req: Request, res: Response) {
  const { id } = req.params;
  const payload = req.body;
  try {
    await knex('products').where({ id }).update({
      sku: payload.sku,
      name: payload.name,
      description: payload.description,
      price: payload.price,
      unit: payload.unit,
      gst_pct: payload.gst_pct,
      active: payload.active,
      metadata: payload.metadata || null,
      updated_at: knex.fn.now()
    });
    const updated = await knex('products').where({ id }).first();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update product' });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await knex('products').where({ id }).del();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
}
