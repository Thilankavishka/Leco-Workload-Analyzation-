/**
 * dashboard-card.tsx
 * 
 * @update 11/04/2025
 */
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  gradientFrom: string; // e.g., "from-blue-500"
  gradientTo: string;   // e.g., "to-blue-600"
  textColor?: string;   // optional, e.g., "text-white"
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  description,
  icon,
  gradientFrom,
  gradientTo,
  textColor = "text-white",
}) => {
  return (
    <Card
      className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} ${textColor} shadow-lg hover:shadow-xl transition-shadow`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-center text-lg">
          <span>{title}</span>
          {icon}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">{value}</p>
        <p className={`${textColor.replace("text-", "text-")} text-sm mt-2`}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
