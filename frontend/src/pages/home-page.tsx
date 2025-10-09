// src/pages/home-page.tsx
import React from "react";
import {
  Building2,
  TrendingUp,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

interface HomePageProps {
  onNavigate: (page: string) => void;
}

// Dashboard mock data
const dashboardData = {
  totalBlocks: 12,
  ongoingProjects: 8,
  completedProjects: 45,
  overallPerformance: [
    { month: "Jan", handover: 65, completion: 75 },
    { month: "Feb", handover: 70, completion: 80 },
    { month: "Mar", handover: 75, completion: 85 },
    { month: "Apr", handover: 80, completion: 82 },
    { month: "May", handover: 85, completion: 88 },
    { month: "Jun", handover: 90, completion: 92 },
  ],
};

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/2 -left-40 w-96 h-96 bg-green-200 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <Building2 className="w-10 h-10 text-blue-600 transition-transform group-hover:scale-110 duration-300" />
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                LECO
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                Project Management System
              </p>
            </div>
          </div>
          <div className="text-right bg-gradient-to-br from-blue-50 to-green-50 px-4 py-2 rounded-lg border border-blue-100">
            <p className="text-sm font-semibold text-gray-700">
              Dashboard Overview
            </p>
            <p className="text-xs text-gray-500 flex items-center justify-end gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Last updated: Today, 10:30 AM
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            Welcome to Your Dashboard
            <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
          </h2>
          <p className="text-gray-600 text-lg">
            Track and manage your projects with ease
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-0 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="pb-3 relative z-10">
              <CardTitle className="flex justify-between items-center text-lg">
                <span className="font-bold">Total Blocks</span>
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm group-hover:rotate-12 transition-transform duration-300">
                  <Building2 className="w-6 h-6" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-5xl font-black mb-2">
                {dashboardData.totalBlocks}
              </p>
              <p className="text-blue-100 text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Active operational blocks
              </p>
            </CardContent>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mb-16"></div>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 text-white shadow-2xl hover:shadow-green-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-0 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="pb-3 relative z-10">
              <CardTitle className="flex justify-between items-center text-lg">
                <span className="font-bold">Ongoing Projects</span>
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm group-hover:rotate-12 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-5xl font-black mb-2">
                {dashboardData.ongoingProjects}
              </p>
              <p className="text-green-100 text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                Currently in progress
              </p>
            </CardContent>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mb-16"></div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 via-purple-600 to-violet-700 text-white shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-0 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="pb-3 relative z-10">
              <CardTitle className="flex justify-between items-center text-lg">
                <span className="font-bold">Completed Projects</span>
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm group-hover:rotate-12 transition-transform duration-300">
                  <Award className="w-6 h-6" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-5xl font-black mb-2">
                {dashboardData.completedProjects}
              </p>
              <p className="text-purple-100 text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Successfully delivered
              </p>
            </CardContent>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mb-16"></div>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="shadow-2xl mb-8 border-0 bg-white/80 backdrop-blur-sm hover:shadow-blue-200/50 transition-all duration-500 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500"></div>
          <CardHeader className="bg-gradient-to-br from-gray-50 to-blue-50/30">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Overall Performance
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              6-month trend analysis of project delivery metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={dashboardData.overallPerformance}>
                <defs>
                  <linearGradient
                    id="colorHandover"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#1e40af" stopOpacity={1} />
                  </linearGradient>
                  <linearGradient
                    id="colorCompletion"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  stroke="#6b7280"
                  style={{ fontSize: "14px", fontWeight: "500" }}
                />
                <YAxis
                  stroke="#6b7280"
                  style={{ fontSize: "14px", fontWeight: "500" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                    padding: "12px",
                  }}
                  formatter={(value) => [`${value}%`, ""]}
                  labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  iconType="circle"
                />
                <Bar
                  dataKey="handover"
                  fill="url(#colorHandover)"
                  name="Project Handover %"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="completion"
                  fill="url(#colorCompletion)"
                  name="Completion Level %"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Navigation Button */}
        <div className="flex justify-center">
          <button
            onClick={() => onNavigate("analysis")}
            className="group relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white px-14 py-5 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 flex items-center space-x-3 overflow-hidden hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative z-10">Get Started</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
