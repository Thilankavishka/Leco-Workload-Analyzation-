// src/components/WorkforceAnalysis.tsx
import React from "react";
import type { WorkforceAnalysisData } from "../types";

interface WorkforceAnalysisProps {
  data: WorkforceAnalysisData[];
}

function WorkforceAnalysis({ data }: WorkforceAnalysisProps) {
  if (data.length === 0) return <p>No analysis data.</p>;

  return (
    <div>
      <h2>Workforce Analysis</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Department</th>
            <th>Total Employees</th>
            <th>Avg Salary</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.department}>
              <td>{item.department}</td>
              <td>{item.total_employees}</td>
              <td>{item.avg_salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkforceAnalysis;
