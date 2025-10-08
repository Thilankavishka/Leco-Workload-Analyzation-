import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Building2, TrendingUp, Award, ArrowRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const dashboardData = {
    totalBlocks: 12,
    ongoingProjects: 5,
    completedProjects: 9,
    overallPerformance: [
      { month: "May", handover: 80, completion: 75 },
      { month: "Jun", handover: 85, completion: 82 },
      { month: "Jul", handover: 88, completion: 84 },
      { month: "Aug", handover: 90, completion: 88 },
      { month: "Sep", handover: 95, completion: 92 },
      { month: "Oct", handover: 97, completion: 94 },
    ],
  };

  // Switch page demo
  if (currentPage === "analysis") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-gray-800">
        <h1 className="text-3xl font-bold mb-4">Analysis Page</h1>
        <p className="mb-6 text-gray-600">
          Here you can analyze project data in detail.
        </p>
        <button
          onClick={() => setCurrentPage("home")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b w-full">
        <div className="w-full px-10 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="w-10 h-10 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">LECO</h1>
                <p className="text-sm text-gray-600">
                  Project Management System
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Dashboard Overview</p>
              <p className="text-xs text-gray-500">
                Last updated: Today, 10:30 AM
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - FULL WIDTH */}
      <main className="w-full px-10 py-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 w-full">
          {/* Total Blocks */}
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow w-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Total Blocks</span>
                <Building2 className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{dashboardData.totalBlocks}</p>
              <p className="text-blue-100 text-sm mt-2">
                Active operational blocks
              </p>
            </CardContent>
          </Card>

          {/* Ongoing Projects */}
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow w-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Ongoing Projects</span>
                <TrendingUp className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {dashboardData.ongoingProjects}
              </p>
              <p className="text-green-100 text-sm mt-2">
                Currently in progress
              </p>
            </CardContent>
          </Card>

          {/* Completed Projects */}
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow w-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Completed Projects</span>
                <Award className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {dashboardData.completedProjects}
              </p>
              <p className="text-purple-100 text-sm mt-2">
                Successfully delivered
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart - FULL WIDTH */}
        <Card className="shadow-lg mb-12 w-full">
          <CardHeader>
            <CardTitle className="text-xl">
              Overall Performance - Project Handover & Completion
            </CardTitle>
            <CardDescription>
              6-month trend analysis of project delivery metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
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
            </div>
          </CardContent>
        </Card>

        {/* Get Started Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setCurrentPage("analysis")}
            className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-12 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
