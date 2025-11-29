import { Request, Response } from 'express';
import knex from '../db/knex';
import { v4 as uuidv4 } from 'uuid';

export async function listLinks(req: Request, res: Response) {
  try {
    const rows = await knex('product_gst_links').select('*').orderBy('created_at', 'desc');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list product GST links' });
  }
}

export async function getLink(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const row = await knex('product_gst_links').where({ id }).first();
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch link' });
  }
}

export async function createLink(req: Request, res: Response) {
  const payload = req.body;
  try {
    const id = payload.id || uuidv4();
    await knex('product_gst_links').insert({
      id,
      sku: payload.sku,
      product_id: payload.product_id || null,
      hsn_sac_id: payload.hsn_sac_id || null,
      tax_rate_id: payload.tax_rate_id || null,
      use_default_hsn_tax: payload.use_default_hsn_tax !== undefined ? payload.use_default_hsn_tax : true,
      created_at: knex.fn.now()
    });
    const created = await knex('product_gst_links').where({ id }).first();
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product GST link' });
  }
}

export async function updateLink(req: Request, res: Response) {
  const { id } = req.params;
  const payload = req.body;
  try {
    await knex('product_gst_links').where({ id }).update({
      sku: payload.sku,
      product_id: payload.product_id,
      hsn_sac_id: payload.hsn_sac_id,
      tax_rate_id: payload.tax_rate_id,
      use_default_hsn_tax: payload.use_default_hsn_tax,
      updated_at: knex.fn.now()
    });
    const updated = await knex('product_gst_links').where({ id }).first();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update link' });
  }
}

export async function deleteLink(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await knex('product_gst_links').where({ id }).del();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete link' });
  }
}
