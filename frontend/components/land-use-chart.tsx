"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import type { Producer } from "@/lib/types";

interface LandUseChartProps {
  producers: Producer[];
}

export function LandUseChart({ producers }: LandUseChartProps) {
  // Calculate total areas
  let totalAgricultural = 0;
  let totalVegetation = 0;

  producers.forEach((producer) => {
    producer.farms.forEach((farm) => {
      totalAgricultural += farm.agriculturalArea;
      totalVegetation += farm.vegetationArea;
    });
  });

  const data = [
    { name: "Área Agricultável", value: totalAgricultural },
    { name: "Área de Vegetação", value: totalVegetation },
  ];

  const COLORS = ["#22c55e", "#16a34a"];

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
