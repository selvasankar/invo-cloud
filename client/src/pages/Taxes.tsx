import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import Loader from "../components/Loader";
import ResponsiveTable from "../components/ResponsiveTable";
import useModal from "../hooks/useModal";
import TaxModal from "../components/TaxModal";
import handleError from "../utils/handleError";
import { getTaxRates, deleteTax } from "../api/tax.api";

type TaxRate = {
  id: number;
  name: string;
  rate: number;
};

export default function Taxes() {
  const [rates, setRates] = useState<TaxRate[]>([]);
  const [loading, setLoading] = useState(true);
  const modal = useModal();
  const [editing, setEditing] = useState<TaxRate | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getTaxRates();
      const list = Array.isArray(data) ? data : (data?.data || []);
      setRates(list);
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onAdd = () => {
    setEditing(null);
    modal.open();
  };

  const onEdit = (r: TaxRate) => {
    setEditing(r);
    modal.open();
  };

  const onDelete = async (id: number) => {
    if (!confirm("Delete tax rate?")) return;
    try {
      await deleteTax(id);
      await load();
    } catch (err: any) {
      handleError(err);
    }
  };

  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Tax Rates</h1>
        <Button onClick={onAdd}>Add Tax</Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <ResponsiveTable
          columns={["Name", "Rate (%)", "Actions"]}
          data={rates.map((r) => ({
            Name: r.name,
            "Rate (%)": Number(r.rate).toFixed(2),
            Actions: (
              <div className="flex gap-2">
                <button
                  className="text-sm text-blue-600"
                  onClick={() => onEdit(r)}
                >
                  Edit
                </button>
                <button
                  className="text-sm text-red-600"
                  onClick={() => onDelete(r.id)}
                >
                  Delete
                </button>
              </div>
            ),
          }))}
        />
      )}

      <TaxModal
        isOpen={modal.isOpen}
        onClose={modal.close}
        editing={editing}
        onSaved={() => {
          modal.close();
          load();
        }}
      />
    </PageContainer>
  );
}
