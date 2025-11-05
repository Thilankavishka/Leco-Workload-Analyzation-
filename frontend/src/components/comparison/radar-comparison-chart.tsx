/**
 * radar-comparison-chart.tsx
 * 
 * @update 11/04/2025
 */
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { useBlock } from "@/contexts/block-context";

interface RadarComparisonChartProps {
  selectedBlocks: string[];
  radarData: any[];
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export const RadarComparisonChart: React.FC<RadarComparisonChartProps> = ({ selectedBlocks, radarData }) =>{
  const {blockData} = useBlock();
  
  return(
  <Card className="mb-8 shadow-md">
    <CardHeader>
      <CardTitle>Multi-Dimensional Analysis</CardTitle>
      <CardDescription>Comparison across key operational metrics</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis angle={90} domain={[0, 100]} />
          {selectedBlocks.map((blockId, idx) => {
            const blockName = blockData[blockId].name.split(" - ")[0];
            return (
              <Radar
                key={blockId}
                name={blockName}
                dataKey={blockName}
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
}