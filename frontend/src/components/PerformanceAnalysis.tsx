// src/components/PerformanceAnalysis.tsx
import React from "react";
import type { PerformanceData } from "../types";

interface PerformanceAnalysisProps {
  data: PerformanceData[];
}

function PerformanceAnalysis({ data }: PerformanceAnalysisProps) {
  if (data.length === 0) return <p>No analysis data.</p>;

  return (
    <div>
      <h2>Team Performance Analysis</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Team ID</th>
            <th>Total Tasks</th>
            <th>Avg Estimated Cost</th>
            <th>Avg Final Cost</th>
            <th>Cost Efficiency %</th>
            <th>Avg Time Hours</th>
            <th>Total Hours Worked</th>
            <th>Performance Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.team_id}>
              <td>{item.team_id}</td>
              <td>{item.total_tasks}</td>
              <td>{item.avg_estimated_cost}</td>
              <td>{item.avg_final_cost}</td>
              <td>{item.cost_efficiency_percentage}</td>
              <td>{item.avg_time_hours}</td>
              <td>{item.total_hours_worked}</td>
              <td>{item.performance_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PerformanceAnalysis;
