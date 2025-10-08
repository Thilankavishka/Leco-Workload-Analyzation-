import React, { useState } from "react";
import {
  Users,
  Car,
  Award,
  Phone,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import blockData from "@/data/block-data";

interface BlockDetailsProps {
  onNavigate: (page: string) => void;
  selectedBlock: string | null;
  onViewEmployee: (employee: {
    id: string;
    name: string;
    phone: string;
    role: string;
    performance: number;
  }) => void;
}

const BlockDetailsPage: React.FC<BlockDetailsProps> = ({
  onNavigate,
  selectedBlock,
  onViewEmployee,
}) => {
  const [performanceFilter, setPerformanceFilter] = useState("weekly");

  const block = selectedBlock ? blockData[selectedBlock] : null;
  if (!block) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate("analysis")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Analysis
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{block.name}</h1>
            <button
              onClick={() => onNavigate("comparison")}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold transition-all"
            >
              Deep Comparison
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Total Employees</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-900">
                {block.employees}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Car className="w-5 h-5 text-green-600" />
                <span>Vehicles</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-900">
                {block.vehicles}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span>Task Completion</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-900">
                {Math.round(
                  (block.tasks.completed / block.tasks.total) * 100
                )}
                %
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Employee Details Table */}
        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle>Employee Details</CardTitle>
            <CardDescription>
              Complete staff information and contact details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Staff ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Phone Number
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Performance
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {block.staff.map((employee) => (
                    <tr
                      key={employee.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {employee.id}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {employee.name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {employee.role}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{employee.phone}</span>
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                employee.performance >= 90
                                  ? "bg-green-500"
                                  : employee.performance >= 80
                                  ? "bg-blue-500"
                                  : "bg-yellow-500"
                              }`}
                              style={{
                                width: `${employee.performance}%`,
                              }}
                            />
                          </div>
                          <span className="font-semibold text-gray-700">
                            {employee.performance}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <button
                          onClick={() => onViewEmployee(employee)}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Visualizations Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Task Completion Bar Chart */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Task Overview</CardTitle>
              <CardDescription>
                Total tasks vs completed tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    {
                      name: "Total Tasks",
                      value: block.tasks.total,
                      fill: "#3b82f6",
                    },
                    {
                      name: "Completed",
                      value: block.tasks.completed,
                      fill: "#10b981",
                    },
                    {
                      name: "Pending",
                      value: block.tasks.total - block.tasks.completed,
                      fill: "#f59e0b",
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Filter Visualization */}
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Overall Performance</CardTitle>
                  <CardDescription>Filter by time period</CardDescription>
                </div>
                <div className="relative">
                  <select
                    value={performanceFilter}
                    onChange={(e) => setPerformanceFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white pr-10"
                  >
                    <option value="today">Today</option>
                    <option value="lastDay">Last Day</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-64">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="#e5e7eb"
                      strokeWidth="16"
                      fill="none"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="#3b82f6"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 88}`}
                      strokeDashoffset={`${
                        2 *
                        Math.PI *
                        88 *
                        (1 - block.performance[performanceFilter] / 100)
                      }`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-5xl font-bold text-gray-900">
                      {block.performance[performanceFilter]}%
                    </p>
                    <p className="text-sm text-gray-600 mt-1 capitalize">
                      {performanceFilter}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Performance Trend */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>Weekly performance tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={block.performanceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BlockDetailsPage;
