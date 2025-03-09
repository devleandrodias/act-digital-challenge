"use client";

import {
  Pie,
  Cell,
  Legend,
  Tooltip,
  PieChart,
  ResponsiveContainer,
} from "recharts";

interface LandUseChartProps {
  vegetationArea: number;
  agriculturalArea: number;
  unidentifiedArea: number;
}

export function LandUseChart(props: LandUseChartProps) {
  const data = [
    { name: "Área Agricultável", value: props.agriculturalArea },
    { name: "Área de Vegetação", value: props.vegetationArea },
    { name: "Área Não Identificada", value: props.unidentifiedArea },
  ];

  const COLORS = ["#22c55e", "#16a34a", "#d1d5db"];

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
          {data.map((_, index) => (
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
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
