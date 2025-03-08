"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import type { Producer } from "@/lib/types";

interface AreaChartProps {
  producers: Producer[];
}

export function AreaChart({ producers }: AreaChartProps) {
  const data = producers.flatMap((producer) =>
    producer.farms.map((farm) => ({
      name: farm.name,
      total: farm.totalArea,
      agricultural: farm.agriculturalArea,
      vegetation: farm.vegetationArea,
    }))
  );

  return (
    <ResponsiveContainer width="100%" height={350} minWidth={300}>
      <BarChart
        data={data}
        margin={{ top: 10, right: 10, left: 10, bottom: 70 }}
      >
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          angle={-45}
          textAnchor="end"
          height={70}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} ha`}
        />
        <Tooltip
          formatter={(value) => [`${value} ha`, ""]}
          labelStyle={{ color: "#374151" }}
          contentStyle={{
            backgroundColor: "white",
            borderColor: "#e5e7eb",
            borderRadius: "0.375rem",
          }}
        />
        <Bar
          dataKey="agricultural"
          name="Área Agricultável"
          fill="#22c55e"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="vegetation"
          name="Área de Vegetação"
          fill="#16a34a"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
