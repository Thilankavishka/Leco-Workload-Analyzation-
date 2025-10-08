import React from "react";
import { Filter, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import blockData from "@/data/block-data";

interface AnalysisPageProps {
  onNavigate: (page: string) => void;
  selectedBlock: string | null;
  setSelectedBlock: (id: string | null) => void;
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({
  onNavigate,
  selectedBlock,
  setSelectedBlock,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate("home")}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2"
            >
              <span>← Back to Dashboard</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Block Analysis</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Select Block for Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <select
                  value={selectedBlock || ""}
                  onChange={(e) => setSelectedBlock(e.target.value || null)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Choose a block...</option>
                  {Object.keys(blockData).map((key) => (
                    <option key={key} value={key}>
                      {blockData[key].name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <button
                onClick={() => selectedBlock && onNavigate("blockDetails")}
                disabled={!selectedBlock}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
              >
                Analyze
              </button>
            </div>
          </CardContent>
        </Card>

        {selectedBlock && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Total Employees
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {blockData[selectedBlock].employees}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Vehicles Assigned
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {blockData[selectedBlock].vehicles}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Tasks Completed
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {blockData[selectedBlock].tasks.completed}/
                      {blockData[selectedBlock].tasks.total}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Completion Rate
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {Math.round(
                        (blockData[selectedBlock].tasks.completed /
                          blockData[selectedBlock].tasks.total) *
                          100
                      )}
                      %
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default AnalysisPage;
