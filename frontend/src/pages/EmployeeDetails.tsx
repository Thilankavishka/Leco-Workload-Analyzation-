// src/pages/EmployeeDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { employeeAPI, assignmentAPI } from "../services/api";

const EmployeeDetails: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const [employee, setEmployee] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [performanceData, setPerformanceData] = useState<any[]>([]); // Mock or aggregate performance over time
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async (): Promise<void> => {
      if (!employeeId) return;
      try {
        const [empRes, assignRes] = await Promise.all([
          employeeAPI.getById(employeeId),
          assignmentAPI.getByEmployee(employeeId),
        ]);
        setEmployee(empRes.data);
        setTasks(assignRes.data.map((assign: any) => assign.task)); // Extract tasks from assignments

        // Mock performance trend data (e.g., monthly performance; extend with real data if available)
        setPerformanceData([
          { month: "Jan", performance: 70 },
          { month: "Feb", performance: 75 },
          { month: "Mar", performance: 80 },
          { month: "Apr", performance: 85 },
          { month: "May", performance: 90 },
        ]);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchDetails();
  }, [employeeId]);

  if (!employee)
    return <div className="container mx-auto px-4 py-8">Loading...</div>;

  const completedTasks = tasks.filter(
    (task: any) => task.progress === 100
  ).length;
  const successRate =
    tasks.length > 0 ? ((completedTasks / tasks.length) * 100).toFixed(2) : "0";

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
      >
        ← Back
      </button>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {employee.name} Details
        </h1>
        <p className="text-gray-600 mt-2">
          Detailed performance and task overview.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Role</h3>
          <p className="text-3xl font-bold text-gray-900">
            {employee.role || "N/A"}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Overall Performance
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {employee.performance || 0}%
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Success Rate
          </h3>
          <p className="text-3xl font-bold text-gray-900">{successRate}%</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Assigned Tasks
        </h3>
        <ul className="space-y-3 max-h-64 overflow-y-auto">
          {tasks.map((task: any) => (
            <li
              key={task.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <span className="font-medium text-gray-900">{task.name}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.progress > 70
                    ? "bg-green-100 text-green-800"
                    : task.progress > 50
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {task.progress}% Complete
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Performance Trend
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={performanceData}
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
            <Bar dataKey="performance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Monthly performance trend. Aim for consistent growth.
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-600">
          <strong>Phone:</strong> {employee.phone || "N/A"}
        </p>
        <p className="text-gray-600 mt-2">
          <strong>Block:</strong> {employee.blockId}
        </p>
      </div>
    </div>
  );
};

export default EmployeeDetails;
