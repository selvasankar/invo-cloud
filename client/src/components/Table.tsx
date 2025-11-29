export default function Table({ columns, data }) {
  if (!data.length) return <p className="text-gray-500">No data available</p>;

  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th key={col} className="p-2 border-b">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            {Object.values(row).map((cell, i) => (
              <td key={i} className="p-2 border-b">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
