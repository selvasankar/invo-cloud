import React, { useState } from "react";

export default function SettingsPage() {
  const [autoSend, setAutoSend] = useState(true);
  const [currency, setCurrency] = useState("INR");
  const [emailInvoice, setEmailInvoice] = useState(true);

  async function saveSettings() {
    // TODO: persist to API
    await new Promise((r) => setTimeout(r, 400));
    // show toast
  }

  return (
    <div className="max-w-3xl">
      <h3 className="text-2xl font-semibold mb-4">Settings</h3>

      <div className="bg-white border rounded-lg p-6 space-y-6">
        <section>
          <h4 className="font-medium mb-2">General</h4>
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium">Default currency</div>
              <div className="text-xs text-gray-500">Select the currency for your invoices</div>
            </div>

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border rounded-md p-2"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
        </section>

        <section>
          <h4 className="font-medium mb-2">Invoicing</h4>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Auto-send invoices</div>
              <div className="text-xs text-gray-500">Automatically email invoices when created</div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoSend}
                onChange={() => setAutoSend((s) => !s)}
                className="form-checkbox h-5 w-5"
              />
            </label>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div>
              <div className="text-sm font-medium">Attach PDF to emails</div>
              <div className="text-xs text-gray-500">Include generated PDF when emailing an invoice</div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailInvoice}
                onChange={() => setEmailInvoice((s) => !s)}
                className="form-checkbox h-5 w-5"
              />
            </label>
          </div>
        </section>

        <div className="flex items-center gap-3">
          <button
            onClick={saveSettings}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white"
          >
            Save settings
          </button>
          <button
            onClick={() => {
              setAutoSend(true);
              setCurrency("INR");
              setEmailInvoice(true);
            }}
            className="px-4 py-2 rounded-md border"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
