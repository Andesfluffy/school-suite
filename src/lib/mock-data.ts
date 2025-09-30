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

export type LibraryResourceType =
  | "lecture_note"
  | "scheme_of_work"
  | "reading"
  | "past_question"
  | "media";

export type LibraryFormat = "pdf" | "docx" | "presentation" | "spreadsheet" | "video" | "audio" | "link";

export type PayrollStatus = "draft" | "processed" | "issued" | "paid";

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

export interface EventItem {
  id: string;
  title: string;
  date: string;
  description?: string | null;
  audience?: string[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface LibraryAsset {
  id: string;
  title: string;
  subject: string;
  description?: string | null;
  level?: string | null;
  resourceType: LibraryResourceType;
  format: LibraryFormat;
  fileUrl?: string | null;
  tags?: string[] | null;
  uploaderId?: string | null;
  publishedAt?: string | null;
  downloads: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionBankItem {
  id: string;
  title: string;
  subject: string;
  term?: string | null;
  gradeLevel?: string | null;
  examType?: string | null;
  totalMarks?: number | null;
  durationMinutes?: number | null;
  scheduledDate?: string | null;
  instructions?: string | null;
  fileUrl?: string | null;
  uploaderId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PayrollBreakdownItem {
  label: string;
  amount: number;
}

export interface PayrollRecord {
  id: string;
  staffId: string;
  month: number;
  year: number;
  grossPay: number;
  allowances?: PayrollBreakdownItem[] | null;
  deductions?: PayrollBreakdownItem[] | null;
  netPay: number;
  status: PayrollStatus;
  payDate?: string | null;
  reference?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

const now = () => new Date().toISOString();

export interface MockData {
  students: Student[];
  staff: Staff[];
  financialEntries: FinancialEntry[];
  academicRecords: AcademicRecord[];
  events: EventItem[];
  libraryAssets: LibraryAsset[];
  questionBankItems: QuestionBankItem[];
  payrollRecords: PayrollRecord[];
}

const today = new Date();
const formatMonth = (monthsAgo: number) => {
  const date = new Date(today);
  date.setMonth(date.getMonth() - monthsAgo);
  return date.toISOString().slice(0, 10);
};

const formatDaysAgo = (daysAgo: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() - daysAgo);
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
  events: [
    {
      id: "evt_1",
      title: "PTA General Assembly",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7).toISOString(),
      description: "Quarterly briefing with guardians on academic progress and upcoming projects.",
      audience: ["Guardians", "Teachers"],
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: "evt_2",
      title: "Science Fair Showcase",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 21).toISOString(),
      description: "Students present STEM innovations for community judging.",
      audience: ["Students", "Community"],
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: "evt_3",
      title: "Teachers' Capacity Workshop",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 12).toISOString(),
      description: "Professional development on differentiated learning and assessment.",
      audience: ["Teachers"],
      createdAt: now(),
      updatedAt: now(),
    },
  ],
  libraryAssets: [
    {
      id: "lib_1",
      title: "SS2 Physics – Electromagnetic Induction",
      subject: "Physics",
      level: "SS2",
      resourceType: "lecture_note",
      format: "pdf",
      description: "Comprehensive notes with diagrams covering Faraday's and Lenz's laws.",
      fileUrl: "https://storage.schoolsuite.com/library/physics-induction.pdf",
      tags: ["STEM", "Senior Secondary"],
      uploaderId: "stf_1",
      publishedAt: formatDaysAgo(12),
      downloads: 148,
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: "lib_2",
      title: "Junior WAEC Past Questions – Mathematics",
      subject: "Mathematics",
      level: "JS3",
      resourceType: "past_question",
      format: "pdf",
      description: "Five-year compilation of Junior WAEC math questions with solutions.",
      fileUrl: "https://storage.schoolsuite.com/library/junior-waec-maths.pdf",
      tags: ["Revision", "Exam Prep"],
      publishedAt: formatDaysAgo(30),
      downloads: 305,
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: "lib_3",
      title: "Literature-in-English Reading List Audio",
      subject: "Literature",
      level: "SS1",
      resourceType: "media",
      format: "audio",
      description: "Narrated summary of key African prose texts for SS1 literature class.",
      fileUrl: "https://storage.schoolsuite.com/library/lit-reading-list.mp3",
      tags: ["Audio", "Literature"],
      downloads: 92,
      createdAt: now(),
      updatedAt: now(),
    },
  ],
  questionBankItems: [
    {
      id: "qb_1",
      title: "Mid-Term Test: Algebraic Expressions",
      subject: "Mathematics",
      term: "2024/2025 · Term 1",
      gradeLevel: "SS1",
      examType: "Mid-term",
      totalMarks: 40,
      durationMinutes: 45,
      scheduledDate: formatDaysAgo(-7),
      instructions: "Attempt all questions. Show workings for full marks.",
      fileUrl: "https://storage.schoolsuite.com/question-bank/ss1-algebra.docx",
      uploaderId: "stf_1",
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: "qb_2",
      title: "End of Term Exam: Civic Education",
      subject: "Civic Education",
      term: "2024/2025 · Term 1",
      gradeLevel: "JS2",
      examType: "Exam",
      totalMarks: 70,
      durationMinutes: 60,
      scheduledDate: formatDaysAgo(10),
      instructions: "Section A objective, Section B theory questions.",
      fileUrl: "https://storage.schoolsuite.com/question-bank/js2-civic.pdf",
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: "qb_3",
      title: "Continuous Assessment: Basic Science Practical",
      subject: "Basic Science",
      term: "2024/2025 · Term 2",
      gradeLevel: "JS1",
      examType: "CA",
      totalMarks: 30,
      durationMinutes: 40,
      scheduledDate: formatDaysAgo(-20),
      instructions: "Lab practical with observation logs.",
      createdAt: now(),
      updatedAt: now(),
    },
  ],
  payrollRecords: [
    {
      id: "pay_1",
      staffId: "stf_1",
      month: today.getMonth() + 1,
      year: today.getFullYear(),
      grossPay: 320000,
      allowances: [
        { label: "Housing", amount: 40000 },
        { label: "Transport", amount: 15000 },
      ],
      deductions: [
        { label: "Tax", amount: 22000 },
        { label: "Pension", amount: 16000 },
      ],
      netPay: 327000,
      status: "issued",
      payDate: formatDaysAgo(3),
      reference: "SS-2024-07-0001",
      notes: "Signed copy awaiting pickup.",
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: "pay_2",
      staffId: "stf_2",
      month: today.getMonth(),
      year: today.getFullYear(),
      grossPay: 280000,
      allowances: [{ label: "Responsibility", amount: 25000 }],
      deductions: [{ label: "Tax", amount: 18000 }],
      netPay: 287000,
      status: "paid",
      payDate: formatDaysAgo(30),
      reference: "SS-2024-06-0008",
      createdAt: now(),
      updatedAt: now(),
    },
  ],
};
