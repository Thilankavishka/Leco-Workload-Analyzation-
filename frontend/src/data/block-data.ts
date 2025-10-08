// Rich block data used across pages
export const dashboardData = {
  totalBlocks: 12,
  ongoingProjects: 8,
  completedProjects: 45,
  overallPerformance: [
    { month: "Jan", handover: 65, completion: 75 },
    { month: "Feb", handover: 70, completion: 80 },
    { month: "Mar", handover: 75, completion: 85 },
    { month: "Apr", handover: 80, completion: 82 },
    { month: "May", handover: 85, completion: 88 },
    { month: "Jun", handover: 90, completion: 92 },
  ],
};

interface StaffMember {
  id: string;
  name: string;
  phone: string;
  role: string;
  performance: number;
}

interface Performance {
  today: number;
  lastDay: number;
  weekly: number;
  monthly: number;
  yearly: number;
}

interface PerformanceHistory {
  period: string;
  value: number;
}

interface Block {
  name: string;
  employees: number;
  vehicles: number;
  staff: StaffMember[];
  tasks: { total: number; completed: number };
  performance: Performance;
  performanceHistory: PerformanceHistory[];
}

const blockData: Record<string, Block> = {
  "1": {
    name: "Block 1 - Colombo Central",
    employees: 25,
    vehicles: 8,
    staff: [
      {
        id: "EMP001",
        name: "Nimal Perera",
        phone: "+94 77 123 4567",
        role: "Senior Technician",
        performance: 92,
      },
      {
        id: "EMP002",
        name: "Kamala Silva",
        phone: "+94 71 234 5678",
        role: "Project Manager",
        performance: 88,
      },
      {
        id: "EMP003",
        name: "Ruwan Fernando",
        phone: "+94 76 345 6789",
        role: "Electrician",
        performance: 85,
      },
      {
        id: "EMP004",
        name: "Saman Dias",
        phone: "+94 75 456 7890",
        role: "Technician",
        performance: 78,
      },
      {
        id: "EMP005",
        name: "Priya Jayasinghe",
        phone: "+94 72 567 8901",
        role: "Engineer",
        performance: 95,
      },
    ],
    tasks: { total: 150, completed: 132 },
    performance: {
      today: 85,
      lastDay: 82,
      weekly: 87,
      monthly: 89,
      yearly: 86,
    },
    performanceHistory: [
      { period: "Week 1", value: 82 },
      { period: "Week 2", value: 85 },
      { period: "Week 3", value: 88 },
      { period: "Week 4", value: 87 },
    ],
  },
  "2": {
    name: "Block 2 - Kandy Region",
    employees: 20,
    vehicles: 6,
    staff: [
      {
        id: "EMP006",
        name: "Chandana Kumara",
        phone: "+94 77 678 9012",
        role: "Team Lead",
        performance: 90,
      },
      {
        id: "EMP007",
        name: "Malini Wickrama",
        phone: "+94 71 789 0123",
        role: "Technician",
        performance: 83,
      },
      {
        id: "EMP008",
        name: "Ajith Bandara",
        phone: "+94 76 890 1234",
        role: "Electrician",
        performance: 87,
      },
    ],
    tasks: { total: 120, completed: 98 },
    performance: {
      today: 78,
      lastDay: 80,
      weekly: 82,
      monthly: 84,
      yearly: 81,
    },
    performanceHistory: [
      { period: "Week 1", value: 78 },
      { period: "Week 2", value: 82 },
      { period: "Week 3", value: 84 },
      { period: "Week 4", value: 82 },
    ],
  },
  "3": {
    name: "Block 3 - Galle District",
    employees: 18,
    vehicles: 5,
    staff: [
      {
        id: "EMP009",
        name: "Lasantha Gunawardena",
        phone: "+94 77 901 2345",
        role: "Senior Engineer",
        performance: 94,
      },
      {
        id: "EMP010",
        name: "Shantha De Silva",
        phone: "+94 71 012 3456",
        role: "Supervisor",
        performance: 89,
      },
    ],
    tasks: { total: 110, completed: 95 },
    performance: {
      today: 88,
      lastDay: 86,
      weekly: 90,
      monthly: 91,
      yearly: 89,
    },
    performanceHistory: [
      { period: "Week 1", value: 87 },
      { period: "Week 2", value: 90 },
      { period: "Week 3", value: 91 },
      { period: "Week 4", value: 90 },
    ],
  },
};

export default blockData;
