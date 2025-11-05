// src/pages/Dashboard.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardMetrics from "../components/DashboardMetrics";
import BlockCard from "../components/BlockCard";
import PerformanceTrend from "../components/PerformanceTrend";
import { blockAPI } from "../services/api";

const Dashboard: React.FC = () => {
  const [blocks, setBlocks] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlocks = async (): Promise<void> => {
      try {
        const res = await blockAPI.getAll();
        setBlocks(res.data);
      } catch (error) {
        console.error("Error fetching blocks:", error);
      }
    };

    fetchBlocks();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Main Dashboard
        </h1>
        <p className="text-gray-600">
          Overview of LECO workload management metrics and performance.
        </p>
      </div>
      <DashboardMetrics />
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Block Performance Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blocks.map((block: any) => (
            <BlockCard key={block.id} block={block} />
          ))}
        </div>
      </div>
      <div className="mb-8">
        <PerformanceTrend />
      </div>
      <button
        onClick={() => navigate("/analyzing")}
        className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md font-medium"
      >
        Go to Analyzing Page
      </button>
    </div>
  );
};

export default Dashboard;
