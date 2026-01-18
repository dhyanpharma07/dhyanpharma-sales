"use client";

import { useState } from "react";

export default function NewCustomerPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    gstNumber: "",
    drugLicense: "",
    panNumber: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Customer added successfully");
      setForm({
        name: "",
        phone: "",
        address: "",
        gstNumber: "",
        drugLicense: "",
        panNumber: "",
      });
    } else {
      alert("Failed to add customer");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Add Customer</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Customer Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="gstNumber"
          placeholder="GST Number"
          value={form.gstNumber}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="drugLicense"
          placeholder="Drug License Number"
          value={form.drugLicense}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="panNumber"
          placeholder="PAN Number"
          value={form.panNumber}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Save Customer
        </button>
      </form>
    </div>
  );
}
