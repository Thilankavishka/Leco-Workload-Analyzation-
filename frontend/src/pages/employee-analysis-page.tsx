/**
 * employee-analysis-page.tsx
 * 
 * @update 11/05/2025
 */
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "@/common/axios-instance";
import { apiSummary } from "@/common/summary-api";
import { EmployeeTasks } from "@/components/employee-analysis/employee-tasks";
import { EmployeeInfo } from "@/components/employee-analysis/employee-info";
import { EmployeePerformanceSummary } from "@/components/employee-analysis/employee-performance-summary";
import type { Block, Employee } from "@/common/type";

const EmployeeAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const { blockId, employeeId } = useParams<{ blockId: string; employeeId: string }>();

  const [block, setBlock] = useState<Block | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    if (!blockId || !employeeId) return;

    const fetchBlockData = async () => {
      try {
        const response = await axiosInstance.get(`/blocks/${blockId}`);
        setBlock(response.data); // adjust if response.data.block exists
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch block data.");
      }
    };

    const fetchEmployeeData = async () => {
      try {
        const response = await axiosInstance.get(apiSummary.employees.getById(employeeId));
        setEmployee(response.data); // adjust if response.data.employee exists
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch employee data.");
      }
    };

    // Run both requests in parallel
    setLoading(true);
    Promise.all([fetchBlockData(), fetchEmployeeData()])
      .finally(() => setLoading(false));
  }, [blockId, employeeId]);

  // Always call hooks first, conditional rendering later
  const employeeTasks = useMemo(() => {
    if (!block || !employee) return [];
    return (block.ongoingTasks ?? []).filter(task =>
      (task.assignedTo ?? []).includes(employee.id ?? "")
    );
  }, [block?.ongoingTasks, employee?.id]);

  const filteredTasks = useMemo(() => {
    if (!employeeTasks.length) return [];
    return employeeTasks.filter(task => {
      if (!startDate && !endDate) return true;
      const taskStart = new Date(task.startDate);
      const taskEnd = task.endDate ? new Date(task.endDate) : new Date();
      const filterStart = startDate ? new Date(startDate) : new Date(0);
      const filterEnd = endDate ? new Date(endDate) : new Date();
      return taskStart >= filterStart && taskEnd <= filterEnd;
    });
  }, [employeeTasks, startDate, endDate]);

  // Conditional rendering
  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!block || !employee) return <div className="p-6 text-center text-red-600">No employee or block found.</div>;

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
