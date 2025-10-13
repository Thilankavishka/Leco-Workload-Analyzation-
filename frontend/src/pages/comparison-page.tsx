import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import blockData from "@/data/block-data";

interface ComparisonPageProps {
  onNavigate?: (page: string) => void;
}

const ComparisonPage: React.FC<ComparisonPageProps> = ({ onNavigate }) => {
  const [comparisonBlocks, setComparisonBlocks] = useState<string[]>([]);

  const handleBlockToggle = (blockId: string) => {
    setComparisonBlocks((prev) =>
      prev.includes(blockId)
        ? prev.filter((id) => id !== blockId)
        : [...prev, blockId]
    );
  };

  const comparisonData = comparisonBlocks.map((blockId) => ({
    block: blockData[blockId].name.split(" - ")[0],
    performance: blockData[blockId].performance.monthly,
    completion: Math.round(
      (blockData[blockId].tasks.completed / blockData[blockId].tasks.total) * 100
    ),
    employees: blockData[blockId].employees,
    vehicles: blockData[blockId].vehicles,
  }));

  const radarData =
    comparisonBlocks.length > 0
      ? [
          {
            metric: "Performance",
            ...Object.fromEntries(
              comparisonBlocks.map((id) => [
                blockData[id].name.split(" - ")[0],
                blockData[id].performance.monthly,
              ])
            ),
          },
          {
            metric: "Task Completion",
            ...Object.fromEntries(
              comparisonBlocks.map((id) => [
                blockData[id].name.split(" - ")[0],
                Math.round(
                  (blockData[id].tasks.completed /
                    blockData[id].tasks.total) *
                    100
                ),
              ])
            ),
          },
          {
            metric: "Resource Efficiency",
            ...Object.fromEntries(
              comparisonBlocks.map((id) => [
                blockData[id].name.split(" - ")[0],
                Math.min(
                  95,
                  (blockData[id].employees / blockData[id].vehicles) * 10
                ),
              ])
            ),
          },
        ]
      : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => onNavigate?.("blockDetails")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Block Details
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Deep Block Comparison
          </h1>
          <div className="w-32"></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle>Select Blocks to Compare</CardTitle>
            <CardDescription>
              Choose multiple blocks for comprehensive analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.keys(blockData).map((blockId) => (
                <label
                  key={blockId}
                  className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    comparisonBlocks.includes(blockId)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={comparisonBlocks.includes(blockId)}
                    onChange={() => handleBlockToggle(blockId)}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="font-medium text-gray-900">
                    {blockData[blockId].name}
                  </span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {comparisonBlocks.length > 0 ? (
          <>
            <Card className="mb-8 shadow-md">
              <CardHeader>
                <CardTitle>Performance Comparison</CardTitle>
                <CardDescription>
                  Side-by-side performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="block" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="performance"
                      fill="#3b82f6"
                      name="Performance %"
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar
                      dataKey="completion"
                      fill="#10b981"
                      name="Task Completion %"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="mb-8 shadow-md">
              <CardHeader>
                <CardTitle>Multi-Dimensional Analysis</CardTitle>
                <CardDescription>
                  Comparison across key operational metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    {comparisonBlocks.map((blockId, idx) => (
                      <Radar
                        key={blockId}
                        name={blockData[blockId].name.split(" - ")[0]}
                        dataKey={blockData[blockId].name.split(" - ")[0]}
                        stroke={[
                          "#3b82f6",
                          "#10b981",
                          "#f59e0b",
                          "#ef4444",
                          "#8b5cf6",
                        ][idx % 5]}
                        fill={[
                          "#3b82f6",
                          "#10b981",
                          "#f59e0b",
                          "#ef4444",
                          "#8b5cf6",
                        ][idx % 5]}
                        fillOpacity={0.3}
                      />
                    ))}
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span>Performance Insights & Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {comparisonBlocks.map((blockId) => {
                  const block = blockData[blockId];
                  const performance = block.performance.monthly;
                  const completionRate = Math.round(
                    (block.tasks.completed / block.tasks.total) * 100
                  );

                  return (
                    <Alert
                      key={blockId}
                      className={`${
                        performance >= 85
                          ? "border-green-500 bg-green-50"
                          : performance >= 75
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-red-500 bg-red-50"
                      }`}
                    >
                      <AlertDescription>
                        <div className="space-y-2">
                          <h4 className="font-bold text-lg text-gray-900">
                            {block.name}
                          </h4>
                          <div className="space-y-1 text-sm text-gray-700">
                            <p>
                              <strong>Overall Status:</strong>{" "}
                              {performance >= 85
                                ? "✅ Excellent Performance"
                                : performance >= 75
                                ? "⚠️ Good Performance with Room for Improvement"
                                : "❌ Needs Immediate Attention"}
                            </p>
                            <p>
                              <strong>Current Performance:</strong> {performance}
                              % (Monthly Average)
                            </p>
                            <p>
                              <strong>Task Completion Rate:</strong>{" "}
                              {completionRate}%
                            </p>

                            <div className="mt-3 pt-3 border-t border-gray-300">
                              <p className="font-semibold mb-2">
                                📊 Recommendations:
                              </p>
                              <ul className="list-disc list-inside space-y-1 ml-2">
                                {performance >= 85 ? (
                                  <>
                                    <li>
                                      Maintain current operational standards and
                                      best practices
                                    </li>
                                    <li>
                                      Consider this team as a benchmark for
                                      others
                                    </li>
                                    <li>
                                      Document successful strategies for
                                      knowledge sharing
                                    </li>
                                    {completionRate < 90 && (
                                      <li>
                                        Focus on completing remaining{" "}
                                        {block.tasks.total -
                                          block.tasks.completed}{" "}
                                        pending tasks
                                      </li>
                                    )}
                                  </>
                                ) : performance >= 75 ? (
                                  <>
                                    <li>
                                      Analyze workflow bottlenecks causing
                                      delays
                                    </li>
                                    <li>
                                      Provide extra training for low performers
                                    </li>
                                    <li>
                                      Review resource allocation - ratio:{" "}
                                      {(
                                        block.employees / block.vehicles
                                      ).toFixed(1)}{" "}
                                      employees per vehicle
                                    </li>
                                    <li>
                                      Implement weekly progress reviews
                                    </li>
                                  </>
                                ) : (
                                  <>
                                    <li>⚠️ Urgent: Management intervention</li>
                                    <li>
                                      Investigate root causes of low performance
                                    </li>
                                    <li>
                                      Reallocate temporary support resources
                                    </li>
                                    <li>
                                      Implement daily team check-ins
                                    </li>
                                    <li>
                                      Optimize current task distribution
                                    </li>
                                  </>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  );
                })}
              </CardContent>
            </Card>
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