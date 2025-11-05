// src/components/BlockSelector.tsx
import React, { useState, useEffect } from "react";
import { blockAPI } from "../services/api";

interface BlockSelectorProps {
  onSelect: (blockId: string) => void;
}

const BlockSelector: React.FC<BlockSelectorProps> = ({ onSelect }) => {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<string>("");

  useEffect(() => {
    const fetchBlocks = async (): Promise<void> => {
      try {
        const res = await blockAPI.getAll();
        setBlocks(res.data);
      } catch (error) {
        console.error("Error fetching blocks:", error);
      }
    };

    fetchBlocks();
  }, []);

  const handleAnalyze = (): void => {
    if (selectedBlock) {
      onSelect(selectedBlock);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold mb-4">Choose Block</h3>
      <select
        value={selectedBlock}
        onChange={(e) => setSelectedBlock(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded-md mb-4"
      >
        <option value="">Select a Block</option>
        {blocks.map((block: any) => (
          <option key={block.id} value={block.id}>
            {block.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleAnalyze}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Analyze
      </button>
    </div>
  );
};

export default BlockSelector;
