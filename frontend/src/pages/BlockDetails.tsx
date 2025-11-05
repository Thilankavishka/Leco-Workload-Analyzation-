// src/pages/BlockDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AnalyticsCard from "../components/AnalyticsCard";
import EmployeeCard from "../components/EmployeeCard";
import BlockPerformanceTrend from "../components/BlockPerformanceTrend";
import BackButton from "../components/BackButton";
import { blockAPI, employeeAPI, taskAPI } from "../services/api";

const BlockDetails: React.FC = () => {
  const { blockId } = useParams<{ blockId: string }>();
  const [block, setBlock] = useState<any>(null);
  const [employees, setEmployees] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async (): Promise<void> => {
      if (!blockId) return;
      try {
        setLoading(true);
        const [blockRes, empRes, taskRes] = await Promise.all([
          blockAPI.getById(blockId),
          employeeAPI.getByBlock(blockId),
          taskAPI.getByBlock(blockId),
        ]);
        setBlock(blockRes.data);
        setEmployees(empRes.data);
        setTasks(taskRes.data);
      } catch (error) {
        console.error("Error fetching block details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [blockId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-16 pb-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading block details...</p>
        </div>
      </div>
    );
  }

  if (!block) {
    return (
      <div className="min-h-screen pt-16 pb-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Block not found.</p>
        </div>
      </div>
    );
  }

  const completedTasks = tasks.filter(
    (task: any) => task.progress === 100
  ).length;
  const ongoingTasks = tasks.filter((task: any) => task.progress < 100);

  return (
    <div className="min-h-screen pt-16 pb-8">
      <BackButton />
      {/* Top Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-700 text-white px-8 py-8 rounded-b-3xl shadow-2xl relative overflow-hidden mb-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,#10b981_0%,transparent_50%)]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg text-2xl">
                🏗️
              </div>
              <div>
                <h1 className="text-3xl font-bold">{block.name}</h1>
                <p className="opacity-90">Electricity Distribution Block</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                <span className="font-semibold">Monthly Performance:</span>{" "}
                {block.performanceMonthly || 0}%
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                <span className="font-semibold">Vehicles:</span>{" "}
                {block.vehiclesCount || 0}
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                <span className="font-semibold">Total Tasks:</span>{" "}
                {block.tasksTotal || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Total Employees
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {employees.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Task Completion
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {completedTasks}/{tasks.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Ongoing Tasks
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {ongoingTasks.length}
            </p>
          </div>
        </div>

        <AnalyticsCard blockId={blockId!} />

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Team Members
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((emp: any) => (
              <EmployeeCard key={emp.id} employee={emp} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Ongoing Tasks
            </h3>
            <ul className="space-y-3 max-h-96 overflow-y-auto">
              {ongoingTasks.map((task: any) => (
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
          <BlockPerformanceTrend blockId={blockId!} />
        </div>

        <div className="text-center">
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors shadow-md font-medium text-lg">
            Deep Comparison
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockDetails;
