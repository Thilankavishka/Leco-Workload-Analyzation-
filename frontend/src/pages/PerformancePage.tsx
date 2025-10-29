import React, { useState, useEffect } from "react";
import PerformanceAnalysis from "../components/PerformanceAnalysis";
import TopTeams from "../components/TopTeams";
import PerformanceByWorkType from "../components/PerformanceByWorkType";
import type { PerformanceData, TopTeam } from "../types";

function PerformancePage() {
  const [analysis, setAnalysis] = useState<PerformanceData[]>([]);
  const [topTeams, setTopTeams] = useState<TopTeam[]>([]);
  const [workTypeData, setWorkTypeData] = useState<PerformanceData[]>([]);
  const [workType, setWorkType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalysis();
    fetchTopTeams();
  }, []);

  const fetchAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:4000/performance/analysis"
      );
      if (!response.ok) throw new Error("Failed to fetch analysis");
      const data: PerformanceData[] = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const fetchTopTeams = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/performance/top");
      if (!response.ok) throw new Error("Failed to fetch top teams");
      const data: TopTeam[] = await response.json();
      setTopTeams(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const fetchByWorkType = async () => {
    if (!workType) return;
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4000/performance/work-type?work_type=${workType}`
      );
      if (!response.ok) throw new Error("Failed to fetch by work type");
      const data: PerformanceData[] = await response.json();
      setWorkTypeData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Performance</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <PerformanceAnalysis data={analysis} />
      <TopTeams data={topTeams} />
      <PerformanceByWorkType
        workType={workType}
        setWorkType={setWorkType}
        onFetch={fetchByWorkType}
        data={workTypeData}
      />
    </div>
  );
}

export default PerformancePage;
