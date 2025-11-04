/**
 * employee-analysis-page.tsx
 * 
 * @update 11/05/2025
 */
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "@/common/axios-instance";
import { EmployeeTasks } from "@/components/employee-analysis/employee-tasks";
import { EmployeeInfo } from "@/components/employee-analysis/employee-info";
import { EmployeePerformanceSummary } from "@/components/employee-analysis/employee-performance-summary";

export type EmployeeWithBlockAndTasks = {
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
  taskAssignments: {
    id: string;
    taskId: string;
    employeeId: string;
    task: {
      id: string;
      name: string;
      progress: number;
      priority: "LOW" | "MEDIUM" | "HIGH";
      startDate: string;
      endDate: string | null;
      blockId: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
};

const EmployeeAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const { blockId, employeeId } = useParams<{ blockId: string; employeeId: string }>();
  const [data, setData] = useState<EmployeeWithBlockAndTasks | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<EmployeeWithBlockAndTasks>(
        `/blocks/${blockId}/employee/${employeeId}`
      );
      setData(response.data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch employee analysis data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!blockId || !employeeId) return;
    fetchData();
  }, [blockId, employeeId]);

  // Extract block and employee from data
  const employee = data;
  const block = data?.block;

  // Tasks from taskAssignments
  const employeeTasks = useMemo(() => {
    if (!employee) return [];
    return employee.taskAssignments.map((ta) => ta.task);
  }, [employee]);

  // Filter tasks by date range
  const filteredTasks = useMemo(() => {
    if (!employeeTasks.length) return [];
    return employeeTasks.filter((task) => {
      if (!startDate && !endDate) return true;
      const taskStart = new Date(task.startDate);
      const taskEnd = task.endDate ? new Date(task.endDate) : new Date();
      const filterStart = startDate ? new Date(startDate) : new Date(0);
      const filterEnd = endDate ? new Date(endDate) : new Date();
      return taskStart >= filterStart && taskEnd <= filterEnd;
    });
  }, [employeeTasks, startDate, endDate]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!employee || !block)
    return <div className="p-6 text-center text-red-600">No employee or block found.</div>;

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
          <h1 className="text-2xl font-bold text-gray-900">Employee Performance Analysis</h1>
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
        <EmployeePerformanceSummary block={block} employee={employee} />
      </main>
    </div>
  );
};

export default EmployeeAnalysisPage;
