import React from "react";
import { Building2, TrendingUp, Award, ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import StatsCard from "@/components/stats-card";
import Header from "@/components/header";
import PerformanceChart from "@/components/performance-chart";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
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

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />

      <main className="w-full px-10 py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <StatsCard
            title="Total Blocks"
            value={dashboardData.totalBlocks}
            icon={<Building2 className="w-6 h-6" />}
            color="from-blue-500 to-blue-600"
            subtitle="Active operational blocks"
          />
          <StatsCard
            title="Ongoing Projects"
            value={dashboardData.ongoingProjects}
            icon={<TrendingUp className="w-6 h-6" />}
            color="from-green-500 to-green-600"
            subtitle="Currently in progress"
          />
          <StatsCard
            title="Completed Projects"
            value={dashboardData.completedProjects}
            icon={<Award className="w-6 h-6" />}
            color="from-purple-500 to-purple-600"
            subtitle="Successfully delivered"
          />
        </div>

        {/* Performance */}
        <Card className="shadow-lg mb-12 w-full">
          <CardHeader>
            <CardTitle className="text-xl">
              Overall Performance - Project Handover & Completion
            </CardTitle>
            <CardDescription>
              6-month trend analysis of project delivery metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <PerformanceChart data={dashboardData.overallPerformance} />
          </CardContent>
        </Card>

        {/* Navigation */}
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
