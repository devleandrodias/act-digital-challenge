"use client";

import { Farm } from "@/types/farm.types";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface FarmCropsChartProps {
  farm: Farm | null;
}

export function FarmCropsChart({ farm }: FarmCropsChartProps) {
  // Count crops
  const cropCount: Record<string, number> = {};

  farm?.harvests.forEach((harvest) => {
    harvest.crops.forEach((crop) => {
      cropCount[crop.name] = (cropCount[crop.name] || 0) + 1;
    });
  });

  const data = Object.entries(cropCount).map(([crop, count]) => ({
    name: crop,
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

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] text-sm text-muted-foreground">
        Nenhuma cultura cadastrada
      </div>
    );
  }

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
          formatter={(value) => [`${value} ocorrências`, ""]}
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
