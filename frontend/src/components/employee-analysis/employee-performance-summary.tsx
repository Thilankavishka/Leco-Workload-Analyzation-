/**
 * employee-performance-summary.tsx
 * 
 * @update 11/04/2025
 */
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp } from "lucide-react";
import type { Block, Employee } from "@/common/type";

interface PerformanceProps {
  block: Block;
  employee: Employee;
}

export const EmployeePerformanceSummary: React.FC<PerformanceProps> = ({ block, employee }) => {
  const performance = employee.performance ?? 0;

  const performanceCategory =
    performance >= 90
      ? "Excellent"
      : performance >= 80
      ? "Good"
      : performance >= 70
      ? "Satisfactory"
      : "Needs Improvement";

  const categoryColor =
    performance >= 90
      ? "text-green-600"
      : performance >= 80
      ? "text-blue-600"
      : performance >= 70
      ? "text-yellow-600"
      : "text-red-600";

  const staff = block.staff ?? [];
  const teamTotal = staff.reduce((acc, e) => acc + (e.performance ?? 0), 0);
  const teamAverage = staff.length ? teamTotal / staff.length : 0;
  const sortedPerformances = staff.map((e) => e.performance ?? 0).sort((a, b) => b - a);
  const employeeRank = sortedPerformances.indexOf(performance) + 1;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <span>Detailed Performance Analysis & Recommendations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Summary */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-gray-900">📊 Performance Summary</h3>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-gray-700">
            <p>
              <strong>Overall Rating:</strong> {performance}% - <span className={categoryColor}>{performanceCategory}</span>
            </p>
            <p>
              <strong>Team Ranking:</strong> #{employeeRank} out of {staff.length} members
            </p>
            <p>
              <strong>Performance vs Team Average:</strong> {(performance - teamAverage).toFixed(1)}% {performance > teamAverage ? "above" : "below"} average
            </p>
          </div>
        </div>

        {/* Key Strengths */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-gray-900">💪 Key Strengths</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
            {performance >= 90 ? (
              <>
                <li>Consistently exceeds performance expectations</li>
                <li>Strong technical expertise in {employee.role ? employee.role.toLowerCase() : 'their role'}</li>
                <li>Reliable team member and potential mentor</li>
                <li>Excellent work quality and efficiency</li>
              </>
            ) : performance >= 80 ? (
              <>
                <li>Meets performance standards reliably</li>
                <li>Shows good technical competence in assigned tasks</li>
                <li>Contributes positively to team objectives</li>
              </>
            ) : (
              <>
                <li>Shows potential for improvement with proper guidance</li>
                <li>Demonstrates willingness to learn and adapt</li>
              </>
            )}
          </ul>
        </div>

        {/* Development Areas */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-gray-900">🎯 Development Areas</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
            {performance >= 90 ? (
              <>
                <li>Consider leadership or mentoring responsibilities</li>
                <li>Opportunity for advanced technical certifications</li>
                <li>Lead special projects or training initiatives</li>
              </>
            ) : performance >= 80 ? (
              <>
                <li>Focus on consistency in high-pressure situations</li>
                <li>Enhance speed without compromising quality</li>
                <li>Develop specialization in technical areas</li>
              </>
            ) : (
              <>
                <li>Focused training on core job responsibilities</li>
                <li>Needs closer supervision and regular feedback</li>
                <li>Participate in skill development programs</li>
              </>
            )}
          </ul>
        </div>

        {/* Recommended Actions */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-gray-900">✅ Recommended Actions</h3>
          <div className="space-y-3">
            {performance >= 90 ? (
              <>
                <Alert className="border-green-500 bg-green-50">
                  <AlertDescription className="text-gray-700">
                    <strong>Immediate:</strong> Recognize outstanding performance and consider advancement opportunities.
                  </AlertDescription>
                </Alert>
                <Alert className="border-blue-500 bg-blue-50">
                  <AlertDescription className="text-gray-700">
                    <strong>Short-term (1-3 months):</strong> Assign mentorship role and involve in special projects or process improvement initiatives.
                  </AlertDescription>
                </Alert>
              </>
            ) : performance >= 80 ? (
              <>
                <Alert className="border-blue-500 bg-blue-50">
                  <AlertDescription className="text-gray-700">
                    <strong>Immediate:</strong> Maintain current performance level with regular feedback.
                  </AlertDescription>
                </Alert>
                <Alert className="border-yellow-500 bg-yellow-50">
                  <AlertDescription className="text-gray-700">
                    <strong>Short-term (1-3 months):</strong> Provide targeted training to improve specific skills.
                  </AlertDescription>
                </Alert>
              </>
            ) : (
              <>
                <Alert className="border-red-500 bg-red-50">
                  <AlertDescription className="text-gray-700">
                    <strong>Immediate:</strong> Discuss performance concerns and create improvement plan.
                  </AlertDescription>
                </Alert>
                <Alert className="border-orange-500 bg-orange-50">
                  <AlertDescription className="text-gray-700">
                    <strong>Short-term (1-3 months):</strong> Implement weekly check-ins, training resources, and monitor progress.
                  </AlertDescription>
                </Alert>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
