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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-6">
      {/* ✅ Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-900 text-white py-10 sm:py-14 px-4 sm:px-8 relative overflow-hidden mb-8 sm:mb-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,#3b82f6_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#a855f7_0%,transparent_50%)]"></div>
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">LECO Dashboard</h1>
          <p className="text-base sm:text-lg lg:text-xl opacity-90 max-w-2xl sm:max-w-3xl mx-auto px-2 sm:px-4 mb-6">
            Real-time insights into electricity distribution, workload management, and performance metrics across all blocks.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center px-2 sm:px-0">
            <button
              onClick={() => navigate("/analyzing")}
              className="bg-yellow-400 text-blue-900 px-6 py-2 sm:px-8 sm:py-3 rounded-lg hover:bg-yellow-300 transition-all duration-200 font-semibold shadow-md text-sm sm:text-base"
            >
              Analyze Blocks
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Metrics Section */}
      <section className="mb-10 px-4 sm:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">Key Metrics</h2>
        <div className="w-full">
          <DashboardMetrics />
        </div>
      </section>

      {/* ✅ Block Cards Section */}
      <section className="mb-10 px-4 sm:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
          Block Performance Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {blocks.map((block: any) => (
            <BlockCard key={block.id} block={block} />
          ))}
        </div>

        {blocks.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-base sm:text-lg">
              No blocks available yet. Start by adding your first block.
            </p>
          </div>
        )}
      </section>

      {/* ✅ Performance Trend Section */}
      <section className="mb-10 px-4 sm:px-8">
        <PerformanceTrend />
      </section>

      {/* ✅ Call-to-Action Section */}
      <section className="text-center py-8 sm:py-12 bg-white mx-4 sm:mx-8 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3">
          Ready to Dive Deeper?
        </h2>
        <p className="text-gray-600 mb-5 text-sm sm:text-base max-w-xl mx-auto">
          Explore detailed analytics and comparisons for optimal workload management.
        </p>
        <button
          onClick={() => navigate("/analyzing")}
          className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-2 sm:px-10 sm:py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-semibold text-sm sm:text-base shadow-lg"
        >
          Start Analysis
        </button>
      </section>
    </div>
  );
};

export default Dashboard;
