/**
 * components/task-details/task-overview-card.tsx
 */
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";
import StatCard from "../stat-card";

interface TaskOverviewCardProps {
  progress: number;
  priority: "high" | "medium" | "low";
  assignedEmployeesCount: number;
}

const TaskOverviewCard: React.FC<TaskOverviewCardProps> = ({ progress, priority, assignedEmployeesCount }) => {
  const priorityColor =
    priority === "high"
      ? "text-red-600"
      : priority === "medium"
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-blue-600" />
          <span>Task Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Progress" value={`${progress}%`} description="Task Completion" color="text-blue-600" />
        <StatCard label="Priority" value={priority.charAt(0).toUpperCase() + priority.slice(1)} description="Task Priority" color={priorityColor} />
        <StatCard label="Assigned Employees" value={assignedEmployeesCount} description="Team Members" color="text-purple-600" />
      </CardContent>
    </Card>
  );
};

export default TaskOverviewCard;
