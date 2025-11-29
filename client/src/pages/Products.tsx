import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import Button from '../components/Button';

const sampleProducts = [
  { sku: 'BAG01', name: 'Laptop Bag', price: 1200, stock: 42 },
  { sku: 'CAB11', name: 'HDMI Cable', price: 350, stock: 120 },
];

export default function ProductsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <Button>Add Product</Button>
      </div>

      <div className="grid gap-3">
        {sampleProducts.map((p) => (
          <Card key={p.sku}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.sku}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₹ {p.price}</div>
                  <div className="text-xs text-gray-500">{p.stock} pcs</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">Manage stock, pricing and description here.</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
