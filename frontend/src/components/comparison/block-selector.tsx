import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface Block {
  block_id: string;
  name: string;
  employees_count: number;
  vehicles_count: number;
  tasks_completed: number;
  tasks_total: number;
  monthly_performance: number;
}

interface BlockSelectorProps {
  selectedBlocks: string[];
  toggleBlock: (id: string) => void;
}

export const BlockSelector: React.FC<BlockSelectorProps> = ({
  selectedBlocks,
  toggleBlock,
}) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fetch blocks from backend
  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await fetch(`${API_URL}/api/blocks`);
        if (!response.ok) throw new Error("Failed to fetch blocks");
        const data = await response.json();
        setBlocks(data);
      } catch (error) {
        console.error("Error fetching blocks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, [API_URL]);

  if (loading) {
    return (
      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle>Loading Blocks...</CardTitle>
          <CardDescription>
            Please wait while we load block data
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mb-8 shadow-md">
      <CardHeader>
        <CardTitle>Select Blocks to Compare</CardTitle>
        <CardDescription>
          Choose multiple blocks for comprehensive analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {blocks.map((block) => (
            <label
              key={block.block_id}
              className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedBlocks.includes(block.block_id)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedBlocks.includes(block.block_id)}
                onChange={() => toggleBlock(block.block_id)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="font-medium text-gray-900">{block.name}</span>
            </label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
