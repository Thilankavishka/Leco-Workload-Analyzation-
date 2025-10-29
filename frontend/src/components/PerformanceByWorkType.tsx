// src/components/PerformanceByWorkType.tsx
import React from "react";
import type { PerformanceData } from "../types";

interface PerformanceByWorkTypeProps {
  workType: string;
  setWorkType: (value: string) => void;
  onFetch: () => void;
  data: PerformanceData[];
}

function PerformanceByWorkType({
  workType,
  setWorkType,
  onFetch,
  data,
}: PerformanceByWorkTypeProps) {
  return (
    <div>
      <h2>Performance by Work Type</h2>
      <input
        type="text"
        value={workType}
        onChange={(e) => setWorkType(e.target.value)}
        placeholder="Enter work type"
      />
      <button onClick={onFetch}>Fetch</button>
      {data.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Team ID</th>
              <th>Total Tasks</th>
              <th>Avg Estimated Cost</th>
              <th>Avg Final Cost</th>
              <th>Cost Efficiency %</th>
              <th>Avg Time Hours</th>
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
                <td>{item.performance_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PerformanceByWorkType;
