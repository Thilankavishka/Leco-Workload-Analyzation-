/**
 * components/task-details/assigned-employees-section.tsx
 */
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { UserCheck } from "lucide-react";
import EmployeeCard from "./employee-card";

interface Employee {
  id: string;
  name: string;
  role: string;
  performance: number;
  tasksCompleted: number;
  tasksAssigned: number;
}

interface AssignedEmployeesSectionProps {
  employees: Employee[];
  blockId: string;
}

const AssignedEmployeesSection: React.FC<AssignedEmployeesSectionProps> = ({ employees, blockId }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <UserCheck className="w-5 h-5 text-blue-600" />
          <span>Assigned Employees</span>
        </CardTitle>
        <CardDescription>Performance metrics for employees assigned to this task</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4">
        {employees.map((emp) => <EmployeeCard key={emp.id} employee={emp} blockId={blockId} />)}
      </CardContent>
    </Card>
  );
};

export default AssignedEmployeesSection;
