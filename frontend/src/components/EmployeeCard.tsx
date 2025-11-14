// src/components/EmployeeCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

interface EmployeeCardProps {
  employee: any;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const navigate = useNavigate();
  const successRate = employee.tasksAssigned
    ? ((employee.tasksCompleted / employee.tasksAssigned) * 100 || 0).toFixed(2)
    : "0";

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-semibold text-gray-900 text-lg">{employee.name}</h4>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            employee.performance > 70
              ? "bg-green-100 text-green-800"
              : employee.performance > 50
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {employee.performance || 0}%
        </span>
      </div>
      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p>Role: {employee.role || "N/A"}</p>
        <p>Tasks Done: {employee.tasksCompleted || 0}</p>
        <p>Success Rate: {successRate}%</p>
      </div>
      <button
        onClick={() => navigate(`/employee/${employee.id}`)}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        View Details
      </button>
    </div>
  );
};

export default EmployeeCard;
