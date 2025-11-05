// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Analyzing from "./pages/Analyzing.tsx";
import BlockDetails from "./pages/BlockDetails.tsx";
import DeepComparison from "./pages/DeepComparison.tsx";
import EmployeeDetails from "./pages/EmployeeDetails.tsx";
import Header from "./components/Header.tsx";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analyzing" element={<Analyzing />} />
            <Route path="/block-details/:blockId" element={<BlockDetails />} />
            <Route
              path="/deep-comparison/:blockId"
              element={<DeepComparison />}
            />
            <Route path="/employee/:employeeId" element={<EmployeeDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
