import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import Loader from "../components/Loader";
import ResponsiveTable from "../components/ResponsiveTable";
import useModal from "../hooks/useModal";
import InventoryModal from "../components/InventoryModal";
import handleError from "../utils/handleError";
import { getInventory } from "../api/inventory.api";


type InventoryRow = {
  id: number;
  product_id: number;
  product_name?: string;
  quantity: number;
};

export default function Inventory() {
  const [items, setItems] = useState<InventoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const modal = useModal();
  const [editing, setEditing] = useState<InventoryRow | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getInventory();
      // normalize shape if API returns wrapped object
      const list = Array.isArray(data) ? data : (data?.data || []);
      setItems(list);
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

  const onAdjust = (row: InventoryRow) => {
    setEditing(row);
    modal.open();
  };

  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Inventory</h1>
        <Button onClick={onAdd}>Add Stock</Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <ResponsiveTable
          columns={["Product", "Quantity", "Actions"]}
          data={items.map((it) => ({
            Product: it.product_name || `#${it.product_id}`,
            Quantity: it.quantity,
            Actions: (
              <div className="flex gap-2">
                <button
                  onClick={() => onAdjust(it)}
                  className="text-sm text-blue-600"
                >
                  Adjust
                </button>
              </div>
            ),
          }))}
        />
      )}

      <InventoryModal
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
