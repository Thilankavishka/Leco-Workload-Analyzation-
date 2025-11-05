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

        // Derive performance trend from tasks: average progress grouped by month of startDate
        const tasksWithMonth = assignRes.data.map((assign: any) => {
          const startDate = new Date(assign.task.startDate);
          const month = startDate.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          });
          return { month, progress: assign.task.progress || 0 };
        });

        const monthlyAvg = tasksWithMonth.reduce((acc: any, current: any) => {
          if (!acc[current.month]) {
            acc[current.month] = { total: 0, count: 0 };
          }
          acc[current.month].total += current.progress;
          acc[current.month].count += 1;
          return acc;
        }, {});

        const trendData = Object.entries(monthlyAvg)
          .map(([month, stats]) => ({
            month,
            performance: Math.round(stats.total / stats.count),
          }))
          .sort(
            (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
          );

        setPerformanceData(trendData.length > 0 ? trendData : []);
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task: any) => {
              const status = task.progress === 100 ? "Completed" : "Ongoing";
              const endDate = task.endDate || "N/A";

              return (
                <div
                  key={task.id}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {task.name}
                  </h4>
                  <div className="mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {task.progress}% Progress
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Start:</span>{" "}
                    {new Date(task.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">End:</span>{" "}
                    {endDate !== "N/A"
                      ? new Date(endDate).toLocaleDateString()
                      : "Ongoing"}
                  </p>
                </div>
              );
            })}
          </div>
          {tasks.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No tasks assigned yet.
            </p>
          )}
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
            Monthly performance trend derived from task progress. Aim for
            consistent growth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
