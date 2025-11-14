// src/components/BlockCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

interface BlockCardProps {
  block: any;
}

const BlockCard: React.FC<BlockCardProps> = ({ block }) => {
  const navigate = useNavigate();
  const overallProgress = block.performanceMonthly || 0;
  const ongoingTasksCount = block.ongoingTasks?.length || 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{block.name}</h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            overallProgress > 70
              ? "bg-green-100 text-green-800"
              : overallProgress > 50
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {overallProgress}%
        </span>
      </div>
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2 text-center">
          {overallProgress}% Overall Progress
        </p>
      </div>
      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p>Ongoing Tasks: {ongoingTasksCount}</p>
        <p>Vehicles: {block.vehiclesCount || 0}</p>
      </div>
      <button
        onClick={() => navigate(`/block-details/${block.id}`)}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        See More
      </button>
    </div>
  );
};

export default BlockCard;
