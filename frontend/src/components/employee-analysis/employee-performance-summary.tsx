import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp } from "lucide-react";

export const EmployeePerformanceSummary = ({
  employeeId,
}: {
  employeeId: string;
}) => {
  const [block, setBlock] = useState<any>(null);
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/employees/${employeeId}`);
        if (!response.ok) throw new Error("Failed to fetch employee data");
        const data = await response.json();
        setEmployee(data.employee);
        setBlock(data.block);
      } catch (error) {
        console.error("Error fetching performance summary:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [employeeId, API_URL]);

  if (loading) return <p>Loading performance summary...</p>;
  if (!employee || !block) return <p>No performance data found.</p>;

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
    block.staff.reduce((acc: number, e: any) => acc + e.performance, 0) /
    block.staff.length;
  const employeeRank =
    block.staff
      .map((e: any) => e.performance)
      .sort((a: number, b: number) => b - a)
      .indexOf(employee.performance) + 1;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <span>Detailed Performance Analysis & Recommendations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-gray-700">
          <p>
            <strong>Overall Rating:</strong> {employee.performance}% -{" "}
            <span className={categoryColor}>{performanceCategory}</span>
          </p>
          <p>
            <strong>Team Ranking:</strong> #{employeeRank} out of{" "}
            {block.staff.length} members
          </p>
          <p>
            <strong>Performance vs Team Average:</strong>{" "}
            {(employee.performance - teamAverage).toFixed(1)}%{" "}
            {employee.performance > teamAverage ? "above" : "below"} average
          </p>
        </div>
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
