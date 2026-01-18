"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Customer = {
  id: string;
  name: string;
};

export default function EditSalesBillPage() {
  const { id } = useParams();
  const router = useRouter();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [billNumber, setBillNumber] = useState("");
  const [billDate, setBillDate] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [amount, setAmount] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then(setCustomers);

    fetch(`/api/bills?id=${id}`)
      .then((res) => res.json())
      .then((bill) => {
        setBillNumber(bill.billNumber);
        setBillDate(bill.billDate.split("T")[0]);
        setCustomerId(bill.customerId);
        setAmount(bill.billAmount);
      });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const res = await fetch(`/api/bills/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        billNumber,
        billDate,
        customerId,
        billAmount: Number(amount),
      }),
    });

    setSaving(false);

    if (res.ok) {
      alert("Bill updated successfully");
      router.push("/bills");
    } else {
      const data = await res.json();
      alert(data.error || "Failed to update bill");
    }
  }

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Edit Sales Bill</h1>

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
          <label className="block text-sm font-medium">Bill Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          disabled={saving}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update Bill"}
        </button>
      </form>
    </div>
  );
}
