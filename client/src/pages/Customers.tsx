import { useEffect, useState } from "react";
import { getCustomers } from "../api/customers.api";
import AddCustomerModal from "./AddCustomerModal";
import Table from "../components/Table";
import Button from "../components/Button";
import useModal from "../hooks/useModal";
import Loader from "../components/Loader";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const modal = useModal();

  const load = async () => {
    setLoading(true);
    const data = await getCustomers();
    setCustomers(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Customers</h1>
        <Button onClick={modal.open}>Add Customer</Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <Table
          columns={["Name", "Email", "Phone"]}
          data={customers.map((c) => ({
            Name: c.name,
            Email: c.email,
            Phone: c.phone,
          }))}
        />
      )}

      <AddCustomerModal
        isOpen={modal.isOpen}
        onClose={modal.close}
        onSuccess={load}
      />
    </div>
  );
}
