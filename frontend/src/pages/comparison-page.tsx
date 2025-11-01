import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PerformanceAlert } from "@/components/comparison/performance-alert";
import { PerformanceBarChart } from "@/components/comparison/performance-bar-chart";
import { RadarComparisonChart } from "@/components/comparison/radar-comparison-chart";
import { BlockSelector } from "@/components/comparison/block-selector";

const ComparisonPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [performanceHistory, setPerformanceHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all blocks and performance data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blockRes, perfRes] = await Promise.all([
          fetch("http://localhost:5000/api/blocks"),
          fetch("http://localhost:5000/api/performance-history"),
        ]);

        const blockData = await blockRes.json();
        const perfData = await perfRes.json();

        setBlocks(blockData);
        setPerformanceHistory(perfData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Toggle block selection
  const toggleBlock = (blockId: string) => {
    setSelectedBlocks((prev) =>
      prev.includes(blockId)
        ? prev.filter((id) => id !== blockId)
        : [...prev, blockId]
    );
  };

  // ✅ Prepare bar chart data dynamically from DB
  const comparisonData = useMemo(() => {
    return selectedBlocks
      .map((blockId) => {
        const block = blocks.find((b) => b.block_id === blockId);
        if (!block) return null;

        return {
          block: block.name,
          performance: Number(block.monthly_performance || 0),
          completion:
            block.tasks_total && block.tasks_total > 0
              ? Math.round((block.tasks_completed / block.tasks_total) * 100)
              : 0,
          employees: block.employees_count || 0,
          vehicles: block.vehicles_count || 0,
        };
      })
      .filter(Boolean);
  }, [selectedBlocks, blocks]);

  // ✅ Prepare radar chart data from performance history
  const radarData = useMemo(() => {
    if (selectedBlocks.length === 0) return [];

    const metrics = ["Performance", "Task Completion", "Resource Efficiency"];
    const data = metrics.map((metric) => {
      const entry: Record<string, any> = { metric };

      selectedBlocks.forEach((blockId) => {
        const block = blocks.find((b) => b.block_id === blockId);
        if (!block) return;

        const blockName = block.name;
        const performanceRecord = performanceHistory.find(
          (r) => r.block_id === blockId
        );

        if (metric === "Performance") {
          entry[blockName] = Number(
            performanceRecord?.value || block.monthly_performance || 0
          );
        } else if (metric === "Task Completion") {
          entry[blockName] =
            block.tasks_total && block.tasks_total > 0
              ? Math.round((block.tasks_completed / block.tasks_total) * 100)
              : 0;
        } else if (metric === "Resource Efficiency") {
          entry[blockName] = block.vehicles_count
            ? Math.min(95, (block.employees_count / block.vehicles_count) * 10)
            : 0;
        }
      });

      return entry;
    });

    return data;
  }, [selectedBlocks, blocks, performanceHistory]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Loading comparison data...
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-gray-900">
            Deep Block Comparison
          </h1>
          <div className="w-32" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Block Selector */}
        <BlockSelector
          selectedBlocks={selectedBlocks}
          toggleBlock={toggleBlock}
          blocks={blocks} // pass backend data
        />

        {selectedBlocks.length > 0 ? (
          <>
            <PerformanceBarChart data={comparisonData} />
            <RadarComparisonChart
              selectedBlocks={selectedBlocks}
              radarData={radarData}
            />
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
