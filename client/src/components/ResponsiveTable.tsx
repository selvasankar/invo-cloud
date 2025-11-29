// client/src/components/ResponsiveTable.tsx
import React from "react";

type Props = {
  columns: string[];
  data: Array<Record<string, any>>;
  className?: string;
};

export default function ResponsiveTable({ columns, data, className = "" }: Props) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 p-4">No data available</p>;
  }

  return (
    <div className={`overflow-x-auto bg-white rounded-md shadow-sm ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                scope="col"
                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, idx) => (
            <tr key={idx} className="odd:bg-white even:bg-gray-50">
              {Object.values(row).map((cell, i) => (
                <td key={i} className="px-3 py-2 text-sm text-gray-700 whitespace-nowrap">
                  {/* allow ReactNodes */}
                  {typeof cell === "object" && cell !== null ? cell : String(cell ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
