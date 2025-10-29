/**
 * components/performance-chart.tsx
 */
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface PerformanceData {
  name: string;
  performance: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle>Performance Comparison</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Bar dataKey="performance" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default PerformanceChart;
