/**
 * taxEngine.ts
 * Lightweight tax calculation service that reads lookup tables and applies tax rules.
 * Returns breakdown: { subtotal, tax, cgst, sgst, igst, total, reverseCharge }
 */

/* eslint-disable camelcase */
import knex from '../db/knex'; // adjust path when integrated into your project


export type LineItem = {
  sku?: string;
  hsn?: string;
  qty: number;
  price: number;
  amount?: number; // qty * price (optional)
  product_id?: string | null;
};

export async function calculateInvoiceTax({ items, seller_state, buyer_state }: { items: LineItem[]; seller_state: string; buyer_state: string; }) {
  let subtotal = 0;
  let tax_total = 0;
  let cgst_total = 0;
  let sgst_total = 0;
  let igst_total = 0;
  let reverseChargeApplied = false;
  const lineBreakdown: any[] = [];

  // Preload tax rules and HSN mappings
  const taxRules = await knex('tax_rules').where({ active: true }).orderBy('priority', 'asc');
  const stateSeller = await knex('state_gst_rates').where('state_code', seller_state).first();
  const stateBuyer = await knex('state_gst_rates').where('state_code', buyer_state).first();

  for (const line of items) {
    const amount = Number(line.amount ?? (line.qty * line.price));
    subtotal += amount;

    // Resolve tax rate: product_gst_links -> hsn_sac -> default rate
    let taxRateRecord: { rate: number } | null = null;
    if (line.sku) {
      const link = await knex('product_gst_links').where('sku', line.sku).first();
      if (link && link.tax_rate_id) {
        taxRateRecord = await knex('tax_rates').where('id', link.tax_rate_id).first();
      } else if (link && link.hsn_sac_id) {
        const hsn = await knex('hsn_sac').where('id', link.hsn_sac_id).first();
        taxRateRecord = hsn ? await knex('tax_rates').where('id', hsn.default_tax_rate_id).first() : null;
      }
    }
    if (!taxRateRecord && line.hsn) {
      const hsn = await knex('hsn_sac').where('code', line.hsn).first();
      taxRateRecord = hsn ? await knex('tax_rates').where('id', hsn.default_tax_rate_id).first() : null;
    }
    // fallback to GST18 if nothing found
    if (!taxRateRecord) {
      taxRateRecord = await knex('tax_rates').where('code', 'GST18').first();
    }

    const rate = Number(taxRateRecord ? taxRateRecord.rate : 0);

    // Evaluate tax rules (simple matching)
    for (const rule of taxRules) {
      try {
        const conditions = rule.conditions || {};
        const actions = rule.actions || {};
        let match = true;
        if (conditions.hsn_codes && Array.isArray(conditions.hsn_codes)) {
          if (!line.hsn || !conditions.hsn_codes.includes(line.hsn)) match = false;
        }
        if (conditions.min_amount && amount < Number(conditions.min_amount)) match = false;
        if (match) {
          if (actions.force_tax_rate_code) {
            const forced = await knex('tax_rates').where('code', actions.force_tax_rate_code).first();
            if (forced) rate == Number(forced.rate);
          }
          if (actions.reverse_charge) reverseChargeApplied = true;
        }
      } catch (e) {
        console.warn('rule eval error', e);
      }
    }

    // Calculate tax based on intra-state (CGST+SGST) vs inter-state (IGST)
    let cgst = 0, sgst = 0, igst = 0;
    if (seller_state && buyer_state && seller_state === buyer_state) {
      // intra-state: split equally CGST/SGST for the rate
      cgst = +(amount * (rate/100) / 2).toFixed(2);
      sgst = +(amount * (rate/100) / 2).toFixed(2);
    } else {
      // inter-state: IGST applies
      igst = +(amount * (rate/100)).toFixed(2);
    }
    const tax = cgst + sgst + igst;

    tax_total += tax;
    cgst_total += cgst;
    sgst_total += sgst;
    igst_total += igst;

    lineBreakdown.push({ ...line, amount, rate, cgst, sgst, igst, tax });
  }

  const total = +(subtotal + tax_total).toFixed(2);

  return {
    subtotal: +subtotal.toFixed(2),
    tax_total: +tax_total.toFixed(2),
    cgst_total: +cgst_total.toFixed(2),
    sgst_total: +sgst_total.toFixed(2),
    igst_total: +igst_total.toFixed(2),
    total,
    reverseChargeApplied,
    lines: lineBreakdown
  };
}

async function getDefaultTaxRate() {
  return knex('tax_rates').where('code', 'GST18').first();
}

async function getTaxRateById(id: number) {
  return knex('tax_rates').where('id', id).first();
}

async function getTaxRateByCode(code: string) {
  return knex('tax_rates').where('code', code).first();
}


export const validateRate = (rate: number): boolean => {
    return typeof rate === "number" && rate >= 0 && rate <= 100;
};


