"use client";

import { useEffect, useState } from "react";

type Customer = {
  id: string;
  name: string;
};

export default function NewSalesBillPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [billNumber, setBillNumber] = useState("DB-T/11");
  const [billDate, setBillDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [amount, setAmount] = useState("");
  const [saving, setSaving] = useState(false); // 🔧 new

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then(setCustomers);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!customerId) {
      alert("Please select a customer");
      return;
    }

    setSaving(true); // 🔧

    const res = await fetch("/api/bills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        billNumber,
        billDate,
        customerId,
        billAmount: Number(amount), // ✅ correct field
      }),
    });

    const data = await res.json(); // 🔧 capture error message

    setSaving(false); // 🔧

    if (res.ok) {
      alert("Sales bill saved successfully");
      setAmount("");
    } else {
      console.error("Bill save failed:", data);
      alert(data.error || "Failed to save bill");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Add Sales Bill</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Bill Number</label>
          <input
            value={billNumber}
            onChange={(e) => setBillNumber(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Bill Date</label>
          <input
            type="date"
            value={billDate}
            onChange={(e) => setBillDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Customer</label>
          <select
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Bill Amount (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          disabled={saving}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Bill"}
        </button>
      </form>
    </div>
  );
}
