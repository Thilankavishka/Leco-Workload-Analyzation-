// src/pages/BlockDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AnalyticsCard from "../components/AnalyticsCard";
import EmployeeCard from "../components/EmployeeCard";
import BlockPerformanceTrend from "../components/BlockPerformanceTrend";
import { blockAPI, employeeAPI, taskAPI } from "../services/api";

const BlockDetails: React.FC = () => {
  const { blockId } = useParams();
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

  if (!block) return <div>Loading...</div>;

  const completedTasks = tasks.filter(
    (task: any) => task.progress === 100
  ).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{block.name} Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Total Employees</h3>
          <p className="text-3xl font-bold text-gray-900">{employees.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Vehicles</h3>
          <p className="text-3xl font-bold text-gray-900">
            {block.vehiclesCount || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Task Completion</h3>
          <p className="text-3xl font-bold text-gray-900">
            {completedTasks}/{tasks.length}
          </p>
        </div>
      </div>
      <AnalyticsCard blockId={blockId!} />
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Employees</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((emp: any) => (
            <EmployeeCard key={emp.id} employee={emp} />
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Ongoing Tasks</h3>
        <ul className="space-y-2">
          {tasks
            .filter((task: any) => task.progress < 100)
            .map((task: any) => (
              <li key={task.id} className="text-gray-600">
                {task.name} - {task.progress}%
              </li>
            ))}
        </ul>
      </div>
      <BlockPerformanceTrend blockId={blockId!} />
      <button
        onClick={() => navigate(`/deep-comparison/${blockId}`)}
        className="bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600"
      >
        Deep Comparison
      </button>
    </div>
  );
};

export default BlockDetails;
