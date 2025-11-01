import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeTasks } from "@/components/employee-analysis/employee-tasks";
import { EmployeeInfo } from "@/components/employee-analysis/employee-info";
import { EmployeePerformanceSummary } from "@/components/employee-analysis/employee-performance-summary";

interface Employee {
  employee_id: string;
  name: string;
  role: string;
  performance: number;
  phone: string;
  tasks_completed: number;
  tasks_assigned: number;
}

interface Task {
  task_id: string;
  name: string;
  progress: number;
  start_date: string;
  end_date?: string;
}

const EmployeeAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const { blockId, employeeId } = useParams<{
    blockId: string;
    employeeId: string;
  }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, taskRes] = await Promise.all([
          fetch(`${API_URL}/api/employees/${employeeId}`),
          fetch(`${API_URL}/api/employees/${employeeId}/tasks`),
        ]);
        const empData = await empRes.json();
        const taskData = await taskRes.json();
        setEmployee(empData);
        setTasks(taskData);
      } catch (err) {
        console.error("Error fetching employee data:", err);
      }
    };
    if (employeeId) fetchData();
  }, [employeeId, API_URL]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (!startDate && !endDate) return true;
      const taskStart = new Date(task.start_date);
      const taskEnd = task.end_date ? new Date(task.end_date) : new Date();
      const filterStart = startDate ? new Date(startDate) : new Date(0);
      const filterEnd = endDate ? new Date(endDate) : new Date();
      return taskStart >= filterStart && taskEnd <= filterEnd;
    });
  }, [tasks, startDate, endDate]);

  if (!employee)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading employee data...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(`/block/${blockId}`)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Block Details
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Employee Performance Analysis
          </h1>
          <div className="w-32" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <EmployeeInfo block={block} employee={employee} />

        <EmployeeTasks
          employee={employee}
          tasks={filteredTasks}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <EmployeePerformanceSummary employee={employee} />
      </main>
    </div>
  );
};

export default EmployeeAnalysisPage;
