import React, { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Block {
  block_id: string;
  name: string;
  employees_count: number;
  vehicles_count: number;
  tasks_completed: number;
  tasks_total: number;
  monthly_performance: number;
}

interface PerformanceAlertProps {
  selectedBlocks: string[];
}

export const PerformanceAlert: React.FC<PerformanceAlertProps> = ({
  selectedBlocks,
}) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await fetch(`${API_URL}/api/blocks`);
        if (!response.ok) throw new Error("Failed to fetch block data");
        const data = await response.json();
        setBlocks(data);
      } catch (error) {
        console.error("Error fetching blocks:", error);
      }
    };
    fetchBlocks();
  }, [API_URL]);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <span>Performance Insights & Recommendations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedBlocks.map((blockId) => {
          const block = blocks.find((b) => b.block_id === blockId);
          if (!block) return null;

          const completionRate = Math.round(
            (block.tasks_completed / (block.tasks_total || 1)) * 100
          );
          const performance = block.monthly_performance;

          const bgClass =
            performance >= 85
              ? "border-green-500 bg-green-50"
              : performance >= 75
              ? "border-yellow-500 bg-yellow-50"
              : "border-red-500 bg-red-50";

          const statusText =
            performance >= 85
              ? "✅ Excellent Performance"
              : performance >= 75
              ? "⚠️ Good Performance with Room for Improvement"
              : "❌ Needs Immediate Attention";

          const recommendations =
            performance >= 85
              ? [
                  "Maintain current operational standards and best practices",
                  "Consider this team as a benchmark for others",
                  "Document successful strategies for knowledge sharing",
                  ...(completionRate < 90
                    ? [
                        `Focus on completing remaining ${
                          block.tasks_total - block.tasks_completed
                        } pending tasks`,
                      ]
                    : []),
                ]
              : performance >= 75
              ? [
                  "Analyze workflow bottlenecks causing delays",
                  "Provide extra training for low performers",
                  `Review resource allocation - ratio: ${(
                    block.employees_count / (block.vehicles_count || 1)
                  ).toFixed(1)} employees per vehicle`,
                  "Implement weekly progress reviews",
                ]
              : [
                  "⚠️ Urgent: Management intervention",
                  "Investigate root causes of low performance",
                  "Reallocate temporary support resources",
                  "Implement daily team check-ins",
                  "Optimize current task distribution",
                ];

          return (
            <Alert key={block.block_id} className={bgClass}>
              <AlertDescription>
                <div className="space-y-2">
                  <h4 className="font-bold text-lg text-gray-900">
                    {block.name}
                  </h4>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>
                      <strong>Overall Status:</strong> {statusText}
                    </p>
                    <p>
                      <strong>Current Performance:</strong> {performance}%
                      (Monthly Average)
                    </p>
                    <p>
                      <strong>Task Completion Rate:</strong> {completionRate}%
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-300">
                      <p className="font-semibold mb-2">📊 Recommendations:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        {recommendations.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
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
  );
};
