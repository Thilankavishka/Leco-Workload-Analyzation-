import React, { useState, useEffect } from "react";
import EmployeeList from "../components/EmployeeList";
import AddEmployeeForm from "../components/AddEmployeeForm";
import WorkforceAnalysis from "../components/WorkforceAnalysis";
import type { Employee, WorkforceAnalysisData, NewEmployee } from "../types";

function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [analysis, setAnalysis] = useState<WorkforceAnalysisData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployees();
    fetchAnalysis();
  }, []);

  const fetchEmployees = async () => {
  setLoading(true);
  try {
    const response = await fetch("http://localhost:4000/employees");
    const data: Employee[] = await response.json();
    console.log("Fetched employees:", data); // 👈 add this
    setEmployees(data);
  } catch (err) {
    setError(err instanceof Error ? err.message : String(err));
  } finally {
    setLoading(false);
  }
};


  const fetchAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/employees/analysis");
      if (!response.ok) throw new Error("Failed to fetch analysis");
      const data: WorkforceAnalysisData[] = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (newEmployee: NewEmployee) => {
    try {
      const response = await fetch("http://localhost:4000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });
      if (!response.ok) throw new Error("Failed to add employee");
      await fetchEmployees(); // Refresh list
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div>
      <h1>Employees</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <AddEmployeeForm onAdd={addEmployee} />
      <EmployeeList employees={employees} />
      <WorkforceAnalysis data={analysis} />
    </div>
  );
}

export default EmployeesPage;
