import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import TaskOverviewCard from "@/components/task-details/task-overview-card";
import AssignedEmployeesSection from "@/components/task-details/assigned-employees-section";
import PerformanceChart from "@/components/task-details/performance-chart";

interface Task {
  task_id: string;
  name: string;
  progress: number;
  priority: string;
  start_date: string;
  end_date?: string;
  Block?: {
    block_id: string;
    name: string;
  };
  Employees?: Employee[];
}

interface Employee {
  employee_id: string;
  name: string;
  role: string;
  performance: number;
  phone: string;
  tasks_completed: number;
  tasks_assigned: number;
}

const TaskDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { blockId, taskId } = useParams<{ blockId: string; taskId: string }>();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/tasks/${taskId}`);
        if (!res.ok) throw new Error("Failed to fetch task details");
        const data = await res.json();
        setTask(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load task details");
      } finally {
        setLoading(false);
      }
    };
    if (taskId) fetchTaskDetails();
  }, [taskId, API_URL]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-500">Loading task details...</p>
      </div>
    );

  if (error || !task)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 font-medium mb-4">
          {error || "Task not found"}
        </p>
        <button
          onClick={() => navigate(`/block/${blockId}`)}
          className="text-blue-600 hover:underline"
        >
          ← Back to Block
        </button>
      </div>
    );

  const assignedEmployees = task.Employees || [];
  const performanceData = assignedEmployees.map((emp) => ({
    name: emp.name.split(" ")[0],
    performance: emp.performance,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(`/block/${blockId}`)}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to Block</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{task.name}</h1>
          <div className="w-32" />
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <TaskOverviewCard
          progress={task.progress}
          priority={task.priority}
          assignedEmployeesCount={assignedEmployees.length}
        />

        {assignedEmployees.length > 0 && (
          <>
            <AssignedEmployeesSection
              employees={assignedEmployees}
              blockId={blockId!}
            />
            <PerformanceChart data={performanceData} />
          </>
        )}
      </main>
    </div>
  );
};

export default TaskDetailsPage;
