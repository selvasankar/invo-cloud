import { Request, Response } from 'express';
import knex from '../db/knex';
import { v4 as uuidv4 } from 'uuid';

export async function listRules(req: Request, res: Response) {
  try {
    const rows = await knex('tax_rules').where({}).orderBy('priority', 'asc');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list rules' });
  }
}

export async function getRule(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const r = await knex('tax_rules').where({ id }).first();
    if (!r) return res.status(404).json({ error: 'Not found' });
    res.json(r);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch rule' });
  }
}

export async function createRule(req: Request, res: Response) {
  const payload = req.body;
  try {
    const id = payload.id || uuidv4();
    await knex('tax_rules').insert({
      id,
      title: payload.title,
      slug: payload.slug,
      description: payload.description || null,
      conditions: payload.conditions ? JSON.stringify(payload.conditions) : null,
      actions: payload.actions ? JSON.stringify(payload.actions) : null,
      active: payload.active !== undefined ? payload.active : true,
      priority: payload.priority || 100,
      created_at: knex.fn.now()
    });
    const created = await knex('tax_rules').where({ id }).first();
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create rule' });
  }
}

export async function updateRule(req: Request, res: Response) {
  const { id } = req.params;
  const payload = req.body;
  try {
    await knex('tax_rules').where({ id }).update({
      title: payload.title,
      slug: payload.slug,
      description: payload.description,
      conditions: payload.conditions ? JSON.stringify(payload.conditions) : null,
      actions: payload.actions ? JSON.stringify(payload.actions) : null,
      active: payload.active,
      priority: payload.priority,
      updated_at: knex.fn.now()
    });
    const updated = await knex('tax_rules').where({ id }).first();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update rule' });
  }
}

export async function deleteRule(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await knex('tax_rules').where({ id }).del();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete rule' });
  }
}
