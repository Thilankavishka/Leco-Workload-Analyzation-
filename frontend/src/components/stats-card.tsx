import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  subtitle: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color,
  subtitle,
}) => {
  return (
    <Card
      className={`bg-gradient-to-br ${color} text-white border-0 shadow-lg hover:shadow-xl transition-shadow`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{title}</span>
          {icon}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">{value}</p>
        <p className="text-blue-100 text-sm mt-2">{subtitle}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
