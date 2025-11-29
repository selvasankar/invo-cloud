// client/src/components/InventoryModal.tsx
import React, { useEffect } from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { addStock, updateStock } from "../api/inventory.api";
import handleError from "../utils/handleError";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  editing?: { id?: number; product_id?: number; quantity?: number } | null;
};

export default function InventoryModal({ isOpen, onClose, onSaved, editing }: Props) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { product_id: editing?.product_id || "", quantity: editing?.quantity || 1 },
  });

  useEffect(() => {
    reset({ product_id: editing?.product_id || "", quantity: editing?.quantity || 1 });
  }, [editing, reset, isOpen]);

  async function onSubmit(values: any) {
    try {
      if (editing && editing.id) {
        await updateStock(editing.id, values.quantity);
      } else {
        await addStock(values);
      }
      onSaved();
    } catch (err: any) {
      handleError(err);
    }
  }

  return (
    <Modal isOpen={isOpen} title={editing ? "Adjust Stock" : "Add Stock"} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product ID</label>
          <input
            {...register("product_id", { required: "Product ID is required" })}
            type="number"
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="Product ID"
          />
          {errors.product_id && <p className="text-red-600 text-xs mt-1">{errors.product_id.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <input
            {...register("quantity", { required: "Quantity required", min: { value: 0, message: ">= 0" } })}
            type="number"
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="Quantity"
          />
          {errors.quantity && <p className="text-red-600 text-xs mt-1">{errors.quantity.message}</p>}
        </div>

        <div className="flex gap-2 mt-2">
          <Button type="submit" disabled={isSubmitting}>{editing ? "Update" : "Add"}</Button>
          <Button type="button" className="bg-gray-200 text-gray-800" onClick={onClose}>Cancel</Button>
        </div>
      </form>
    </Modal>
  );
}
