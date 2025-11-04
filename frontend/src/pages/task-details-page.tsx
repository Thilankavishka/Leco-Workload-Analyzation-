/**
 * task-details-page.tsx
 * 
 * @update 11/04/2025
 */
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import blockData from "@/data/block-data";
import { ArrowRight } from "lucide-react";
import TaskOverviewCard from "@/components/task-details/task-overview-card";
import AssignedEmployeesSection from "@/components/task-details/assigned-employees-section";
import PerformanceChart from "@/components/task-details/performance-chart";
import type { Employee as CommonEmployee } from "@/common/type";

interface Employee {
  id: string;
  name: string;
  role: string;
  performance: number;
  tasksCompleted: number;
  tasksAssigned: number;
}

const TaskDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { blockId, taskId } = useParams<{ blockId: string; taskId: string }>();

  if (!blockId || !taskId) return null;

  const block = blockData[blockId];
  if (!block) return null;

  const task = block.ongoingTasks?.find((t) => t?.id === taskId);
  if (!task) return null;

  // Normalize employees to match AssignedEmployeesSection's Employee type
  const assignedEmployees: Employee[] =
    task.assignedTo
      ?.map((empId) => block.staff?.find((emp) => emp?.id === empId))
      ?.filter((emp): emp is CommonEmployee => !!emp)
      ?.map((emp) => ({
        id: emp.id!, // safe because filtered out undefined
        name: emp.name ?? "Unknown",
        role: emp.role ?? "Unassigned",
        performance: emp.performance ?? 0,
        tasksCompleted: emp.tasksCompleted ?? 0,
        tasksAssigned: emp.tasksAssigned ?? 0,
      })) || [];

  const performanceData = assignedEmployees.map((emp) => ({
    name: emp.name.split(" ")[0] ?? "N/A",
    performance: emp.performance,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{task.name}</h1>
          <div className="w-32" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <TaskOverviewCard
          progress={task.progress ?? 0}
          priority={(task.priority?.toLowerCase() as "high" | "medium" | "low") ?? "low"}
          assignedEmployeesCount={assignedEmployees.length}
        />

        {assignedEmployees.length > 0 && (
          <>
            <AssignedEmployeesSection employees={assignedEmployees} blockId={blockId} />
            <PerformanceChart data={performanceData} />
          </>
        )}
      </main>
    </div>
  );
};

export default TaskDetailsPage;
