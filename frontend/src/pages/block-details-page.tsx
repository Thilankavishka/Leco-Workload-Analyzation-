import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Users, Car, Award, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Input } from "@/components/ui/input";

interface Block {
  block_id: string;
  name: string;
  employees_count: number;
  vehicles_count: number;
  tasks_completed: number;
  tasks_total: number;
  monthly_performance: number;
}

interface Employee {
  employee_id: string;
  name: string;
  performance: number;
  tasksCompleted: number;
  tasksAssigned: number;
  role?: string;
}

interface Task {
  task_id: string;
  progress: number;
}

interface PerformanceHistory {
  id: number;
  block_id: string;
  period: string;
  value: number;
}

const BlockDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { blockId } = useParams<{ blockId: string }>();

  const [block, setBlock] = useState<Block | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [performanceHistory, setPerformanceHistory] = useState<PerformanceHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (!blockId) return;

    const fetchBlockData = async () => {
      try {
        setLoading(true);
        setError(null);

        const urls = [
          `${API_URL}/api/blocks/${blockId}`,
          `${API_URL}/api/employees?blockId=${blockId}`,
          `${API_URL}/api/tasks?blockId=${blockId}`,
          `${API_URL}/api/performance-history?blockId=${blockId}`,
        ];

        const responses = await Promise.all(urls.map((url) => fetch(url)));

        // check for HTML error page
        for (const res of responses) {
          if (!res.ok) throw new Error("One or more API responses failed");
          const text = await res.clone().text();
          if (text.startsWith("<!DOCTYPE") || text.startsWith("<html")) {
            throw new Error(`Unexpected HTML response from API: ${res.url}`);
          }
        }

        const [blockData, empData, taskData, perfData] = await Promise.all(responses.map((res) => res.json()));

        setBlock(blockData || null);
        setEmployees(Array.isArray(empData) ? empData : []);
        setTasks(Array.isArray(taskData) ? taskData : []);
        setPerformanceHistory(Array.isArray(perfData) ? perfData : []);
      } catch (err) {
        console.error("❌ Fetch Error:", err);
        setError("Failed to load block data. Please check your backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlockData();
  }, [blockId, API_URL]);

  const metrics = useMemo(() => {
    const totalEmployees = employees.length;
    const vehicles = block?.vehicles_count || 0;
    const completedTasks = tasks.filter((t) => t.progress === 100).length;
    const totalTasks = tasks.length;
    const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return [
      { label: "Total Employees", value: totalEmployees, icon: <Users className="w-5 h-5" />, gradient: "from-blue-500 to-blue-600" },
      { label: "Vehicles", value: vehicles, icon: <Car className="w-5 h-5" />, gradient: "from-green-500 to-green-600" },
      { label: "Task Completion", value: `${completionRate}%`, icon: <Award className="w-5 h-5" />, gradient: "from-purple-500 to-purple-600" },
    ];
  }, [block, employees, tasks]);

  const filteredEmployees = employees.filter((e) =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10 font-medium">{error}</div>;
  if (!block) return <div className="text-center mt-10 text-gray-500">No data found for this block.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2">
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to Dashboard</span>
          </button>

          <h1 className="text-2xl font-bold text-gray-900">{block.name}</h1>

          <button onClick={() => navigate("/comparison")} className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold transition-all">
            Deep Comparison
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {metrics.map((m) => (
            <Card key={m.label} className={`bg-gradient-to-br ${m.gradient} text-white shadow-lg`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  {m.icon}<span>{m.label}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{m.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Employee Search */}
        <Input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6"
        />

        {/* Employee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredEmployees.map((emp) => {
            const successRate = emp.tasksAssigned ? Math.round((emp.tasksCompleted / emp.tasksAssigned) * 100) : 0;
            const initials = emp.name.split(" ").map((n) => n[0]).join("");

            return (
              <Card key={emp.employee_id} className="cursor-pointer rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">{initials}</div>
                    <span>{emp.name}</span>
                  </CardTitle>
                  <CardDescription>{emp.role || "Employee"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <p>Performance: {emp.performance}%</p>
                    <p>Tasks Done: {emp.tasksCompleted}/{emp.tasksAssigned}</p>
                    <p>Success Rate: {successRate}%</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Performance Trend */}
        {performanceHistory.length > 0 && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Block Performance Trend</CardTitle>
              <CardDescription>Weekly performance tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default BlockDetailsPage;
