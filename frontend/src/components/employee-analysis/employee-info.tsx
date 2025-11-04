/**
 * employee-info.tsx
 * 
 * @update 11/04/2025
 */
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Phone, Building2, Award, UserCheck } from "lucide-react";

export const EmployeeInfo = ({ block, employee }: any) => {
  const categoryColor =
    employee.performance >= 90
      ? "text-green-600"
      : employee.performance >= 80
      ? "text-blue-600"
      : employee.performance >= 70
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl mb-2">{employee.name}</CardTitle>
            <CardDescription className="text-blue-100">
              {employee.role} • {employee.id}
            </CardDescription>
          </div>
          <UserCheck className="w-16 h-16 opacity-80" />
        </div>
      </CardHeader>
      <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center space-x-3">
          <Phone className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Contact</p>
            <p className="font-semibold text-gray-900">{employee.phone}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Building2 className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Block</p>
            <p className="font-semibold text-gray-900">{block.name.split(" - ")[0]}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Award className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Performance Score</p>
            <p className={`font-semibold text-2xl ${categoryColor}`}>{employee.performance}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
