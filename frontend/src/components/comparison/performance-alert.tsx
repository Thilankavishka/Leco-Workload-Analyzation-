import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import blockData from "@/data/block-data";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface PerformanceAlertProps {
  selectedBlocks: string[];
}

export const PerformanceAlert: React.FC<PerformanceAlertProps> = ({ selectedBlocks }) => (
  <Card className="shadow-md">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <span>Performance Insights & Recommendations</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {selectedBlocks.map((blockId) => {
        const block = blockData[blockId];
        const performance = block.performance.monthly;
        const completionRate = Math.round((block.tasks.completed / block.tasks.total) * 100);

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
                  ? [`Focus on completing remaining ${block.tasks.total - block.tasks.completed} pending tasks`]
                  : []),
              ]
            : performance >= 75
            ? [
                "Analyze workflow bottlenecks causing delays",
                "Provide extra training for low performers",
                `Review resource allocation - ratio: ${(block.employees / block.vehicles).toFixed(1)} employees per vehicle`,
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
          <Alert key={blockId} className={bgClass}>
            <AlertDescription>
              <div className="space-y-2">
                <h4 className="font-bold text-lg text-gray-900">{block.name}</h4>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>
                    <strong>Overall Status:</strong> {statusText}
                  </p>
                  <p>
                    <strong>Current Performance:</strong> {performance}% (Monthly Average)
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
