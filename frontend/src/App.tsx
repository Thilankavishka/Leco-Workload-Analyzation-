import React, { useState } from "react";
import HomePage from "./pages/home-page";
import AnalysisPage from "./pages/analysis-page";
import BlockDetailsPage from "./pages/block-details-page";
import ComparisonPage from "./pages/comparison-page";
import EmployeeAnalysisPage from "./pages/employee-analysis-page";
// data is imported directly in pages as needed

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  type Employee = {
    id: string;
    name: string;
    phone: string;
    role: string;
    performance: number;
  };
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  return (
    <div>
      {currentPage === "home" && <HomePage onNavigate={setCurrentPage} />}
      {currentPage === "analysis" && (
        <AnalysisPage
          onNavigate={setCurrentPage}
          selectedBlock={selectedBlock}
          setSelectedBlock={setSelectedBlock}
        />
      )}
      {currentPage === "blockDetails" && (
        <BlockDetailsPage
          onNavigate={setCurrentPage}
          selectedBlock={selectedBlock}
          onViewEmployee={(employee) => {
            setSelectedEmployee(employee);
            setCurrentPage("employeeAnalysis");
          }}
        />
      )}
      {currentPage === "comparison" && (
        <ComparisonPage onNavigate={setCurrentPage} />
      )}
      {currentPage === "employeeAnalysis" && (
        <EmployeeAnalysisPage
          onNavigate={setCurrentPage}
          selectedBlock={selectedBlock}
          selectedEmployee={selectedEmployee}
          clearEmployee={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
};

export default App;
