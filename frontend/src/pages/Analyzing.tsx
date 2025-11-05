// src/pages/Analyzing.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlockSelector from "../components/BlockSelector";
import { employeeAPI, taskAPI } from "../services/api";

interface BlockData {
  totalEmployees: number;
  tasksCompleted: number;
  completionRate: string;
}

const Analyzing: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [blockData, setBlockData] = useState<BlockData | null>(null);
  const navigate = useNavigate();

  const handleBlockSelect = async (blockId: string): Promise<void> => {
    try {
      const [employeesRes, tasksRes] = await Promise.all([
        employeeAPI.getByBlock(blockId),
        taskAPI.getByBlock(blockId),
      ]);
      const employees = employeesRes.data;
      const tasks = tasksRes.data;

      const completedTasks = tasks.filter(
        (task: any) => task.progress === 100
      ).length;
      const completionRate =
        tasks.length > 0
          ? ((completedTasks / tasks.length) * 100).toFixed(2)
          : "0";

      setBlockData({
        totalEmployees: employees.length,
        tasksCompleted: completedTasks,
        completionRate,
      });
      setSelectedBlock(blockId);
    } catch (error) {
      console.error("Error fetching block data:", error);
    }
  };

  const handleDeepAnalyze = (): void => {
    if (selectedBlock) {
      navigate(`/block-details/${selectedBlock}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={() => navigate("/")}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
      >
        ← Back to Dashboard
      </button>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Analyzing Page</h1>
      <BlockSelector onSelect={handleBlockSelect} />
      {blockData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-6">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Total Employees
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {blockData.totalEmployees}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Tasks Completed
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {blockData.tasksCompleted}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Completion Rate
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {blockData.completionRate}%
            </p>
          </div>
        </div>
      )}
      {blockData && (
        <button
          onClick={handleDeepAnalyze}
          className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md font-medium"
        >
          Deep Comparison
        </button>
      )}
    </div>
  );
};

export default Analyzing;
