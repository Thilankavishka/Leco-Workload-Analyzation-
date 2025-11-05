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
import { employeeAPI } from "../services/api";

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
        const employeesRes = await employeeAPI.getByBlock(blockId);
        const employeesData = employeesRes.data;

        // Performance comparison data
        const perfData: PerfData[] = employeesData.map((emp: any) => ({
          name: emp.name,
          performance: emp.performance || 0,
        }));

        // Task distribution pie data (mock - can be aggregated from tasks)
        const pieData: PieData[] = [
          { name: "High Priority", value: 40 },
          { name: "Medium Priority", value: 30 },
          { name: "Low Priority", value: 30 },
        ];
        setTaskDistData(pieData);
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    if (blockId) fetchAnalytics();
  }, [blockId]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

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
          <h4 className="text-lg font-medium mb-2">Task Distribution</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={taskDistData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
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
