export type Status = "active" | "inactive" | "suspended" | "graduated" | "retired";

export interface Staff {
  id: string;
  status: Status;
  name: string;
  dob?: string; // ISO date
  phone?: string;
  photoUrl?: string;
  stateOfOrigin?: string;
  disabilities?: string[];
  rank?: string;
  salary?: number; // base monthly
  role: "academic" | "admin";
  subjects?: string[];
  department?: string;
  sanction?: string;
  clubs?: string[];
  qualification?: string;
}

export interface GuardianDetails {
  name: string;
  phone?: string;
  address?: string;
  relationship?: string;
}

export interface Student {
  id: string;
  status: Status;
  name: string;
  dob?: string; // ISO date
  photoUrl?: string;
  guardian?: GuardianDetails;
  stateOfOrigin?: string;
  scholarship?: string;
  financialStatus?: string;
  subjects?: string[];
  medicalIssues?: string[];
  disabilities?: string[];
  sanction?: string;
  clubs?: string[];
  grades?: Record<string, string>; // course -> grade
  cgpa?: number;
  classOfDegree?: string;
}

export interface AcademicRecord {
  id: string;
  studentId: string;
  term: string; // e.g. 2024/2025 T1
  attendance?: number; // percentage 0-100
  testScores?: Record<string, number>; // test name -> score
  assignments?: Record<string, number>;
  extraCredits?: Record<string, number>;
  examScores?: Record<string, number>;
  grade?: string;
  cgpa?: number;
}

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

export interface FinancialEntry {
  id: string;
  type: "income" | "expense";
  category: FinancialCategory;
  amount: number;
  date: string; // ISO date
  description?: string;
  studentId?: string;
  staffId?: string;
  status?: "paid" | "outstanding" | "waived";
}

export interface EventItem {
  id: string;
  title: string;
  date: string; // ISO date
  description?: string;
  audience?: ("students" | "staff" | "all")[];
}

