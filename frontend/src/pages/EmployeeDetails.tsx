// src/pages/EmployeeDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import BackButton from "../components/BackButton";
import { employeeAPI, assignmentAPI, blockAPI } from "../services/api";

const EmployeeDetails: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const [employee, setEmployee] = useState<any>(null);
  const [block, setBlock] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [performanceData, setPerformanceData] = useState<any[]>([]);

  useEffect(() => {
    const fetchDetails = async (): Promise<void> => {
      if (!employeeId) return;
      try {
        const [empRes, assignRes] = await Promise.all([
          employeeAPI.getById(employeeId),
          assignmentAPI.getByEmployee(employeeId),
        ]);
        setEmployee(empRes.data);
        if (empRes.data.blockId) {
          const blockRes = await blockAPI.getById(empRes.data.blockId);
          setBlock(blockRes.data);
        }
        setTasks(assignRes.data.map((assign: any) => assign.task));

        // Mock performance trend data
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
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">Loading...</div>
    );

  const completedTasks = tasks.filter(
    (task: any) => task.progress === 100
  ).length;
  const successRate =
    tasks.length > 0 ? ((completedTasks / tasks.length) * 100).toFixed(2) : "0";

  return (
    <div className="min-h-screen pt-16 pb-8">
      <BackButton />
      {/* Top Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-8 rounded-b-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,#3b82f6_0%,transparent_50%)]"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg text-2xl">
                👤
              </div>
              <div>
                <h1 className="text-3xl font-bold">{employee.name}</h1>
                <p className="opacity-90">{employee.role || "N/A"}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                <span className="font-semibold">Block:</span>{" "}
                {block?.name || employee.blockId}
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                <span className="font-semibold">Phone:</span>{" "}
                {employee.phone || "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Total Tasks
            </h3>
            <p className="text-3xl font-bold text-gray-900">{tasks.length}</p>
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
                    task.progress === 100
                      ? "bg-green-100 text-green-800"
                      : task.progress > 70
                      ? "bg-blue-100 text-blue-800"
                      : task.progress > 50
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {task.progress}%
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
      </div>
    </div>
  );
};

export default EmployeeDetails;
