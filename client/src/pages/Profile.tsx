import React, { useState } from "react";

type ProfileForm = {
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
};

export default function ProfilePage() {
  // replace initial state with data from your API / auth provider
  const [form, setForm] = useState<ProfileForm>({
    name: "Selvasankar P",
    email: "selva@example.com",
    phone: "9876543210",
    businessName: "Selva Studios",
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setSaved(false);
  }

  async function handleSave(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      // TODO: call your API to save profile
      await new Promise((r) => setTimeout(r, 700));
      setSaved(true);
    } catch (err) {
      console.error(err);
      // show toast / error
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h3 className="text-2xl font-semibold mb-4">Profile</h3>

      <form onSubmit={handleSave} className="space-y-4 bg-white border rounded-lg p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            className="mt-1 block w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Business name</label>
          <input
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save profile"}
          </button>

          {saved && <span className="text-sm text-green-600">Saved</span>}
        </div>
      </form>
    </div>
  );
}
