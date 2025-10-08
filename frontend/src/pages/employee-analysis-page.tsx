import React from "react";
import { Phone, Building2, Award, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
  } | null;
  clearEmployee: () => void;
}

const EmployeeAnalysisPage: React.FC<EmployeeAnalysisProps> = ({
  onNavigate,
  selectedBlock,
  selectedEmployee,
  clearEmployee,
}) => {
  const block = selectedBlock ? blockData[selectedBlock] : null;
  const employee = selectedEmployee;

  if (!block || !employee) return null;

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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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
              <Building2 className="w-16 h-16 opacity-80" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Contact</p>
                  <p className="font-semibold text-gray-900">
                    {employee.phone}
                  </p>
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

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Detailed Performance Analysis & Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  📊 Performance Summary
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-gray-700">
                  <p>
                    <strong>Overall Rating:</strong> {employee.performance}% -{" "}
                    <span className={categoryColor}>{performanceCategory}</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EmployeeAnalysisPage;
