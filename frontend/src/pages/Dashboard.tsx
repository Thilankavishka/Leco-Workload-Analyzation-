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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-16 pb-4">
      {/* Hero Section - Compact */}
      <div className="bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-900 text-white py-12 px-0 relative overflow-hidden mb-6">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,#3b82f6_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#a855f7_0%,transparent_50%)]"></div>
        </div>
        <div className="relative z-10 w-full text-center">
          <h1 className="text-4xl font-bold mb-2">LECO Dashboard</h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto px-4 mb-4">
            Real-time insights into electricity distribution, workload
            management, and performance metrics across all blocks.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
            <button
              onClick={() => navigate("/analyzing")}
              className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg hover:bg-yellow-300 transition-all duration-200 font-semibold shadow-lg text-sm"
            >
              Analyze Blocks
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full">
        {/* Metrics Row - Compact */}
        <div className="mb-8 w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Key Metrics
          </h2>
          <div className="w-full">
            <DashboardMetrics />
          </div>
        </div>

        {/* Blocks Overview - Compact Grid */}
        <div className="mb-8 w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Block Performance Overview
          </h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {blocks.map((block: any) => (
              <BlockCard key={block.id} block={block} />
            ))}
          </div>
          {blocks.length === 0 && (
            <div className="text-center py-8 w-full">
              <p className="text-gray-500 text-base">
                No blocks available yet. Start by adding your first block.
              </p>
            </div>
          )}
        </div>

        {/* Performance Trend - Compact */}
        <div className="mb-8 w-full">
          <PerformanceTrend />
        </div>

        {/* CTA Section - Compact */}
        <div className="text-center py-8 bg-white rounded-xl shadow-md border border-gray-100 w-full">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Ready to Dive Deeper?
          </h2>
          <p className="text-gray-600 mb-4">
            Explore detailed analytics and comparisons for optimal workload
            management.
          </p>
          <button
            onClick={() => navigate("/analyzing")}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-2 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-semibold text-base shadow-lg"
          >
            Start Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
