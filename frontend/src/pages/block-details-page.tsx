import React from "react";
import { Users, Car, Award, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import blockData from "@/data/block-data";

interface BlockDetailsProps {
  onNavigate: (page: string) => void;
  selectedBlock: string | null;
  onViewEmployee: (employee: {
    id: string;
    name: string;
    phone: string;
    role: string;
    performance: number;
  }) => void;
}

const BlockDetailsPage: React.FC<BlockDetailsProps> = ({
  onNavigate,
  selectedBlock,
  onViewEmployee,
}) => {
  const block = selectedBlock ? blockData[selectedBlock] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate("analysis")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Analysis
            </button>
            {block && (
              <h1 className="text-2xl font-bold text-gray-900">{block.name}</h1>
            )}
            <div className="w-32" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Total Employees</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-900">
                {block ? block.employees : "N/A"}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Car className="w-5 h-5 text-green-600" />
                <span>Vehicles</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-900">
                {block ? block.vehicles : "N/A"}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span>Task Completion</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-900">
                {block
                  ? Math.round(
                      (block.tasks.completed / block.tasks.total) * 100
                    )
                  : "N/A"}
                %
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle>Employee Details</CardTitle>
            <CardDescription>
              Complete staff information and contact details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Staff ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Phone Number
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Performance
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {block?.staff.map(
                    (employee: {
                      id: string;
                      name: string;
                      phone: string;
                      role: string;
                      performance: number;
                    }) => (
                      <tr
                        key={employee.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">
                          {employee.id}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {employee.name}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                          {employee.role}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600 flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{employee.phone}</span>
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  employee.performance >= 90
                                    ? "bg-green-500"
                                    : employee.performance >= 80
                                    ? "bg-blue-500"
                                    : "bg-yellow-500"
                                }`}
                                style={{ width: `${employee.performance}%` }}
                              />
                            </div>
                            <span className="font-semibold text-gray-700">
                              {employee.performance}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <button
                            onClick={() => onViewEmployee(employee)}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BlockDetailsPage;
