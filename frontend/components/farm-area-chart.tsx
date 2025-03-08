"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import type { Farm } from "@/lib/types";

interface FarmAreaChartProps {
  farm: Farm;
}

export function FarmAreaChart({ farm }: FarmAreaChartProps) {
  const data = [
    { name: "Área Agricultável", value: farm.agriculturalArea },
    { name: "Área de Vegetação", value: farm.vegetationArea },
    {
      name: "Área Não Utilizada",
      value: Math.max(
        0,
        farm.totalArea - farm.agriculturalArea - farm.vegetationArea
      ),
    },
  ].filter((item) => item.value > 0);

  const COLORS = ["#22c55e", "#16a34a", "#d1d5db"];

  return (
    <ResponsiveContainer width="100%" height={200} minWidth={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={60}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value} ha`, ""]}
          contentStyle={{
            backgroundColor: "white",
            borderColor: "#e5e7eb",
            borderRadius: "0.375rem",
          }}
        />
        <Legend layout="vertical" verticalAlign="middle" align="right" />
      </PieChart>
    </ResponsiveContainer>
  );
}
