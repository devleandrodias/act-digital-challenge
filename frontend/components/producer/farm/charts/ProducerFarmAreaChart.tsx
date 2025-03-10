"use client";

import {
  Pie,
  Cell,
  Legend,
  Tooltip,
  PieChart,
  ResponsiveContainer,
} from "recharts";

interface FarmAreaChartProps {
  totalArea: number;
  vegetationArea: number;
  agriculturalArea: number;
}

export function FarmAreaChart(props: FarmAreaChartProps) {
  const totallArea = props.totalArea;
  const vegetationArea = props.vegetationArea;
  const agriculturalArea = props.agriculturalArea;

  const unusedArea = Math.max(
    0,
    totallArea - agriculturalArea - vegetationArea
  );

  const data = [
    { name: "Área Agricultável", value: agriculturalArea },
    { name: "Área de Vegetação", value: vegetationArea },
    { name: "Área Não Utilizada", value: unusedArea },
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
