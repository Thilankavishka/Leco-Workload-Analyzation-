// src/components/PerformanceTrend.tsx
import React, { useState, useEffect } from "react";
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
import { performanceAPI, taskAPI } from "../services/api";

interface TrendData {
  month: string;
  completion: number;
  handover: number;
}

const PerformanceTrend: React.FC = () => {
  const [data, setData] = useState<TrendData[]>([]);

  useEffect(() => {
    const fetchTrendData = async (): Promise<void> => {
      try {
        await Promise.all([performanceAPI.getAll(), taskAPI.getAll()]); // Fetch but ignore for mock

        // Mock data (replace with real aggregation from API response if needed)
        const trendData: TrendData[] = [
          { month: "Jan", completion: 65, handover: 40 },
          { month: "Feb", completion: 70, handover: 45 },
          { month: "Mar", completion: 75, handover: 50 },
          { month: "Apr", completion: 80, handover: 55 },
          { month: "May", completion: 85, handover: 60 },
        ];
        setData(trendData);
      } catch (error) {
        console.error("Error fetching trend data:", error);
      }
    };

    fetchTrendData();
  }, []);

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        Overall Performance Trend
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" fontSize={14} />
          <YAxis stroke="#6b7280" fontSize={14} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend />
          <Bar
            dataKey="completion"
            fill="#3b82f6"
            name="Completion Level"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="handover"
            fill="#10b981"
            name="Project Handover"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-sm text-gray-500 mt-4 text-center">
        Trend analysis for the last 5 months. Hover for details.
      </p>
    </div>
  );
};

export default PerformanceTrend;
