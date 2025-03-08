"use client";

import {
  Pie,
  Cell,
  Legend,
  Tooltip,
  PieChart,
  ResponsiveContainer,
} from "recharts";

import { Producer } from "@/lib/types";

interface StateChartProps {
  producers: Producer[];
}

export function StateChart({ producers }: StateChartProps) {
  // Count farms by state
  const stateCount: Record<string, number> = {};

  producers.forEach((producer) => {
    producer.farms.forEach((farm) => {
      stateCount[farm.state] = (stateCount[farm.state] || 0) + 1;
    });
  });

  const data = Object.entries(stateCount).map(([state, count]) => ({
    name: state,
    value: count,
  }));

  // Sort by count descending
  data.sort((a, b) => b.value - a.value);

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
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value} fazendas`, ""]}
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
