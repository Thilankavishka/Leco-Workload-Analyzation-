import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page";
import AnalysisPage from "./pages/analysis-page";
import BlockDetailsPage from "./pages/block-details-page";
import ComparisonPage from "./pages/comparison-page";
import EmployeeAnalysisPage from "./pages/employee-analysis-page";
import TaskDetailsPage from "./pages/task-details-page";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/analysis/:blockId" element={<AnalysisPage />} />
        <Route path="/block/:blockId" element={<BlockDetailsPage />} />
        <Route path="/comparison" element={<ComparisonPage />} />
        <Route path="/employee/:employeeId" element={<EmployeeAnalysisPage />} />
        <Route path="/block/:blockId/employee/:employeeId" element={<EmployeeAnalysisPage />} />
        <Route path="/block/:blockId/task/:taskId" element={<TaskDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;