/**
 * components/stat-card.tsx
 */
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string | number;
  description?: string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, description, color = "text-gray-900" }) => (
  <Card>
    <CardHeader>
      <CardTitle className={`text-sm font-medium ${color}`}>{label}</CardTitle>
      {description && <CardDescription className="text-xs text-gray-500">{description}</CardDescription>}
    </CardHeader>
    <CardContent>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </CardContent>
  </Card>
);

export default StatCard;
