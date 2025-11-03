import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp } from "lucide-react";

interface StaffMember {
  employee_id: string;
  name: string;
  role: string;
  performance: number;
}

interface Block {
  block_id: string;
  block_name: string;
  staff: StaffMember[];
}

interface Employee {
  employee_id: string;
  name: string;
  role: string;
  performance: number;
}

interface EmployeePerformanceSummaryProps {
  employeeId: string;
}

export const EmployeePerformanceSummary: React.FC<EmployeePerformanceSummaryProps> = ({
  employeeId,
}) => {
  const [block, setBlock] = useState<Block | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Backend API URL
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // ✅ Fetch employee + block data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/employees/${employeeId}`);
        if (!response.ok) throw new Error("Failed to fetch employee data");

        const data = await response.json();

        // ✅ Expect backend response format:
        // { employee: {...}, block: {...} }
        setEmployee(data.employee);
        setBlock(data.block);
      } catch (error: any) {
        console.error("Error fetching performance summary:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) fetchData();
  }, [employeeId, API_URL]);

  // ✅ UI States
  if (loading) return <p>Loading performance summary...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!employee || !block) return <p>No performance data found.</p>;

  // ✅ Performance Calculations
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

  const teamAverage =
    block.staff.reduce((acc, e) => acc + e.performance, 0) / block.staff.length;

  const employeeRank =
    block.staff
      .map((e) => e.performance)
      .sort((a, b) => b - a)
      .indexOf(employee.performance) + 1;

  // ✅ Return UI
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <span>Detailed Performance Analysis & Recommendations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* --- Summary --- */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-gray-700">
          <p>
            <strong>Employee:</strong> {employee.name} ({employee.role})
          </p>
          <p>
            <strong>Overall Rating:</strong> {employee.performance}% -{" "}
            <span className={categoryColor}>{performanceCategory}</span>
          </p>
          <p>
            <strong>Team Ranking:</strong> #{employeeRank} of{" "}
            {block.staff.length} members
          </p>
          <p>
            <strong>Performance vs Team Average:</strong>{" "}
            {(employee.performance - teamAverage).toFixed(1)}%{" "}
            {employee.performance > teamAverage ? "above" : "below"} average
          </p>
        </div>

        {/* --- Recommendation Alert --- */}
        <Alert className="border-blue-500 bg-blue-50">
          <AlertDescription className="text-gray-700">
            Focus on maintaining consistent performance and exploring skill
            development areas for long-term growth.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
