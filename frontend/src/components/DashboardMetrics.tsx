// src/components/DashboardMetrics.tsx
import React, { useState, useEffect } from "react";
import { blockAPI, employeeAPI, taskAPI } from "../services/api";

const DashboardMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState({
    totalBlocks: 0,
    totalTasks: 0,
    totalEmployees: 0,
    completedTasks: 0,
  });

  useEffect(() => {
    const fetchMetrics = async (): Promise<void> => {
      try {
        const [blocksRes, employeesRes, tasksRes] = await Promise.all([
          blockAPI.getAll(),
          employeeAPI.getAll(),
          taskAPI.getAll(),
        ]);
        const blocks = blocksRes.data;
        const employees = employeesRes.data;
        const tasks = tasksRes.data;

        setMetrics({
          totalBlocks: blocks.length,
          totalEmployees: employees.length,
          totalTasks: tasks.length,
          completedTasks: tasks.filter((task: any) => task.progress === 100)
            .length,
        });
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchMetrics();
  }, []);

  const metricCards = [
    {
      title: "Total Blocks",
      value: metrics.totalBlocks,
      color: "bg-blue-500",
      icon: "🏗️",
    },
    {
      title: "Total Tasks",
      value: metrics.totalTasks,
      color: "bg-green-500",
      icon: "📋",
    },
    {
      title: "Total Employees",
      value: metrics.totalEmployees,
      color: "bg-purple-500",
      icon: "👥",
    },
    {
      title: "Completed Projects",
      value: metrics.completedTasks,
      color: "bg-yellow-500",
      icon: "✅",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mx-4">
      {metricCards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform duration-200`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">{card.title}</p>
              <p className="text-3xl font-bold mt-1">{card.value}</p>
            </div>
            <span className="text-3xl">{card.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMetrics;
