import React, { useState } from "react";
import LogsFilter from "../components/LogsFilter";
import LogsTable from "../components/LogsTable";
import type { Log } from "../types";

function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async (teamId: string, logId: string) => {
    setLoading(true);
    setError(null);
    try {
      let query = "";
      if (teamId) query = `?team_id=${teamId}`;
      else if (logId) query = `?log_id=${logId}`;

      const response = await fetch(`http://localhost:4000/logs${query}`);
      if (!response.ok) throw new Error("Failed to fetch logs");
      const data: Log[] = await response.json();
      setLogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Logs</h1>
      <LogsFilter onFetch={fetchLogs} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <LogsTable logs={logs} />
    </div>
  );
}

export default LogsPage;
