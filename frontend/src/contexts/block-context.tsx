/**
 * block-context.tsx
 * 
 * @update 11/04/2025
 */
import axiosInstance from "@/common/axios-instance";
import { apiSummary } from "@/common/summary-api";
import type { Block } from "@/common/type";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

// Context Type
interface BlockContextType {
  blockData: Record<string, Block>;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Create Context
const BlockContext = createContext<BlockContextType | undefined>(undefined);

// Provider Component
export const BlockProvider = ({ children }: { children: ReactNode }) => {
  const [blockData, setBlockData] = useState<Record<string, Block>|null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlockData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(apiSummary.blocks.getAll);
      setBlockData(response.data);
    } catch (err: any) {
      console.error("Error fetching block data:", err);
      setError(err.message || "Failed to fetch blocks");
      // Keep mock data as fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockData();
  }, []);

  const refetch = async () => {
    await fetchBlockData();
  };
  
  if(blockData===null){
    return <div>Loading...</div>;
  }

  return (
    <BlockContext.Provider value={{ blockData, loading, error, refetch }}>
      {children}
    </BlockContext.Provider>
  );
};

// Custom Hook
export const useBlock = () => {
  const context = useContext(BlockContext);
  if (!context) {
    throw new Error("useBlock must be used within a BlockProvider");
  }
  return context;
};