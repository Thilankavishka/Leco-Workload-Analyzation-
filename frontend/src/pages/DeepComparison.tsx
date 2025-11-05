// src/pages/DeepComparison.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ComparisonChart from "../components/ComparisonChart";
import { blockAPI } from "../services/api";

const DeepComparison: React.FC = () => {
  const { blockId } = useParams<{ blockId: string }>();
  const [blocks, setBlocks] = useState<any[]>([]);
  const [selectedCompareBlock, setSelectedCompareBlock] = useState<string>("");
  const [insights, setInsights] = useState<string>("");
  const [comparisonMetrics, setComparisonMetrics] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlocks = async (): Promise<void> => {
      if (!blockId) return;
      try {
        const res = await blockAPI.getAll();
        setBlocks(res.data.filter((b: any) => b.id !== blockId));
      } catch (error) {
        console.error("Error fetching blocks:", error);
      }
    };

    fetchBlocks();
  }, [blockId]);

  const handleCompare = async (): Promise<void> => {
    if (selectedCompareBlock && blockId) {
      try {
        const [currentBlockRes, compareBlockRes] = await Promise.all([
          blockAPI.getById(blockId),
          blockAPI.getById(selectedCompareBlock),
        ]);
        const current = currentBlockRes.data;
        const compare = compareBlockRes.data;

        // Compute metrics for multi-dimensional analysis
        const taskCompletionCurrent = current.tasksTotal
          ? ((current.tasksCompleted / current.tasksTotal) * 100).toFixed(1)
          : "0";
        const taskCompletionCompare = compare.tasksTotal
          ? ((compare.tasksCompleted / compare.tasksTotal) * 100).toFixed(1)
          : "0";

        setComparisonMetrics({
          performance: {
            current: current.performanceMonthly || 0,
            compare: compare.performanceMonthly || 0,
          },
          taskCompletion: {
            current: parseFloat(taskCompletionCurrent),
            compare: parseFloat(taskCompletionCompare),
          },
          employees: {
            current: current.employeesCount || 0,
            compare: compare.employeesCount || 0,
          },
          vehicles: {
            current: current.vehiclesCount || 0,
            compare: compare.vehiclesCount || 0,
          },
          ongoingTasks: {
            current: current.ongoingTasks?.length || 0,
            compare: compare.ongoingTasks?.length || 0,
          },
        });

        // Generate dynamic insights
        const perfDiff =
          (current.performanceMonthly || 0) - (compare.performanceMonthly || 0);
        const taskDiff =
          parseFloat(taskCompletionCurrent) - parseFloat(taskCompletionCompare);
        let insightText = `Compared to ${compare.name}, your block (${current.name}) `;
        if (perfDiff > 0) {
          insightText += `excels in overall performance by ${perfDiff.toFixed(
            1
          )}%. `;
        } else {
          insightText += `lags in performance by ${Math.abs(perfDiff).toFixed(
            1
          )}%. `;
        }
        if (taskDiff > 0) {
          insightText += `Task completion is stronger by ${taskDiff.toFixed(
            1
          )}%. `;
        } else {
          insightText += `Task completion trails by ${Math.abs(
            taskDiff
          ).toFixed(1)}%. `;
        }
        insightText += `Recommendations: If performance is lower, prioritize employee training on high-priority tasks. Allocate more vehicles if resource utilization is below 80%. Monitor ongoing tasks closely to reduce bottlenecks.`;
        setInsights(insightText);
      } catch (error) {
        console.error("Error in comparison:", error);
        setInsights(`Error loading comparison data. Please try again.`);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Deep Comparison</h1>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Select Block for Comparison
        </h3>
        <select
          value={selectedCompareBlock}
          onChange={(e) => setSelectedCompareBlock(e.target.value)}
          className="block w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select a Block</option>
          {blocks.map((block: any) => (
            <option key={block.id} value={block.id}>
              {block.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleCompare}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!selectedCompareBlock}
        >
          Compare
        </button>
      </div>
      {selectedCompareBlock && comparisonMetrics && (
        <>
          <ComparisonChart
            blockId={blockId!}
            compareBlockId={selectedCompareBlock}
          />
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Multi-Dimensional Analysis
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Metric
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Your Block
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Compared Block
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Difference
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Performance (%)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {comparisonMetrics.performance.current}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {comparisonMetrics.performance.compare}%
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        comparisonMetrics.performance.current >
                        comparisonMetrics.performance.compare
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {comparisonMetrics.performance.current -
                        comparisonMetrics.performance.compare >
                      0
                        ? "+"
                        : ""}
                      {comparisonMetrics.performance.current -
                        comparisonMetrics.performance.compare}
                      %
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Task Completion (%)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {comparisonMetrics.taskCompletion.current}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {comparisonMetrics.taskCompletion.compare}%
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        comparisonMetrics.taskCompletion.current >
                        comparisonMetrics.taskCompletion.compare
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {comparisonMetrics.taskCompletion.current -
                        comparisonMetrics.taskCompletion.compare >
                      0
                        ? "+"
                        : ""}
                      {comparisonMetrics.taskCompletion.current -
                        comparisonMetrics.taskCompletion.compare}
                      %
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Employees
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {comparisonMetrics.employees.current}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {comparisonMetrics.employees.compare}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        comparisonMetrics.employees.current >
                        comparisonMetrics.employees.compare
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {comparisonMetrics.employees.current -
                        comparisonMetrics.employees.compare >
                      0
                        ? "+"
                        : ""}
                      {comparisonMetrics.employees.current -
                        comparisonMetrics.employees.compare}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Vehicles
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {comparisonMetrics.vehicles.current}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {comparisonMetrics.vehicles.compare}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        comparisonMetrics.vehicles.current >
                        comparisonMetrics.vehicles.compare
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {comparisonMetrics.vehicles.current -
                        comparisonMetrics.vehicles.compare >
                      0
                        ? "+"
                        : ""}
                      {comparisonMetrics.vehicles.current -
                        comparisonMetrics.vehicles.compare}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Ongoing Tasks
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {comparisonMetrics.ongoingTasks.current}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {comparisonMetrics.ongoingTasks.compare}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        comparisonMetrics.ongoingTasks.current <
                        comparisonMetrics.ongoingTasks.compare
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {comparisonMetrics.ongoingTasks.current -
                        comparisonMetrics.ongoingTasks.compare >
                      0
                        ? "+"
                        : ""}
                      {comparisonMetrics.ongoingTasks.current -
                        comparisonMetrics.ongoingTasks.compare}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 mt-4">
              This analysis highlights key operational differences. Green
              indicates strengths; red shows areas for improvement.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Performance Insights & Recommendations
            </h3>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg leading-relaxed">
                {insights}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Resource Optimization
                  </h4>
                  <p className="text-blue-700 text-sm">
                    If vehicle count is low, consider reallocating from
                    underutilized blocks to boost efficiency.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">
                    Task Prioritization
                  </h4>
                  <p className="text-green-700 text-sm">
                    Focus on completing ongoing tasks to improve monthly
                    performance scores.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">
                    Employee Development
                  </h4>
                  <p className="text-purple-700 text-sm">
                    Target training for employees with performance below 70% to
                    align with top performers.
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">
                    Benchmarking
                  </h4>
                  <p className="text-yellow-700 text-sm">
                    Regularly compare against this block to track progress
                    quarterly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DeepComparison;
