// src/pages/BlockDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AnalyticsCard from "../components/AnalyticsCard";
import EmployeeCard from "../components/EmployeeCard";
import BlockPerformanceTrend from "../components/BlockPerformanceTrend";
import { blockAPI, employeeAPI, taskAPI } from "../services/api";

const BlockDetails: React.FC = () => {
  const { blockId } = useParams<{ blockId: string }>();
  const [block, setBlock] = useState<any>(null);
  const [employees, setEmployees] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async (): Promise<void> => {
      if (!blockId) return;
      try {
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
      }
    };

    fetchDetails();
  }, [blockId]);

  if (!block)
    return <div className="container mx-auto px-4 py-8">Loading...</div>;

  const completedTasks = tasks.filter(
    (task: any) => task.progress === 100
  ).length;
  const ongoingTasks = tasks.filter((task: any) => task.progress < 100);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <button
        onClick={() => navigate("/")}
        className="mb-6 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
      >
        ← Back to Dashboard
      </button>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          {block.name} Details
        </h1>
        <p className="text-gray-600 mt-2">
          Comprehensive overview of block operations and performance.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Total Employees
          </h3>
          <p className="text-3xl font-bold text-gray-900">{employees.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Vehicles</h3>
          <p className="text-3xl font-bold text-gray-900">
            {block.vehiclesCount || 0}
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
      </div>
      <AnalyticsCard blockId={blockId!} />
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Employees</h2>
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
                    task.progress > 70
                      ? "bg-green-100 text-green-800"
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
      <button
        onClick={() => navigate(`/deep-comparison/${blockId}`)}
        className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors shadow-md font-medium"
      >
        Deep Comparison
      </button>
    </div>
  );
};

export default BlockDetails;
