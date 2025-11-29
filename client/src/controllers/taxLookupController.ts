import { Request, Response } from 'express';
import knex from '../db/knex';

export async function listTaxRates(req: Request, res: Response) {
  try {
    const rows = await knex('tax_rates').select('*').orderBy('rate', 'asc');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list tax rates' });
  }
}

export async function listHsn(req: Request, res: Response) {
  try {
    const rows = await knex('hsn_sac').select('*').orderBy('code', 'asc');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list HSN/SAC' });
  }
}

export async function listStateGst(req: Request, res: Response) {
  try {
    const rows = await knex('state_gst_rates').select('*').orderBy('state_code', 'asc');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list state GST rates' });
  }
}
