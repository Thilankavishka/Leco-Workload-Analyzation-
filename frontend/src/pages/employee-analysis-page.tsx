import React from "react";
import { Phone, Building2, Award, TrendingUp, UserCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import blockData from "@/data/block-data";

interface EmployeeAnalysisProps {
  onNavigate: (page: string) => void;
  selectedBlock: string | null;
  selectedEmployee: {
    id: string;
    name: string;
    phone: string;
    role: string;
    performance: number;
  } | null;
  clearEmployee: () => void;
}

const EmployeeAnalysisPage: React.FC<EmployeeAnalysisProps> = ({
  onNavigate,
  selectedBlock,
  selectedEmployee,
  clearEmployee,
}) => {
  if (!selectedBlock || !selectedEmployee) return null;

  const block = blockData[selectedBlock];
  const employee = selectedEmployee;

  // Employee performance category
  const performanceCategory =
    employee.performance >= 90
      ? "Excellent"
      : employee.performance >= 80
      ? "Good"
      : employee.performance >= 70
      ? "Satisfactory"
      : "Needs Improvement";

  const categoryColor =
    employee.performance >= 90
      ? "text-green-600"
      : employee.performance >= 80
      ? "text-blue-600"
      : employee.performance >= 70
      ? "text-yellow-600"
      : "text-red-600";

  // Team comparison data
  const employeeComparison = block.staff.map((emp) => ({
    name: emp.name.split(" ")[0],
    performance: emp.performance,
  }));

  const teamAverage =
    block.staff.reduce((acc, e) => acc + e.performance, 0) /
    block.staff.length;

  const employeeRank =
    block.staff
      .map((e) => e.performance)
      .sort((a, b) => b - a)
      .indexOf(employee.performance) + 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => {
              clearEmployee();
              onNavigate("blockDetails");
            }}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Block Details
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Employee Performance Analysis
          </h1>
          <div className="w-32" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Employee Profile */}
        <Card className="mb-8 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{employee.name}</CardTitle>
                <CardDescription className="text-blue-100">
                  {employee.role} • {employee.id}
                </CardDescription>
              </div>
              <UserCheck className="w-16 h-16 opacity-80" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Contact</p>
                  <p className="font-semibold text-gray-900">{employee.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Building2 className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Block</p>
                  <p className="font-semibold text-gray-900">
                    {block.name.split(" - ")[0]}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Performance Score</p>
                  <p className={`font-semibold text-2xl ${categoryColor}`}>
                    {employee.performance}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance & Team Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Circular Performance */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Individual Performance</CardTitle>
              <CardDescription>Current performance assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative w-56 h-56">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="112"
                      cy="112"
                      r="100"
                      stroke="#e5e7eb"
                      strokeWidth="20"
                      fill="none"
                    />
                    <circle
                      cx="112"
                      cy="112"
                      r="100"
                      stroke={
                        employee.performance >= 90
                          ? "#10b981"
                          : employee.performance >= 80
                          ? "#3b82f6"
                          : employee.performance >= 70
                          ? "#f59e0b"
                          : "#ef4444"
                      }
                      strokeWidth="20"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 100}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 100 * (1 - employee.performance / 100)
                      }`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-6xl font-bold text-gray-900">
                      {employee.performance}%
                    </p>
                    <p className={`text-lg font-semibold mt-2 ${categoryColor}`}>
                      {performanceCategory}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Bar Chart */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Team Comparison</CardTitle>
              <CardDescription>
                Performance relative to {block.name.split(" - ")[0]} team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={employeeComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="performance" radius={[8, 8, 0, 0]}>
                    {employeeComparison.map((entry, index) => (
                      <Bar
                        key={index}
                        dataKey="performance"
                        fill={
                          entry.name === employee.name.split(" ")[0]
                            ? "#3b82f6"
                            : "#94a3b8"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis & Recommendations */}
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
              <h3 className="font-semibold text-lg mb-3 text-gray-900">
                📊 Performance Summary
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-gray-700">
                <p>
                  <strong>Overall Rating:</strong> {employee.performance}% -{" "}
                  <span className={categoryColor}>{performanceCategory}</span>
                </p>
                <p>
                  <strong>Team Ranking:</strong> #{employeeRank} out of{" "}
                  {block.staff.length} members
                </p>
                <p>
                  <strong>Performance vs Team Average:</strong>{" "}
                  {(employee.performance - teamAverage).toFixed(1)}%{" "}
                  {employee.performance > teamAverage ? "above" : "below"} average
                </p>
              </div>
            </div>

            {/* Strengths */}
            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-900">
                💪 Key Strengths
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
                {employee.performance >= 90 ? (
                  <>
                    <li>Consistently exceeds performance expectations</li>
                    <li>Demonstrates strong technical expertise in {employee.role.toLowerCase()}</li>
                    <li>Serves as a reliable team member and potential mentor</li>
                    <li>Shows excellent work quality and efficiency</li>
                  </>
                ) : employee.performance >= 80 ? (
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
              <h3 className="font-semibold text-lg mb-3 text-gray-900">
                🎯 Development Areas
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
                {employee.performance >= 90 ? (
                  <>
                    <li>Consider leadership or mentoring responsibilities</li>
                    <li>Opportunity for advanced technical certifications</li>
                    <li>Could lead special projects or training initiatives</li>
                  </>
                ) : employee.performance >= 80 ? (
                  <>
                    <li>Focus on consistency in high-pressure situations</li>
                    <li>Enhance speed without compromising quality</li>
                    <li>Develop specialization in specific technical areas</li>
                  </>
                ) : (
                  <>
                    <li>Requires focused training on core job responsibilities</li>
                    <li>Needs closer supervision and regular feedback</li>
                    <li>Should participate in skill development programs</li>
                  </>
                )}
              </ul>
            </div>

            {/* Recommended Actions */}
            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-900">
                ✅ Recommended Actions
              </h3>
              <div className="space-y-3">
                {employee.performance >= 90 ? (
                  <>
                    <Alert className="border-green-500 bg-green-50">
                      <AlertDescription className="text-gray-700">
                        <strong>Immediate:</strong> Recognize outstanding performance with formal commendation and consider advancement opportunities.
                      </AlertDescription>
                    </Alert>
                    <Alert className="border-blue-500 bg-blue-50">
                      <AlertDescription className="text-gray-700">
                        <strong>Short-term (1-3 months):</strong> Assign mentorship role and involve in special projects or process improvement initiatives.
                      </AlertDescription>
                    </Alert>
                  </>
                ) : employee.performance >= 80 ? (
                  <>
                    <Alert className="border-blue-500 bg-blue-50">
                      <AlertDescription className="text-gray-700">
                        <strong>Immediate:</strong> Maintain current performance level with regular feedback.
                      </AlertDescription>
                    </Alert>
                    <Alert className="border-yellow-500 bg-yellow-50">
                      <AlertDescription className="text-gray-700">
                        <strong>Short-term (1-3 months):</strong> Provide targeted training to improve specific skills and aim for 90%+ performance.
                      </AlertDescription>
                    </Alert>
                  </>
                ) : (
                  <>
                    <Alert className="border-red-500 bg-red-50">
                      <AlertDescription className="text-gray-700">
                        <strong>Immediate:</strong> Schedule one-on-one meeting to discuss performance concerns and create an improvement plan.
                      </AlertDescription>
                    </Alert>
                    <Alert className="border-orange-500 bg-orange-50">
                      <AlertDescription className="text-gray-700">
                        <strong>Short-term (1-3 months):</strong> Implement weekly check-ins, provide training resources, and monitor progress closely.
                      </AlertDescription>
                    </Alert>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EmployeeAnalysisPage;
