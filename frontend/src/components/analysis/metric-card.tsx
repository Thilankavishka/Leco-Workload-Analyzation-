import { Card, CardContent } from "../ui/card";

export const MetricCard: React.FC<{
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
}> = ({ label, value, icon }) => (
  <Card className="shadow-lg backdrop-blur-sm bg-white/50 transition-all hover:shadow-xl">
    <CardContent className="pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        {icon}
      </div>
    </CardContent>
  </Card>
);