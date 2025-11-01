import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Activity } from "lucide-react";
import StatCard from "../stat-card";

interface TaskOverviewCardProps {
  blockId: string;
}

const TaskOverviewCard: React.FC<TaskOverviewCardProps> = ({ blockId }) => {
  const [progress, setProgress] = useState(0);
  const [priority, setPriority] = useState<"high" | "medium" | "low">("low");
  const [assignedEmployeesCount, setAssignedEmployeesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchTaskOverview = async () => {
      try {
        const res = await fetch(`${API_URL}/api/tasks/${blockId}`);
        if (!res.ok) throw new Error("Failed to fetch task data");
        const tasks = await res.json();

        if (tasks.length > 0) {
          const totalTasks = tasks.length;
          const completed = tasks.filter(
            (t: any) => t.status === "completed"
          ).length;
          const avgProgress = Math.round((completed / totalTasks) * 100);

          setProgress(avgProgress);
          setPriority(tasks[0].priority || "medium");
          setAssignedEmployeesCount(tasks[0].assigned_employees_count || 0);
        }
      } catch (err) {
        console.error("Error fetching task overview:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTaskOverview();
  }, [API_URL, blockId]);

  if (loading)
    return (
      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle>Loading Task Overview...</CardTitle>
        </CardHeader>
      </Card>
    );

  const priorityColor =
    priority === "high"
      ? "text-red-600"
      : priority === "medium"
      ? "text-yellow-600"
      : "text-green-600";

  const progressColor =
    progress >= 80
      ? "text-green-600"
      : progress >= 50
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <Card className="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-gray-800">
          <Activity className="w-5 h-5 text-blue-600" />
          <span>Task Overview</span>
        </CardTitle>
        <CardDescription>Summary of current task status</CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Progress"
          value={`${progress}%`}
          description="Task Completion"
          color={progressColor}
        />
        <StatCard
          label="Priority"
          value={priority.charAt(0).toUpperCase() + priority.slice(1)}
          description="Priority Level"
          color={priorityColor}
        />
        <StatCard
          label="Assigned Employees"
          value={assignedEmployeesCount.toString()}
          description="Team Members Working"
          color="text-purple-600"
        />
      </CardContent>
    </Card>
  );
};

export default TaskOverviewCard;
