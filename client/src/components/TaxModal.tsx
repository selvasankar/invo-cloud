// client/src/components/TaxModal.tsx
import React, { useEffect } from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { createTax, updateTax } from "../api/tax.api";
import handleError from "../utils/handleError";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  editing?: { id?: number; name?: string; rate?: number } | null;
};

export default function TaxModal({ isOpen, onClose, onSaved, editing }: Props) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { name: editing?.name || "", rate: editing?.rate ?? 0 },
  });

  useEffect(() => {
    reset({ name: editing?.name || "", rate: editing?.rate ?? 0 });
  }, [editing, reset, isOpen]);

  async function onSubmit(values: any) {
    try {
      if (editing && editing.id) {
        await updateTax(editing.id, values);
      } else {
        await createTax(values);
      }
      onSaved();
    } catch (err: any) {
      handleError(err);
    }
  }

  return (
    <Modal isOpen={isOpen} title={editing ? "Edit Tax Rate" : "Add Tax Rate"} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            {...register("name", { required: "Name required" })}
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="e.g. GST 18%"
          />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Rate (%)</label>
          <input
            {...register("rate", { required: "Rate required", min: { value: 0, message: ">= 0" } })}
            type="number"
            step="0.01"
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="18.00"
          />
          {errors.rate && <p className="text-red-600 text-xs mt-1">{errors.rate.message}</p>}
        </div>

        <div className="flex gap-2 mt-2">
          <Button type="submit" disabled={isSubmitting}>{editing ? "Save" : "Create"}</Button>
          <Button type="button" className="bg-gray-200 text-gray-800" onClick={onClose}>Cancel</Button>
        </div>
      </form>
    </Modal>
  );
}
