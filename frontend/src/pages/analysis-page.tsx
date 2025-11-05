/**
 * analysis-page.tsx
 * 
 * @update 11/05/2025
 */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Filter, ChevronDown, Users, Car, Award, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/analysis/metric-card";
import { useBlock } from "@/contexts/block-context";

const AnalysisPage: React.FC = () => {
  const {blockData} = useBlock();
  const navigate = useNavigate();
  const { blockId } = useParams<{ blockId?: string }>();
  const [selectedBlock, setSelectedBlock] = useState<string | null>(blockId || null);

  const handleNavigate = () => {
    if (selectedBlock) navigate(`/block/${selectedBlock}`);
  };

  // Prepare metrics dynamically
  const metrics = (() => {
    if (!selectedBlock) return [];
    const block = blockData?.[selectedBlock];
    const employeesCount = block?.employeesCount ?? 0;
    const vehiclesCount = block?.vehiclesCount ?? 0;
    const tasksCompleted = block?.tasksCompleted ?? 0;
    const tasksTotal = block?.tasksTotal ?? 0;
    const completionRate = tasksTotal > 0 ? Math.round((tasksCompleted / tasksTotal) * 100) : 0;

    return [
      {
        label: "Total Employees",
        value: employeesCount,
        icon: <Users className="w-10 h-10 text-blue-600" />,
      },
      {
        label: "Vehicles Assigned",
        value: vehiclesCount,
        icon: <Car className="w-10 h-10 text-green-600" />,
      },
      {
        label: "Tasks Completed",
        value: `${tasksCompleted}/${tasksTotal}`,
        icon: <Award className="w-10 h-10 text-purple-600" />,
      },
      {
        label: "Completion Rate",
        value: `${completionRate}%`,
        icon: <TrendingUp className="w-10 h-10 text-orange-600" />,
      },
    ];
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2"
          >
            <span>← Back to Dashboard</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Block Analysis</h1>
          <div className="w-32" /> {/* Placeholder for alignment */}
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Block Selection */}
        <Card className="mb-8 shadow-lg backdrop-blur-sm bg-white/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-blue-600" />
              <span>Select Block for Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1 w-full md:w-auto">
                <select
                  value={selectedBlock || ""}
                  onChange={(e) => setSelectedBlock(e.target.value || null)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Choose a block...</option>
                  {Object.keys(blockData).map((key) => (
                    <option key={key} value={key}>
                      {blockData[key].name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <button
                onClick={handleNavigate}
                disabled={!selectedBlock}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors"
              >
                Analyze
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Metrics */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <MetricCard
                key={index}
                label={metric.label}
                value={metric.value}
                icon={metric.icon}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AnalysisPage;