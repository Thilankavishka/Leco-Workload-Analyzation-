// src/pages/home-page.tsx
import React from "react";
import {
  Building2,
  TrendingUp,
  Award,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex justify-between items-center text-lg">
                <span>Total Blocks</span>
                <Building2 className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{dashboardData.totalBlocks}</p>
              <p className="text-blue-100 text-sm mt-2">Active operational blocks</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex justify-between items-center text-lg">
                <span>Ongoing Projects</span>
                <TrendingUp className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{dashboardData.ongoingProjects}</p>
              <p className="text-green-100 text-sm mt-2">Currently in progress</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex justify-between items-center text-lg">
                <span>Completed Projects</span>
                <Award className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{dashboardData.completedProjects}</p>
              <p className="text-purple-100 text-sm mt-2">Successfully delivered</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl">
              Overall Performance - Project Handover & Completion
            </CardTitle>
            <CardDescription>
              6-month trend analysis of project delivery metrics
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

        {/* Navigation Button */}
        <div className="flex justify-center">
          <button
            onClick={() => onNavigate("analysis")}
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
