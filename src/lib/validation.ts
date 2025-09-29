import { z } from "zod";

export const StudentInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  status: z.enum(["active", "inactive", "suspended", "graduated"], {
    required_error: "Status is required",
  }),
  dob: z.string().trim().optional().or(z.literal("")),
  photoUrl: z.string().url().optional().or(z.literal("")),
  guardianName: z.string().trim().optional().or(z.literal("")),
  guardianPhone: z.string().trim().optional().or(z.literal("")),
  stateOfOrigin: z.string().trim().optional().or(z.literal("")),
  scholarship: z.string().trim().optional().or(z.literal("")),
  medicalIssues: z.string().optional().or(z.literal("")),
  disabilities: z.string().optional().or(z.literal("")),
  clubs: z.string().optional().or(z.literal("")),
});

export type StudentInput = z.infer<typeof StudentInputSchema>;

export const StaffInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  status: z.enum(["active", "inactive", "suspended", "retired"], {
    required_error: "Status is required",
  }),
  dob: z.string().trim().optional().or(z.literal("")),
  phone: z.string().trim().optional().or(z.literal("")),
  photoUrl: z.string().url().optional().or(z.literal("")),
  stateOfOrigin: z.string().trim().optional().or(z.literal("")),
  disabilities: z.string().optional().or(z.literal("")),
  rank: z.string().trim().optional().or(z.literal("")),
  salary: z.string().trim().optional().or(z.literal("")),
  role: z.enum(["academic", "admin"], { required_error: "Role is required" }),
  subjects: z.string().optional().or(z.literal("")),
  department: z.string().trim().optional().or(z.literal("")),
  sanction: z.string().trim().optional().or(z.literal("")),
  clubs: z.string().optional().or(z.literal("")),
  qualification: z.string().trim().optional().or(z.literal("")),
});

export type StaffInput = z.infer<typeof StaffInputSchema>;

export const FinancialInputSchema = z.object({
  type: z.enum(["income", "expense"]),
  category: z.enum([
    "fees",
    "dues",
    "medical",
    "sanctions",
    "grants",
    "donations",
    "trade_fare",
    "salaries",
    "benefits",
    "training",
    "utilities",
    "maintenance",
    "lab_equipment",
    "software_license",
    "learning_materials",
    "tax",
    "scholarship",
    "miscellaneous",
  ]),
  amount: z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, {
    message: "Enter a valid amount",
  }),
  date: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  studentId: z.string().optional().or(z.literal("")),
  staffId: z.string().optional().or(z.literal("")),
  status: z.enum(["paid", "outstanding", "waived"]).optional().or(z.literal("")),
});

export type FinancialInput = z.infer<typeof FinancialInputSchema>;

export const AcademicInputSchema = z.object({
  studentId: z.string().min(1, "Student is required"),
  term: z.string().trim().min(1, "Term is required"),
  attendance: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((v) => v === undefined || v === "" || (!isNaN(Number(v)) && Number(v) >= 0 && Number(v) <= 100), {
      message: "Attendance must be 0-100",
    }),
  grade: z.string().optional().or(z.literal("")),
  cgpa: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((v) => v === undefined || v === "" || (!isNaN(Number(v)) && Number(v) >= 0 && Number(v) <= 5), {
      message: "CGPA must be 0-5",
    }),
});

export type AcademicInput = z.infer<typeof AcademicInputSchema>;

export const EventInputSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  date: z
    .string()
    .trim()
    .min(1, "Date is required")
    .refine((value) => {
      const timestamp = Date.parse(value);
      return Number.isFinite(timestamp);
    }, "Enter a valid date"),
  description: z.string().optional().or(z.literal("")),
  audience: z.string().optional().or(z.literal("")),
});

export type EventInput = z.infer<typeof EventInputSchema>;
