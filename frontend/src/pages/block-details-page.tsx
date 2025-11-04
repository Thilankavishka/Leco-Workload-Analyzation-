/**
 * block-details-page.tsx
 * 
 * @update 11/05/2025
 */
import React, { useEffect, useState } from "react";
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
import axiosInstance from "@/common/axios-instance";
import { apiSummary } from "@/common/summary-api";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const BlockDetailsPage: React.FC = () => {
  const [blockData, setBlockData] = useState<Record<string, any>>({});
  const navigate = useNavigate();
  const { blockId } = useParams<{ blockId: string }>();
  const [searchTerm, setSearchTerm] = useState("");


  // Fetch block data from API
  const fetchBlockData = async () => {
    try {
      const response = await axiosInstance.get(apiSummary.blocks.getById(blockId!));
      setBlockData(response.data);
    } catch (error) {
      console.error("Error fetching block data:", error);
    }
  };

  useEffect(() => {
    fetchBlockData();
  }, []);


  // Filtered staff based on search
  const filteredStaff = (blockData.staff ?? []).filter((employee: { name: string; }) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Metrics for top cards
  const metrics = [
    {
      label: "Total Employees",
      value: blockData.employeesCount,
      icon: <Users className="w-5 h-5" />,
      gradient: "from-blue-500 to-blue-600",
      textColor: "text-white",
    },
    {
      label: "Vehicles",
      value: blockData.vehiclesCount,
      icon: <Car className="w-5 h-5" />,
      gradient: "from-green-500 to-green-600",
      textColor: "text-white",
    },
    {
      label: "Task Completion",
      value: `${Math.round(((blockData.tasksCompleted ?? 0) / (blockData.tasksTotal ?? 1)) * 100)}%`,
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
          <h1 className="text-2xl font-bold text-gray-900">{blockData.name}</h1>
          <button
            onClick={() => navigate("/comparison")}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold transition-all"
          >
            Deep Comparison
          </button>
        </div>
      </header>

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
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Performance Comparison BarChart */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Performance Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={(blockData.staff ?? []).map((s: { name: string; performance: any; }) => ({
                      name: s.name.split(" ")[0],
                      performance: s.performance ?? 0,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value: number) => `${value}%`} />
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
                      data={(blockData.staff ?? []).map((s: { name: string; tasksCompleted: any; }) => ({
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
                      {(blockData.staff ?? []).map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredStaff.map((employee: { tasksCompleted: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; tasksAssigned: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; id: React.Key | null | undefined; role: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; performance: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => {
                const completed = Number(employee.tasksCompleted ?? 0);
                const assigned = Number(employee.tasksAssigned ?? 0);
                const successRate = assigned > 0 ? Math.round((completed / assigned) * 100) : 0;
                const nameStr = String(employee.name ?? "");
                const initials = nameStr
                  .split(" ")
                  .filter(Boolean)
                  .map((n) => n.charAt(0))
                  .join("")
                  .toUpperCase();

                return (
                  <Card
                    key={employee.id}
                    onClick={() =>
                      navigate(`/block/${blockId}/employee/${employee.id}`)
                    }
                    className="cursor-pointer rounded-3xl shadow-lg backdrop-blur-sm bg-white/50 hover:shadow-2xl transition-all"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {initials}
                        </div>
                        <span>{nameStr}</span>
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {employee.role}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex flex-col md:flex-row gap-2">
                        {/* Performance */}
                        <div className="flex-1 bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex flex-col items-center justify-center">
                          <p className="text-sm text-blue-600 font-medium text-center">
                            Performance
                          </p>
                          <p className="text-2xl font-bold text-blue-700">
                            {employee.performance}%
                          </p>
                        </div>

                        {/* Tasks Done */}
                        <div className="flex-1 bg-green-50/50 border border-green-100 rounded-2xl p-4 flex flex-col items-center justify-center">
                          <p className="text-sm text-green-600 font-medium text-center">
                            Tasks Done
                          </p>
                          <p className="text-2xl font-bold text-green-700">
                            {employee.tasksCompleted}/{employee.tasksAssigned}
                          </p>
                        </div>

                        {/* Success Rate */}
                        <div className="flex-1 bg-purple-50/50 border border-purple-100 rounded-2xl p-4 flex flex-col items-center justify-center">
                          <p className="text-sm text-purple-600 font-medium text-center">
                            Success Rate
                          </p>
                          <p className="text-2xl font-bold text-purple-700">
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

        {/* Task List Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Ongoing Tasks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(blockData.ongoingTasks ?? []).map((task: { id: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; assignedTo: string | any[]; progress: any; priority: string; startDate: any; endDate: any; }) => (
              <Card
                key={task.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/block/${blockId}/task/${task.id}`)}
              >
                <CardHeader>
                  <CardTitle className="text-lg font-bold">{task.name}</CardTitle>
                  <CardDescription>
                    Assigned to {(task.assignedTo?.length ?? 0)} employee
                    {(task.assignedTo?.length ?? 0) > 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">Progress</p>
                    <p className="font-semibold text-blue-600">{task.progress ?? 0}%</p>
                  </div>

                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-600">Priority</p>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${task.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                        }`}
                    >
                      {task.priority
                        ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
                        : "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-1 text-gray-500 text-sm">
                    <p>Start: {task.startDate ?? "Unknown"}</p>
                    <p>End: {task.endDate || "Ongoing"}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Block Performance Trend LineChart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Block Performance Trend</CardTitle>
            <CardDescription>Weekly performance tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={blockData.performanceHistory}>
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
