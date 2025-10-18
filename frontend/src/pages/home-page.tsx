import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Award,
  Users,
  Activity,
  Search,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import blockData from "@/data/block-data";
import DashboardCard from "@/components/dashboard-card";
import { Button } from "@/components/ui/button";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const dashboardData = {
    totalBlocks: Object.keys(blockData).length,
    ongoingProjects: 8,
    completedProjects: 135,
    overallPerformance: [
      { month: "Jan", handover: 65, completion: 75 },
      { month: "Feb", handover: 70, completion: 80 },
      { month: "Mar", handover: 75, completion: 85 },
      { month: "Apr", handover: 80, completion: 82 },
      { month: "May", handover: 85, completion: 88 },
      { month: "Jun", handover: 90, completion: 92 },
    ],
  };

  const totalTasks = Object.values(blockData).reduce(
    (acc, block) => acc + block.tasks.total,
    0
  );
  const completedTasks = Object.values(blockData).reduce(
    (acc, block) => acc + block.tasks.completed,
    0
  );
  const totalEmployees = Object.values(blockData).reduce(
    (acc, block) => acc + block.employees,
    0
  );

  const handleBlockClick = (blockId: string) => {
    navigate(`/block/${blockId}`);
  };

  const filteredBlocks = Object.entries(blockData).filter(([, block]) =>
    block.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cardsData = [
    {
      title: "Total Blocks",
      value: dashboardData.totalBlocks,
      description: "Active operational blocks",
      icon: <Building2 className="w-6 h-6" />,
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-600",
    },
    {
      title: "Total Tasks",
      value: `${completedTasks}/${totalTasks}`,
      description: `${Math.round((completedTasks / totalTasks) * 100)}% completion rate`,
      icon: <Activity className="w-6 h-6" />,
      gradientFrom: "from-green-500",
      gradientTo: "to-green-600",
    },
    {
      title: "Total Employees",
      value: totalEmployees,
      description: "Active workforce",
      icon: <Users className="w-6 h-6" />,
      gradientFrom: "from-purple-500",
      gradientTo: "to-purple-600",
    },
    {
      title: "Completed Projects",
      value: dashboardData.completedProjects,
      description: "Successfully delivered",
      icon: <Award className="w-6 h-6" />,
      gradientFrom: "from-orange-500",
      gradientTo: "to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Building2 className="w-10 h-10 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">LECO</h1>
              <p className="text-sm text-gray-600">Project Management System</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Dashboard Overview</p>
            <p className="text-xs text-gray-500">Last updated: Today, 10:30 AM</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {cardsData.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              value={card.value}
              description={card.description}
              icon={card.icon}
              gradientFrom={card.gradientFrom}
              gradientTo={card.gradientTo}
            />
          ))}
        </div>

        <div className="flex justify-center mb-6">
          <Button
            onClick={() => navigate("/analysis")}
            className="flex items-center space-x-2 bg-blue-700 backdrop-blur-md hover:bg-blue-600 text-white font-semibold shadow-md hover:shadow-lg transition-all rounded-xl px-6 py-3"
          >
            <span>Go to Analysis Page</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-2">
              <Activity className="w-6 h-6 text-blue-600" />
              <span>Block Performance Overview</span>
            </CardTitle>
            <CardDescription>
              Real-time status of all operational blocks and their ongoing tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Input
                type="text"
                placeholder="Search blocks by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlocks.map(([blockId, block]) => (
                <Card
                  key={blockId}
                  className="shadow-md hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-r from-white to-blue-50"
                  onClick={() => handleBlockClick(blockId)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {block.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">Overall Progress</p>
                        <p className="text-xl font-bold text-blue-600">
                          {Math.round((block.tasks.completed / block.tasks.total) * 100)}%
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">Ongoing Tasks</p>
                        <p className="text-xl font-bold text-orange-600">
                          {block.ongoingTasks?.length || 0}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">Performance</p>
                        <p className="text-xl font-bold text-blue-600">
                          {block.performance.monthly}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Overall Performance Trend</CardTitle>
            <CardDescription>
              6-month analysis of project delivery metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={dashboardData.overallPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => `${value}%`}
                />
                <Legend />
                <Bar
                  dataKey="handover"
                  fill="#3b82f6"
                  name="Project Handover %"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="completion"
                  fill="#10b981"
                  name="Completion Level %"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default HomePage;