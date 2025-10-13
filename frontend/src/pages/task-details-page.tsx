import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { ArrowRight, Activity, UserCheck } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import blockData from "@/data/block-data";

interface TaskDetailsProps {
  onNavigate: (page: string) => void;
  selectedBlock: string | null;
  selectedTask: { taskId: string; blockId: string } | null;
  onViewEmployee: (employee: {
    id: string;
    name: string;
    phone: string;
    role: string;
    performance: number;
    tasksCompleted: number;
    tasksAssigned: number;
  }) => void;
}

const TaskDetailsPage: React.FC<TaskDetailsProps> = ({
  onNavigate,
  selectedBlock,
  selectedTask,
  onViewEmployee,
}) => {
  if (!selectedBlock || !selectedTask) return null;

  const block = blockData[selectedBlock];
  const task = block.ongoingTasks.find((t) => t.id === selectedTask.taskId);
  if (!task) return null;

  const assignedEmployees = task.assignedTo
    .map((empId) => block.staff.find((emp) => emp.id === empId))
    .filter((emp): emp is NonNullable<typeof emp> => !!emp);

  const performanceData = assignedEmployees.map((emp) => ({
    name: emp.name.split(" ")[0],
    performance: emp.performance,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => onNavigate("home")}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{task.name}</h1>
          <div className="w-32"></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Card className="mb-8 shadow-md bg-gradient-to-r from-white to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-6 h-6 text-blue-600" />
              <span>Task Overview</span>
            </CardTitle>
            <CardDescription>{block.name.split(" - ")[0]}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600">Progress</p>
                <p className="text-2xl font-bold text-blue-600">{task.progress}%</p>
                <div className="mt-2 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600">Priority</p>
                <p
                  className={`text-2xl font-bold ${
                    task.priority === "high"
                      ? "text-red-600"
                      : task.priority === "medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600">Assigned Employees</p>
                <p className="text-2xl font-bold text-purple-600">
                  {assignedEmployees.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserCheck className="w-6 h-6 text-blue-600" />
              <span>Assigned Employees</span>
            </CardTitle>
            <CardDescription>Performance metrics for employees assigned to this task</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {assignedEmployees.map((employee) => (
                <div
                  key={employee.id}
                  onClick={() => onViewEmployee(employee)}
                  className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer bg-white"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {employee.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {employee.role} • {employee.id}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">
                            Performance
                          </p>
                          <p className="text-2xl font-bold text-blue-600">
                            {employee.performance}%
                          </p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">
                            Tasks Done
                          </p>
                          <p className="text-2xl font-bold text-green-600">
                            {employee.tasksCompleted}/{employee.tasksAssigned}
                          </p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">
                            Success Rate
                          </p>
                          <p className="text-2xl font-bold text-purple-600">
                            {Math.round(
                              (employee.tasksCompleted /
                                employee.tasksAssigned) *
                                100
                            )}
                            %
                          </p>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 ml-4" />
                  </div>
                </div>
              ))}
            </div>

            {assignedEmployees.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Performance Comparison
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar
                      dataKey="performance"
                      fill="#3b82f6"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TaskDetailsPage;