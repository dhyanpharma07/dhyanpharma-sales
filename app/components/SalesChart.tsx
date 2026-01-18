"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartType = "monthly" | "quarterly" | "yearly";

export default function SalesChart({
  data,
  type,
  onChangeType,
}: {
  data: { label: string; total: number }[];
  type: ChartType;
  onChangeType: (type: ChartType) => void;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
      {/* Toggle buttons */}
      <div className="flex gap-2 mb-4">
        {(["monthly", "quarterly", "yearly"] as ChartType[]).map((t) => (
          <button
            key={t}
            onClick={() => onChangeType(t)}
            className={`px-3 py-1 rounded text-sm transition ${
              type === t
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-gray-100 dark:bg-gray-800"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
