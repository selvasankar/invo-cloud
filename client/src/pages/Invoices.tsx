import { useEffect, useState } from "react";
import { getInvoices } from "../api/incoices.api";
import Table from "../components/Table";
import Loader from "../components/Loader";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const data = await getInvoices();
    setInvoices(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Invoices</h1>
        <Link to="/invoices/add">
          <Button>Add Invoice</Button>
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <Table
          columns={["ID", "Customer", "Date", "Status"]}
          data={invoices.map((inv) => ({
            ID: inv.id,
            Customer: inv.customer_id,
            Date: inv.invoice_date,
            Status: inv.status,
          }))}
        />
      )}
    </div>
  );
}
