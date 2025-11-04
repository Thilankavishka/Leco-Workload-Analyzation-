/**
 * task-details-page.tsx
 * 
 * @update 11/05/2025
 */
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import TaskOverviewCard from "@/components/task-details/task-overview-card";
import AssignedEmployeesSection from "@/components/task-details/assigned-employees-section";
import PerformanceChart from "@/components/task-details/performance-chart";
import axiosInstance from "@/common/axios-instance";
import { apiSummary } from "@/common/summary-api";

interface Employee {
  id: string;
  name: string;
  role: string;
  performance: number;
  tasksCompleted: number;
  tasksAssigned: number;
}

export type TaskWithBlockAndAssignedEmployees = {
  id: string;
  name: string;
  progress: number;
  priority: "LOW" | "MEDIUM" | "HIGH";
  startDate: string;
  endDate: string | null;
  blockId: string;
  createdAt: string;
  updatedAt: string;
  block: {
    id: string;
    name: string;
    employeesCount: number;
    vehiclesCount: number;
    tasksCompleted: number;
    tasksTotal: number;
    performanceMonthly: number;
    createdAt: string;
    updatedAt: string;
  };
  assignedTo: {
    id: string;
    taskId: string;
    employeeId: string;
    employee: {
      id: string;
      name: string;
      phone: string;
      role: string;
      performance: number;
      tasksCompleted: number;
      tasksAssigned: number;
      blockId: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
};

const TaskDetailsPage: React.FC = () => {
  const [data, setData] = React.useState<TaskWithBlockAndAssignedEmployees | null>(null);
  const navigate = useNavigate();
  const { blockId, taskId } = useParams<{ blockId: string; taskId: string }>();

  useEffect(() => {
    if (!blockId || !taskId) return;

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<TaskWithBlockAndAssignedEmployees>(
          apiSummary.blocks.getTask(blockId, taskId)
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchData();
  }, [blockId, taskId]);

  if (!data) return <div className="p-6 text-center">Loading...</div>;

  // Normalize employees for AssignedEmployeesSection
  const assignedEmployees: Employee[] = data.assignedTo.map((assignment) => {
    const emp = assignment.employee;
    return {
      id: emp.id,
      name: emp.name,
      role: emp.role,
      performance: emp.performance,
      tasksCompleted: emp.tasksCompleted,
      tasksAssigned: emp.tasksAssigned,
    };
  });

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
          <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
          <div className="w-32" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <TaskOverviewCard
          progress={data.progress}
          priority={data.priority.toLowerCase() as "low" | "medium" | "high"}
          assignedEmployeesCount={assignedEmployees.length}
        />

        {assignedEmployees.length > 0 && (
          <>
            <AssignedEmployeesSection employees={assignedEmployees} blockId={blockId!} />
            <PerformanceChart data={performanceData} />
          </>
        )}
      </main>
    </div>
  );
};

export default TaskDetailsPage;
