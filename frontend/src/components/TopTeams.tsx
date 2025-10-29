// src/components/TopTeams.tsx
import React from "react";
import type { TopTeam } from "../types";

interface TopTeamsProps {
  data: TopTeam[];
}

function TopTeams({ data }: TopTeamsProps) {
  if (data.length === 0) return <p>No top teams data.</p>;

  return (
    <div>
      <h2>Top Performing Teams</h2>
      <ul>
        {data.map((team, index) => (
          <li key={team.team_id}>
            Rank {index + 1}: Team {team.team_id} - Score:{" "}
            {team.performance_score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopTeams;
