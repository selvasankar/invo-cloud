import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

export default function ReportsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Reports</h2>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader><CardTitle>Sales Report</CardTitle></CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">Placeholder for sales charts and filters.</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Outstanding / Aging Report</CardTitle></CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">Aging buckets, export CSV, filter by customer.</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
