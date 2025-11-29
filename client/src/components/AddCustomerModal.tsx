// client/src/components/AddCustomerModal.tsx
import React from "react";
import { useForm } from "react-hook-form";
import axios from "../lib/api/axios";
import { useToast } from "./ToastProvider";

type FormValues = {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
};

export default function AddCustomerModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated?: (customer: any) => void;
}) {
  const { register, handleSubmit, reset, formState } = useForm<FormValues>({
    defaultValues: { name: "", email: "", phone: "", address: "" },
  });
  const toast = useToast();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await axios.post("/customers", data);
      toast.push({ message: "Customer created", type: "success" });
      onCreated?.(res.data ?? res);
      reset();
      onClose();
    } catch (err: any) {
      const msg = err?.normalized?.message || err?.response?.data?.message || "Failed to create customer";
      toast.push({ message: msg, type: "error" });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-lg p-6 z-10 w-full max-w-md shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add Customer</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✕</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input {...register("name", { required: true })} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input {...register("email")} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input {...register("phone")} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea {...register("address")} rows={2} className="w-full border p-2 rounded" />
          </div>

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-3 py-1 rounded border">
              Cancel
            </button>
            <button type="submit" className="px-3 py-1 rounded bg-blue-600 text-white">
              {formState.isSubmitting ? "Saving..." : "Save Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
