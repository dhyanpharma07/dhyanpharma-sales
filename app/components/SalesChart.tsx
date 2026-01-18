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

type ChartData = {
  label: string;
  total: number;
};

export default function SalesChart({
  data,
  type,
  onChangeType,
}: {
  data: ChartData[];
  type: ChartType;
  onChangeType: (type: ChartType) => void;
}) {
  return (
    <div className="rounded-lg bg-white dark:bg-gray-900 p-6 shadow space-y-4">
      {/* Header + Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Sales Trend
        </h2>

        <div className="flex gap-1 rounded-md bg-gray-100 dark:bg-gray-800 p-1">
          {(["monthly", "quarterly", "yearly"] as ChartType[]).map(
            (t) => (
              <button
                key={t}
                onClick={() => onChangeType(t)}
                className={`px-3 py-1.5 text-sm rounded-md transition font-medium ${
                  type === t
                    ? "bg-white text-gray-900 shadow dark:bg-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            )
          )}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis
            dataKey="label"
            stroke="#9ca3af"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />
          <YAxis
            stroke="#9ca3af"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              borderRadius: "8px",
              border: "none",
              color: "#fff",
            }}
            labelStyle={{ color: "#9ca3af" }}
            formatter={(value) => {
                if (typeof value !== "number") return ["—", "Sales"];
              
                return [
                  `₹ ${value.toLocaleString("en-IN")}`,
                  "Sales",
                ];
              }}
          />

          <Line
            type="monotone"
            dataKey="total"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
