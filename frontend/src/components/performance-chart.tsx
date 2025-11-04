/**
 * performance-chart.tsx
 * 
 * @update 11/04/2025
 */
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  month: string;
  handover: number;
  completion: number;
}

interface PerformanceChartProps {
  data: ChartData[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="month" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
          formatter={(value) => `${value}%`}
        />
        <Legend />
        <Bar
          dataKey="handover"
          fill="#3b82f6"
          name="Project Handover %"
          radius={[8, 8, 0, 0]}
        />
        <Bar
          dataKey="completion"
          fill="#10b981"
          name="Completion Level %"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;
