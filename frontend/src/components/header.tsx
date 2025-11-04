/**
 * header.tsx
 * 
 * @update 11/04/2025
 */
import React from "react";
import { Building2 } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b w-full">
      <div className="w-full px-10 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building2 className="w-10 h-10 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">LECO</h1>
              <p className="text-sm text-gray-600">Project Management System</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Dashboard Overview</p>
            <p className="text-xs text-gray-500">
              Last updated: Today, 10:30 AM
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
