
// import React from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '../components/card';
// import  InvoiceForm from '../components/InvoiceForm';

// export default function DashboardPage() {
//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <Card>
//           <CardHeader><CardTitle>Sales (This Month)</CardTitle></CardHeader>
//           <CardContent>
//             <div className="text-2xl font-semibold">₹ 52,400</div>
//             <div className="text-xs text-green-600 mt-1">+12% vs last month</div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader><CardTitle>Outstanding</CardTitle></CardHeader>
//           <CardContent>
//             <div className="text-2xl font-semibold">₹ 18,300</div>
//             <div className="text-xs text-yellow-600 mt-1">5 invoices overdue</div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader><CardTitle>Cash in Hand</CardTitle></CardHeader>
//           <CardContent>
//             <div className="text-2xl font-semibold">₹ 98,250</div>
//             <div className="text-xs text-gray-500 mt-1">Bank: ₹ 45,000</div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2">
//           <Card>
//             <CardHeader><CardTitle>Create Invoice</CardTitle></CardHeader>
//             <CardContent>
//               <InvoiceForm customers={[{ id: 'c1', name: 'Raj Stores' }, { id: 'c2', name: 'MK Traders' }]} onSave={(v) => console.log('Invoice saved', v)} />
//             </CardContent>
//           </Card>
//         </div>

//         <aside className="lg:col-span-1 space-y-4">
//           <Card>
//             <CardHeader><CardTitle>Top Customers</CardTitle></CardHeader>
//             <CardContent>
//               <ul className="space-y-2 text-sm">
//                 <li className="flex justify-between"><span>Raj Stores</span><span>₹ 28,000</span></li>
//                 <li className="flex justify-between"><span>MK Traders</span><span>₹ 12,400</span></li>
//                 <li className="flex justify-between"><span>Rani Mart</span><span>₹ 9,500</span></li>
//               </ul>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader><CardTitle>Low Stock</CardTitle></CardHeader>
//             <CardContent>
//               <ul className="space-y-2 text-sm">
//                 <li className="flex justify-between"><span>HDMI Cable</span><span>12 pcs</span></li>
//                 <li className="flex justify-between"><span>Mouse</span><span>8 pcs</span></li>
//               </ul>
//             </CardContent>
//           </Card>
//         </aside>
//       </div>
//     </div>
//   );
// }

import React from "react";

export default function DashboardPage() {
  return (
    <div className="max-w-4xl">
      <h3 className="text-2xl font-semibold mb-4">Dashboard</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <div className="text-sm text-gray-500">Invoices</div>
          <div className="text-2xl font-bold mt-2">12</div>
        </div>

        <div className="bg-white border rounded-lg p-4">
          <div className="text-sm text-gray-500">Due</div>
          <div className="text-2xl font-bold mt-2">3</div>
        </div>

        <div className="bg-white border rounded-lg p-4">
          <div className="text-sm text-gray-500">Revenue (30d)</div>
          <div className="text-2xl font-bold mt-2">₹45,200</div>
        </div>
      </div>

      <section className="mt-6">
        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold mb-2">Recent invoices</h4>
          <p className="text-sm text-gray-500">No invoices yet — create your first invoice to get started.</p>
        </div>
      </section>
    </div>
  );
}
