import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";

interface Block {
  block_id: string;
  name: string;
  employees_count: number;
  vehicles_count: number;
  tasks_completed: number;
  tasks_total: number;
  monthly_performance: number;
}

interface RadarComparisonChartProps {
  selectedBlocks: string[];
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export const RadarComparisonChart: React.FC<RadarComparisonChartProps> = ({
  selectedBlocks,
}) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await fetch(`${API_URL}/api/blocks`);
        const data = await response.json();
        setBlocks(data);
      } catch (error) {
        console.error("Error fetching blocks:", error);
      }
    };
    fetchBlocks();
  }, [API_URL]);

  // Prepare radar data
  const radarData = [
    { metric: "Performance" },
    { metric: "Completion" },
    { metric: "Employees" },
    { metric: "Vehicles" },
  ];

  selectedBlocks.forEach((blockId) => {
    const block = blocks.find((b) => b.block_id === blockId);
    if (block) {
      radarData[0][block.name] = block.monthly_performance;
      radarData[1][block.name] = Math.round(
        (block.tasks_completed / (block.tasks_total || 1)) * 100
      );
      radarData[2][block.name] = block.employees_count;
      radarData[3][block.name] = block.vehicles_count;
    }
  });

  return (
    <Card className="mb-8 shadow-md">
      <CardHeader>
        <CardTitle>Multi-Dimensional Analysis</CardTitle>
        <CardDescription>
          Comparison across key operational metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            {selectedBlocks.map((blockId, idx) => {
              const block = blocks.find((b) => b.block_id === blockId);
              if (!block) return null;
              return (
                <Radar
                  key={block.block_id}
                  name={block.name}
                  dataKey={block.name}
                  stroke={COLORS[idx % COLORS.length]}
                  fill={COLORS[idx % COLORS.length]}
                  fillOpacity={0.3}
                />
              );
            })}
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
