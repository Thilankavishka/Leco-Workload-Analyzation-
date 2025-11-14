// src/components/ComparisonChart.tsx
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ComparisonChartProps {
  blockId: string;
  compareBlockId: string;
}

interface CompData {
  metric: string;
  [key: string]: string | number;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({
  blockId,
  compareBlockId,
}) => {
  const [comparisonData, setComparisonData] = useState<CompData[]>([]);

  useEffect(() => {
    // Mock comparison data; fetch real from API if extended
    const data: CompData[] = [
      { metric: "Performance", [blockId]: 75, [compareBlockId]: 65 },
      { metric: "Task Completion", [blockId]: 80, [compareBlockId]: 70 },
      { metric: "Employees", [blockId]: 10, [compareBlockId]: 8 },
    ];
    setComparisonData(data);
  }, [blockId, compareBlockId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Performance Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={comparisonData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="metric" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={blockId} fill="#8884d8" />
          <Bar dataKey={compareBlockId} fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonChart;
