import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Users,
  Car,
  Award,
  ArrowRight,
  Activity,
  Search,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import blockData from "@/data/block-data";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const BlockDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { blockId } = useParams<{ blockId: string }>();
  const [searchTerm, setSearchTerm] = useState("");

  const block = blockId ? blockData[blockId] : null;
  if (!block) return null;

  // Filtered staff based on search
  const filteredStaff = block.staff.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Metrics for top cards
  const metrics = [
    {
      label: "Total Employees",
      value: block.employees,
      icon: <Users className="w-5 h-5" />,
      gradient: "from-blue-500 to-blue-600",
      textColor: "text-white",
    },
    {
      label: "Vehicles",
      value: block.vehicles,
      icon: <Car className="w-5 h-5" />,
      gradient: "from-green-500 to-green-600",
      textColor: "text-white",
    },
    {
      label: "Task Completion",
      value: `${Math.round((block.tasks.completed / block.tasks.total) * 100)}%`,
      icon: <Award className="w-5 h-5" />,
      gradient: "from-purple-500 to-purple-600",
      textColor: "text-white",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{block.name}</h1>
          <button
            onClick={() => navigate("/comparison")}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold transition-all"
          >
            Deep Comparison
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric) => (
            <Card
              key={metric.label}
              className={`bg-gradient-to-br ${metric.gradient} ${metric.textColor} shadow-lg`}
            >
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  {metric.icon}
                  <span>{metric.label}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{metric.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Employee Performance Analytics */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-6 h-6 text-blue-600" />
              <span>Employee Performance Analytics</span>
            </CardTitle>
            <CardDescription>
              Individual employee task completion and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Performance Comparison BarChart */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Performance Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={block.staff.map((s) => ({
                      name: s.name.split(" ")[0],
                      performance: s.performance,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="performance" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Task Distribution PieChart */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Task Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={block.staff.map((s) => ({
                        name: s.name.split(" ")[0],
                        value: s.tasksCompleted,
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${((percent as number) * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {block.staff.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Employee Search Input */}
            <div className="relative mb-6">
              <Input
                type="text"
                placeholder="Search employees by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Employee Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStaff.map((employee) => {
                const successRate = Math.round(
                  (employee.tasksCompleted / employee.tasksAssigned) * 100
                );
                const initials = employee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("");
                return (
                  <Card
                    key={employee.id}
                    className="shadow-md hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-r from-white to-blue-50"
                    onClick={() =>
                      navigate(`/block/${blockId}/employee/${employee.id}`)
                    }
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {initials}
                        </div>
                        <span>{employee.name}</span>
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {employee.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600">Performance</p>
                          <p className="text-xl font-bold text-blue-600">
                            {employee.performance}%
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600">Tasks Done</p>
                          <p className="text-xl font-bold text-green-600">
                            {employee.tasksCompleted}/{employee.tasksAssigned}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600">Success Rate</p>
                          <p className="text-xl font-bold text-purple-600">
                            {successRate}%
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Block Performance Trend LineChart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Block Performance Trend</CardTitle>
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
