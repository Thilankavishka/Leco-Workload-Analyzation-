/**
 * components/task-details/employee-card.tsx
 */
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatCard from "../stat-card";

interface Employee {
  id: string;
  name: string;
  role: string;
  performance: number;
  tasksCompleted: number;
  tasksAssigned: number;
}

interface EmployeeCardProps {
  employee: Employee;
  blockId: string;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, blockId }) => {
  const navigate = useNavigate();
  const initials = employee.name.split(" ").map((n) => n[0]).join("");
  const successRate = Math.round((employee.tasksCompleted / employee.tasksAssigned) * 100);

  return (
    <Card
      onClick={() => navigate(`/block/${blockId}/employee/${employee.id}`)}
      className="cursor-pointer hover:shadow-lg transition-shadow"
    >
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">{initials}</div>
          <div className="flex-1">
            <h3 className="text-lg font-bold">{employee.name}</h3>
            <p className="text-sm text-gray-500">{employee.role} • {employee.id}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
              <StatCard label="Performance" value={`${employee.performance}%`} color="text-blue-600" />
              <StatCard label="Tasks Done" value={`${employee.tasksCompleted}/${employee.tasksAssigned}`} color="text-green-600" />
              <StatCard label="Success Rate" value={`${successRate}%`} color="text-purple-600" />
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
