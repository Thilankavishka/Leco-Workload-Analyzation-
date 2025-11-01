import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export const EmployeeTasks = ({ employeeId }: { employeeId: string }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/employees/${employeeId}/tasks`
        );
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [employeeId, API_URL]);

  const filteredTasks = tasks.filter((task) => {
    const s = startDate ? new Date(startDate) : null;
    const e = endDate ? new Date(endDate) : null;
    const taskStart = new Date(task.startDate);
    return (!s || taskStart >= s) && (!e || taskStart <= e);
  });

  if (loading) return <p>Loading tasks...</p>;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="w-6 h-6 text-blue-600" />
          <span>Assigned Tasks</span>
        </CardTitle>
        <CardDescription>
          Tasks assigned to the employee with progress and status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div>
            <label className="text-sm text-gray-600 mr-2">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mr-2">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {filteredTasks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-sm font-semibold text-gray-900">
                    Task Name
                  </th>
                  <th className="p-3 text-sm font-semibold text-gray-900">
                    Progress
                  </th>
                  <th className="p-3 text-sm font-semibold text-gray-900">
                    Priority
                  </th>
                  <th className="p-3 text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="p-3 text-sm font-semibold text-gray-900">
                    Start Date
                  </th>
                  <th className="p-3 text-sm font-semibold text-gray-900">
                    End Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr
                    key={task.task_id}
                    className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                  >
                    <td className="p-3 text-sm text-gray-900">{task.name}</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {task.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-900">
                      {task.progress === 100 ? "Completed" : "Ongoing"}
                    </td>
                    <td className="p-3 text-sm text-gray-900">
                      {task.startDate}
                    </td>
                    <td className="p-3 text-sm text-gray-900">
                      {task.endDate || "Ongoing"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-center">
            No tasks found for the selected date range.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
