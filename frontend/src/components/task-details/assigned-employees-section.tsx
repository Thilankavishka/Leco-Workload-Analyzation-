import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { UserCheck } from "lucide-react";
import EmployeeCard from "./employee-card";

interface Employee {
  employee_id: string;
  name: string;
  role: string;
  performance: number;
  tasks_completed: number;
  tasks_assigned: number;
}

interface AssignedEmployeesSectionProps {
  blockId: string;
}

const AssignedEmployeesSection: React.FC<AssignedEmployeesSectionProps> = ({
  blockId,
}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`${API_URL}/api/employees/${blockId}`);
        if (!res.ok) throw new Error("Failed to fetch employees");
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [API_URL, blockId]);

  if (loading) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Loading Employees...</CardTitle>
          <CardDescription>Please wait while data is loading.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <UserCheck className="w-5 h-5 text-blue-600" />
          <span>Assigned Employees</span>
        </CardTitle>
        <CardDescription>
          Performance metrics for assigned employees
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4">
        {employees.length > 0 ? (
          employees.map((emp) => (
            <EmployeeCard
              key={emp.employee_id}
              employee={emp}
              blockId={blockId}
            />
          ))
        ) : (
          <p>No employees found for this block.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default AssignedEmployeesSection;
