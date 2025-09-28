export type StudentStatus = "active" | "inactive" | "suspended" | "graduated" | "retired";
export type StaffRole = "academic" | "admin";
export type EntryType = "income" | "expense";
export type FinancialCategory =
  | "fees"
  | "dues"
  | "medical"
  | "sanctions"
  | "grants"
  | "donations"
  | "trade_fare"
  | "salaries"
  | "benefits"
  | "training"
  | "utilities"
  | "maintenance"
  | "lab_equipment"
  | "software_license"
  | "learning_materials"
  | "tax"
  | "scholarship"
  | "miscellaneous";
export type PaymentStatus = "paid" | "outstanding" | "waived";

export interface Student {
  id: string;
  status: StudentStatus;
  name: string;
  dob?: string;
  photoUrl?: string;
  guardian?: { name?: string; phone?: string } | null;
  stateOfOrigin?: string | null;
  scholarship?: string | null;
  financialStatus?: string | null;
  subjects?: string[] | null;
  medicalIssues?: string[] | null;
  disabilities?: string[] | null;
  sanction?: string | null;
  clubs?: string[] | null;
  grades?: Record<string, unknown> | null;
  cgpa?: number | null;
  classOfDegree?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Staff {
  id: string;
  status: StudentStatus;
  name: string;
  dob?: string;
  phone?: string | null;
  photoUrl?: string | null;
  stateOfOrigin?: string | null;
  disabilities?: string[] | null;
  rank?: string | null;
  salary?: number | null;
  role: StaffRole;
  subjects?: string[] | null;
  department?: string | null;
  sanction?: string | null;
  clubs?: string[] | null;
  qualification?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialEntry {
  id: string;
  type: EntryType;
  category: FinancialCategory;
  amount: number;
  date: string;
  description?: string | null;
  studentId?: string | null;
  staffId?: string | null;
  status?: PaymentStatus | null;
  createdAt: string;
  updatedAt: string;
}

export interface AcademicRecord {
  id: string;
  studentId: string;
  term: string;
  attendance?: number | null;
  testScores?: Record<string, unknown> | null;
  assignments?: Record<string, unknown> | null;
  extraCredits?: Record<string, unknown> | null;
  examScores?: Record<string, unknown> | null;
  grade?: string | null;
  cgpa?: number | null;
  createdAt: string;
  updatedAt: string;
}

const now = () => new Date().toISOString();

export interface MockData {
  students: Student[];
  staff: Staff[];
  financialEntries: FinancialEntry[];
  academicRecords: AcademicRecord[];
}

const today = new Date();
const formatMonth = (monthsAgo: number) => {
  const date = new Date(today);
  date.setMonth(date.getMonth() - monthsAgo);
  return date.toISOString().slice(0, 10);
};

export const initialData: MockData = {
  students: [
    {
      id: "stu_1",
      name: "Ada Lovelace",
      status: "active",
      dob: "2008-12-10",
      guardian: { name: "Ann Lovelace", phone: "+44 7000 000001" },
      stateOfOrigin: "Lagos",
      scholarship: "STEM Excellence",
      medicalIssues: ["Asthma"],
      clubs: ["Robotics", "Mathematics"],
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: "stu_2",
      name: "Chinonso Okafor",
      status: "active",
      dob: "2009-05-21",
      guardian: { name: "Ifeoma Okafor", phone: "+234 800 123 4567" },
      stateOfOrigin: "Anambra",
      clubs: ["Drama"],
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: "stu_3",
      name: "Bola Adebayo",
      status: "graduated",
      dob: "2007-03-02",
      guardian: { name: "Kunle Adebayo" },
      scholarship: null,
      createdAt: now(),
      updatedAt: now(),
    },
  ],
  staff: [
    {
      id: "stf_1",
      name: "Grace Ekanem",
      status: "active",
      role: "academic",
      department: "Science",
      salary: 320000,
      subjects: ["Physics", "Mathematics"],
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: "stf_2",
      name: "Yusuf Balogun",
      status: "active",
      role: "admin",
      department: "Bursary",
      salary: 280000,
      createdAt: now(),
      updatedAt: now(),
    },
  ],
  financialEntries: Array.from({ length: 14 }).flatMap((_, index) => {
    const monthDate = formatMonth(13 - index);
    const baseAmount = 150000 + index * 10000;
    return [
      {
        id: `fin_inc_${index}`,
        type: "income" as const,
        category: "fees" as const,
        amount: baseAmount,
        date: monthDate,
        description: "Tuition fees",
        studentId: "stu_1",
        createdAt: now(),
        updatedAt: now(),
      },
      {
        id: `fin_exp_${index}`,
        type: "expense" as const,
        category: "salaries" as const,
        amount: baseAmount * 0.6,
        date: monthDate,
        description: "Payroll",
        staffId: "stf_1",
        createdAt: now(),
        updatedAt: now(),
      },
    ];
  }),
  academicRecords: [
    {
      id: "acr_1",
      studentId: "stu_1",
      term: "2023 Q1",
      attendance: 92,
      grade: "A",
      cgpa: 4.6,
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: "acr_2",
      studentId: "stu_2",
      term: "2023 Q1",
      attendance: 88,
      grade: "B+",
      cgpa: 4.1,
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: "acr_3",
      studentId: "stu_1",
      term: "2023 Q2",
      attendance: 95,
      grade: "A",
      cgpa: 4.8,
      createdAt: now(),
      updatedAt: now(),
    },
  ],
};
