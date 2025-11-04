import type { Block } from "@/common/type";

const blockData: Record<string, Block> = {
  blockA: {
    id: "cmhkrfdox000084hooooxh647",
    name: "Urban Zone - Block A",
    employeesCount: 12,
    vehiclesCount: 6,
    tasksCompleted: 8,
    tasksTotal: 10,
    performanceMonthly: 85,
    createdAt: "2025-11-04T16:05:00.560Z",
    updatedAt: "2025-11-04T16:05:00.560Z",

    staff: [
      {
        id: "cmhkrghgu000384hok15jo5l9",
        name: "Ruwan Perera",
        phone: "0711234567",
        role: "Technician",
        performance: 90,
        tasksCompleted: 5,
        tasksAssigned: 6,
        blockId: "cmhkrfdox000084hooooxh647",
        createdAt: "2025-11-04T16:05:52.109Z",
        updatedAt: "2025-11-04T16:05:52.109Z",
      },
    ],

    ongoingTasks: [
      {
        id: "cmhkrhjw8000784ho2ya7zdyu",
        name: "Street Light Maintenance - Phase 01",
        progress: 45,
        priority: "HIGH",
        startDate: "2025-11-01T00:00:00.000Z",
        endDate: null,
        blockId: "cmhkrfdox000084hooooxh647",
        createdAt: "2025-11-04T16:06:41.911Z",
        updatedAt: "2025-11-04T16:06:41.911Z",
      },
    ],

    performanceHistory: [],
  },

  blockB: {
    id: "cmhkrfoy5000184ho360jsn5w",
    name: "Industrial Zone - Block B",
    employeesCount: 20,
    vehiclesCount: 10,
    tasksCompleted: 15,
    tasksTotal: 18,
    performanceMonthly: 92,
    createdAt: "2025-11-04T16:05:15.150Z",
    updatedAt: "2025-11-04T16:05:15.150Z",

    staff: [
      {
        id: "cmhkrh099000584holk5jfwi1",
        name: "Nadeesha Kumari",
        phone: "0776543210",
        role: "Engineer",
        performance: 88,
        tasksCompleted: 12,
        tasksAssigned: 14,
        blockId: "cmhkrfoy5000184ho360jsn5w",
        createdAt: "2025-11-04T16:06:16.460Z",
        updatedAt: "2025-11-04T16:06:16.460Z",
      },
    ],

    ongoingTasks: [
      {
        id: "cmhkrht7v000984hok2lxhgrt",
        name: "Transformer Upgrade - Zone B",
        progress: 100,
        priority: "MEDIUM",
        startDate: "2025-10-15T00:00:00.000Z",
        endDate: "2025-10-25T00:00:00.000Z",
        blockId: "cmhkrfoy5000184ho360jsn5w",
        createdAt: "2025-11-04T16:06:53.995Z",
        updatedAt: "2025-11-04T16:06:53.995Z",
      },
    ],

    performanceHistory: [
      {
        id: "1",
        period: "Week 1",
        value: 80,
        blockId: "cmhkrfoy5000184ho360jsn5w",
      },
      {
        id: "2",
        period: "Week 2",
        value: 90,
        blockId: "cmhkrfoy5000184ho360jsn5w",
      },
    ],
  },
};

export default blockData;
