// src/components/BackButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  to?: string; // Optional: specific route, defaults to previous page
}

const BackButton: React.FC<BackButtonProps> = ({ to }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="fixed top-23 left-4 z-50 bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 flex items-center gap-2"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back
    </button>
  );
};

export default BackButton;
