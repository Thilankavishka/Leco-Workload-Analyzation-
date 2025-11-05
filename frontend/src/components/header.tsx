// src/components/Header.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">LECO Workload Management</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          Dashboard
        </button>
      </div>
    </header>
  );
};

export default Header;
