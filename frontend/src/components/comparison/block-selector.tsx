import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import blockData from "@/data/block-data";

interface BlockSelectorProps {
  selectedBlocks: string[];
  toggleBlock: (id: string) => void;
}

export const BlockSelector: React.FC<BlockSelectorProps> = ({ selectedBlocks, toggleBlock }) => (
  <Card className="mb-8 shadow-md">
    <CardHeader>
      <CardTitle>Select Blocks to Compare</CardTitle>
      <CardDescription>Choose multiple blocks for comprehensive analysis</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.keys(blockData).map((blockId) => (
          <label
            key={blockId}
            className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedBlocks.includes(blockId)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              checked={selectedBlocks.includes(blockId)}
              onChange={() => toggleBlock(blockId)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <span className="font-medium text-gray-900">{blockData[blockId].name}</span>
          </label>
        ))}
      </div>
    </CardContent>
  </Card>
);
