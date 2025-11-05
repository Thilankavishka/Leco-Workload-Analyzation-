// src/components/AnalyticsCard.tsx
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
import { PieChart, Pie, Cell } from "recharts";
import { employeeAPI, taskAPI } from "../services/api";

interface AnalyticsCardProps {
  blockId: string;
}

interface PerfData {
  name: string;
  performance: number;
}

interface PieData {
  name: string;
  value: number;
  [key: string]: any;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ blockId }) => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [taskDistData, setTaskDistData] = useState<PieData[]>([]);

  useEffect(() => {
    const fetchAnalytics = async (): Promise<void> => {
      try {
        const [employeesRes, tasksRes] = await Promise.all([
          employeeAPI.getByBlock(blockId),
          taskAPI.getByBlock(blockId),
        ]);
        const employeesData = employeesRes.data;
        const tasks = tasksRes.data;

        // Performance comparison data
        const perfData: PerfData[] = employeesData.map((emp: any) => ({
          name: emp.name,
          performance: emp.performance || 0,
        }));

        // Use tasksAssigned from employee data for pie chart
        const pieData: PieData[] = employeesData
          .map((emp: any) => ({
            name: emp.name,
            value: emp.tasksAssigned || 0,
          }))
          .filter((item) => item.value > 0); // Filter out employees with 0 tasks

        setTaskDistData(pieData);
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    if (blockId) fetchAnalytics();
  }, [blockId]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A855F7",
    "#EC4899",
    "#F59E0B",
    "#10B981",
    "#3B82F6",
    "#EF4444",
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">
        Employee Performance Analytics
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-medium mb-2">Performance Comparison</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={employees}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="performance" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h4 className="text-lg font-medium mb-2">
            Task Distribution by Employee
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={taskDistData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}\n(${value} tasks)`}
                labelLine={false}
              >
                {taskDistData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
