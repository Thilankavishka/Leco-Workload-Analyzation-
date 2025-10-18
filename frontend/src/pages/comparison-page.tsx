import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import blockData from "@/data/block-data";
import { PerformanceAlert } from "@/components/comparison/performance-alert";
import { PerformanceBarChart } from "@/components/comparison/performance-bar-chart";
import { RadarComparisonChart } from "@/components/comparison/radar-comparison-chart";
import { BlockSelector } from "@/components/comparison/block-selector";

const ComparisonPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);

  // Toggle block selection
  const toggleBlock = (blockId: string) => {
    setSelectedBlocks((prev) =>
      prev.includes(blockId) ? prev.filter((id) => id !== blockId) : [...prev, blockId]
    );
  };

  // Prepare bar chart data
  const comparisonData = useMemo(
    () =>
      selectedBlocks.map((blockId) => {
        const block = blockData[blockId];
        return {
          block: block.name.split(" - ")[0],
          performance: block.performance.monthly,
          completion: Math.round((block.tasks.completed / block.tasks.total) * 100),
          employees: block.employees,
          vehicles: block.vehicles,
        };
      }),
    [selectedBlocks]
  );

  // Prepare radar chart data
  const radarData = useMemo(() => {
    if (selectedBlocks.length === 0) return [];
    return [
      {
        metric: "Performance",
        ...Object.fromEntries(
          selectedBlocks.map((id) => [blockData[id].name.split(" - ")[0], blockData[id].performance.monthly])
        ),
      },
      {
        metric: "Task Completion",
        ...Object.fromEntries(
          selectedBlocks.map((id) => [
            blockData[id].name.split(" - ")[0],
            Math.round((blockData[id].tasks.completed / blockData[id].tasks.total) * 100),
          ])
        ),
      },
      {
        metric: "Resource Efficiency",
        ...Object.fromEntries(
          selectedBlocks.map((id) => [
            blockData[id].name.split(" - ")[0],
            Math.min(95, (blockData[id].employees / blockData[id].vehicles) * 10),
          ])
        ),
      },
    ];
  }, [selectedBlocks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Block Details
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Deep Block Comparison</h1>
          <div className="w-32" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Block Selector */}
        <BlockSelector selectedBlocks={selectedBlocks} toggleBlock={toggleBlock} />

        {/* Show charts and analysis only if blocks are selected */}
        {selectedBlocks.length > 0 ? (
          <>
            {/* Performance Bar Chart */}
            <PerformanceBarChart data={comparisonData} />

            {/* Radar Chart */}
            <RadarComparisonChart selectedBlocks={selectedBlocks} radarData={radarData} />

            {/* Performance Alerts / Recommendations */}
            <PerformanceAlert selectedBlocks={selectedBlocks} />
          </>
        ) : (
          <Alert>
            <AlertDescription>
              <p className="text-center text-gray-600">
                Please select at least one block to view comparison analysis.
              </p>
            </AlertDescription>
          </Alert>
        )}
      </main>
    </div>
  );
};

export default ComparisonPage;
