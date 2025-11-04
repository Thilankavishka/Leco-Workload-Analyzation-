/**
 * performance-bar-chart.tsx
 * 
 * @update 11/04/2025
 */
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

interface PerformanceBarChartProps {
  data: {
    block: string;
    performance: number;
    completion: number;
    employees: number;
    vehicles: number;
  }[];
}

export const PerformanceBarChart: React.FC<PerformanceBarChartProps> = ({ data }) => (
  <Card className="mb-8 shadow-md">
    <CardHeader>
      <CardTitle>Performance Comparison</CardTitle>
      <CardDescription>Side-by-side performance metrics</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="block" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="performance" fill="#3b82f6" name="Performance %" radius={[8, 8, 0, 0]} />
          <Bar dataKey="completion" fill="#10b981" name="Task Completion %" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
