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
  period: string;
  completion: number;
  handover: number;
}

const PerformanceTrend: React.FC = () => {
  const [data, setData] = useState<TrendData[]>([]);

  useEffect(() => {
    const fetchTrendData = async (): Promise<void> => {
      try {
        const [perfRes, tasksRes] = await Promise.all([
          performanceAPI.getAll(),
          taskAPI.getAll(),
        ]);
        const perfData = perfRes.data;
        const tasks = tasksRes.data;

        // Use raw database performance records directly (no aggregation)
        // Assume one record per period; if duplicates, take the latest/first
        const uniquePeriods = new Map<string, any>();
        perfData.forEach((record: any) => {
          const period = record.period || "Unknown";
          if (!uniquePeriods.has(period)) {
            uniquePeriods.set(period, record);
          }
        });

        const rawTrendData: TrendData[] = Array.from(uniquePeriods.entries())
          .map(([period, record]) => ({
            period,
            completion: record.value || 0,
            handover: 0, // Will set below
          }))
          .sort((a, b) => a.period.localeCompare(b.period)); // Sort by period string

        // For handover, derive from raw tasks data: e.g., ratio of completed tasks (overall, since no per-period dates)
        // To make per-period, would need task dates parsed, but using raw overall for simplicity
        const totalCompleted = tasks.filter(
          (task: any) => task.progress === 100
        ).length;
        const totalHandover = Math.round(
          (totalCompleted / (tasks.length || 1)) * 100
        );
        rawTrendData.forEach((item) => {
          item.handover = totalHandover;
        });

        setData(rawTrendData);
      } catch (error) {
        console.error("Error fetching trend data:", error);
        setData([]); // No fallback mock; show empty chart if no data
      }
    };

    fetchTrendData();
  }, []);

  if (data.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <p className="text-gray-500">
          No performance data available yet. Check back after adding records.
        </p>
      </div>
    );
  }

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
          <XAxis dataKey="period" stroke="#6b7280" fontSize={14} />
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
        Trend based on raw performance history records from the database.
        Handover derived from total completed tasks.
      </p>
    </div>
  );
};

export default PerformanceTrend;
