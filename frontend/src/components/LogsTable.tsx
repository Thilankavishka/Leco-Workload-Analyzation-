// src/components/LogsTable.tsx
import React from "react";
import type { Log } from "../types";

interface LogsTableProps {
  logs: Log[];
}

function LogsTable({ logs }: LogsTableProps) {
  if (logs.length === 0) return <p>No logs found.</p>;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Log ID</th>
          <th>Team ID</th>
          <th>Type of Work</th>
          <th>Estimated Cost</th>
          <th>Final Cost</th>
          <th>Date of Work</th>
          <th>Time Taken</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log.log_id}>
            <td>{log.log_id}</td>
            <td>{log.team_id}</td>
            <td>{log.type_of_work}</td>
            <td>{log.estimated_cost}</td>
            <td>{log.final_cost}</td>
            <td>{log.date_of_work}</td>
            <td>{log.time_taken}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LogsTable;
