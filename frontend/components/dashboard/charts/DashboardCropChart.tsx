"use client";

import {
  Pie,
  Cell,
  Legend,
  Tooltip,
  PieChart,
  ResponsiveContainer,
} from "recharts";

type CropChartProps = {
  cropsByType: { name: string; value: number }[];
};

export function CropChart(props: CropChartProps) {
  const COLORS = [
    "#16a34a",
    "#22c55e",
    "#4ade80",
    "#86efac",
    "#bbf7d0",
    "#15803d",
    "#166534",
    "#14532d",
    "#dcfce7",
    "#a7f3d0",
  ];

  return (
    <ResponsiveContainer width="100%" height={300} minWidth={200}>
      <PieChart>
        <Pie
          data={props.cropsByType}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {props.cropsByType.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value} ocorrências`, ""]}
          contentStyle={{
            backgroundColor: "white",
            borderColor: "#e5e7eb",
            borderRadius: "0.375rem",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
