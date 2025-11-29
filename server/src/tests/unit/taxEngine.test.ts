import { calculateInvoiceTax } from '../../services/taxEngine';

test('tax engine returns totals', async () => {
  const out = await calculateInvoiceTax({ items: [{ qty:1, price:100 }], seller_state:'TN', buyer_state:'TN' });
  expect(out.subtotal).toBeDefined();
  expect(out.lines.length).toBe(1);
});
