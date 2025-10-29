// src/components/LogsFilter.tsx
import React, { useState } from "react";

interface LogsFilterProps {
  onFetch: (teamId: string, logId: string) => void;
}

function LogsFilter({ onFetch }: LogsFilterProps) {
  const [teamId, setTeamId] = useState<string>("");
  const [logId, setLogId] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFetch(teamId, logId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Team ID:
        <input
          type="number"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
        />
      </label>
      <label>
        Log ID:
        <input
          type="number"
          value={logId}
          onChange={(e) => setLogId(e.target.value)}
        />
      </label>
      <button type="submit">Fetch Logs</button>
    </form>
  );
}

export default LogsFilter;
