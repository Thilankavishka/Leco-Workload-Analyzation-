// src/pages/employee-analysis-page.tsx
import React, { useState } from "react";
import { Phone, Building2, Award, TrendingUp, UserCheck, CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
    tasksCompleted: number;
    tasksAssigned: number;
  } | null;
  clearEmployee: () => void;
}

const EmployeeAnalysisPage: React.FC<EmployeeAnalysisProps> = ({
  onNavigate,
  selectedBlock,
  selectedEmployee,
  clearEmployee,
}) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  if (!selectedBlock || !selectedEmployee) return null;

  const block = blockData[selectedBlock];
  const employee = selectedEmployee;

  // Filter tasks assigned to the employee
  const employeeTasks = block.ongoingTasks.filter((task) =>
    task.assignedTo.includes(employee.id)
  );

  // Filter tasks by date range
  const filteredTasks = employeeTasks.filter((task) => {
    if (!startDate && !endDate) return true;
    const taskStart = new Date(task.startDate);
    const taskEnd = task.endDate ? new Date(task.endDate) : new Date();
    const filterStart = startDate ? new Date(startDate) : new Date(0);
    const filterEnd = endDate ? new Date(endDate) : new Date();
    return taskStart >= filterStart && taskEnd <= filterEnd;
  });

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


  const teamAverage =
    block.staff.reduce((acc, e) => acc + e.performance, 0) /
    block.staff.length;

  const employeeRank =
    block.staff
      .map((e) => e.performance)
      .sort((a, b) => b - a)
      .indexOf(employee.performance) + 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
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

        {/* Task List with Date Filter */}
        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              <span>Assigned Tasks</span>
            </CardTitle>
            <CardDescription>
              Tasks assigned to {employee.name} with progress and status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Date Range Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div>
                <label className="text-sm text-gray-600 mr-2">Start Date:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mr-2">End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Task Table */}
            {filteredTasks.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-sm font-semibold text-gray-900">Task Name</th>
                      <th className="p-3 text-sm font-semibold text-gray-900">Progress</th>
                      <th className="p-3 text-sm font-semibold text-gray-900">Priority</th>
                      <th className="p-3 text-sm font-semibold text-gray-900">Status</th>
                      <th className="p-3 text-sm font-semibold text-gray-900">Start Date</th>
                      <th className="p-3 text-sm font-semibold text-gray-900">End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task) => (
                      <tr
                        key={task.id}
                        className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                      >
                        <td className="p-3 text-sm text-gray-900">{task.name}</td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${task.progress}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-gray-700">
                              {task.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              task.priority === "high"
                                ? "bg-red-100 text-red-700"
                                : task.priority === "medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-gray-900">
                          {task.progress === 100 ? "Completed" : "Ongoing"}
                        </td>
                        <td className="p-3 text-sm text-gray-900">{task.startDate}</td>
                        <td className="p-3 text-sm text-gray-900">
                          {task.endDate || "Ongoing"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 text-center">
                No tasks found for the selected date range.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Detailed Performance Analysis & Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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