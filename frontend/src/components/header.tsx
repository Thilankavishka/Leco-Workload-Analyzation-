// src/components/Header.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-900 text-white shadow-2xl relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,#3b82f6_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#a855f7_0%,transparent_50%)]"></div>
      </div>
      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold">⚡</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">LECO Workload Management</h1>
              <p className="text-sm opacity-90">
                Empowering Electricity Distribution
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg hover:bg-yellow-300 transition-all duration-200 font-semibold shadow-lg"
          >
            Dashboard
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
