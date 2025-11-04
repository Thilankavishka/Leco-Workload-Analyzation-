import React, { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import blockData from "@/data/block-data";
import { EmployeeTasks } from "@/components/employee-analysis/employee-tasks";
import { EmployeeInfo } from "@/components/employee-analysis/employee-info";
import { EmployeePerformanceSummary } from "@/components/employee-analysis/employee-performance-summary";
import type { Block, Employee } from "@/common/type";

const EmployeeAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const { blockId, employeeId } = useParams<{ blockId: string; employeeId: string }>();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Early exit if missing params
  if (!blockId || !employeeId) return null;

  const block: Block | undefined = blockData[blockId];
  const employee: Employee | undefined = block?.staff?.find(
    (e) => e.id === employeeId
  );

  // Exit early if not found
  if (!block || !employee) return null;

  // Safely handle undefined arrays and task fields
  const employeeTasks = useMemo(() => {
    return (block.ongoingTasks ?? []).filter((task) => {
      const assignedList = task.assignedTo ?? [];
      return assignedList.includes(employee.id ?? "");
    });
  }, [block.ongoingTasks, employee.id]);

  // Filter tasks by date range
  const filteredTasks = useMemo(() => {
    return employeeTasks.filter((task) => {
      if (!startDate && !endDate) return true;

      const taskStart = new Date(task.startDate);
      const taskEnd = task.endDate ? new Date(task.endDate) : new Date();
      const filterStart = startDate ? new Date(startDate) : new Date(0);
      const filterEnd = endDate ? new Date(endDate) : new Date();

      return taskStart >= filterStart && taskEnd <= filterEnd;
    });
  }, [employeeTasks, startDate, endDate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
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
        {/* Employee Info */}
        <EmployeeInfo block={block} employee={employee} />

        {/* Employee Tasks with Date Filter */}
        <EmployeeTasks
          employee={employee}
          tasks={filteredTasks}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />

        {/* Performance Summary & Recommendations */}
        <EmployeePerformanceSummary block={block} employee={employee} />
      </main>
    </div>
  );
};

export default EmployeeAnalysisPage;
