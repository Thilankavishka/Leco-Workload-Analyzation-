import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import blockData from "@/data/block-data";

interface ComparisonPageProps {
  onNavigate?: (page: string) => void;
}

const ComparisonPage: React.FC<ComparisonPageProps> = ({ onNavigate }) => (
  <div className="min-h-screen bg-gray-50">
    <header className="bg-white border-b shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <button
          onClick={() => onNavigate?.("blockDetails")}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Block Comparison</h1>
        <div className="w-32"></div>
      </div>
    </header>

    <main className="max-w-7xl mx-auto px-6 py-8">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Comparison Data</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(blockData).map((key) => (
            <div
              key={key}
              className="flex justify-between border-b py-2 text-gray-700"
            >
              <span>{blockData[key].name}</span>
              <span>
                {Math.round(
                  (blockData[key].tasks.completed /
                    blockData[key].tasks.total) *
                    100
                )}
                %
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  </div>
);

export default ComparisonPage;
