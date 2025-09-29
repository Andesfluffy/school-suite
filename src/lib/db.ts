import {
  AcademicRecord,
  EventItem,
  FinancialEntry,
  MockData,
  Student,
  Staff,
  initialData,
} from "./mock-data";

type Range<T> = {
  gte?: T;
  lte?: T;
  equals?: T;
};

type Where<T> = Partial<{ [K in keyof T]: T[K] | Range<T[K]> }>;

type OrderBy<T> = Partial<Record<keyof T, "asc" | "desc">>;

type Select<T> = Partial<Record<keyof T, boolean>>;

type IncludeMap = Partial<Record<string, boolean>>;

interface QueryArgs<T> {
  where?: Where<T>;
  orderBy?: OrderBy<T>;
  select?: Select<T>;
  include?: IncludeMap;
}

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

const generateId = () => `id_${Math.random().toString(36).slice(2, 10)}`;

const now = () => new Date().toISOString();

type TableItem = Student | Staff | FinancialEntry | AcademicRecord | EventItem;

type TableName = "students" | "staff" | "financialEntries" | "academicRecords" | "events";

interface TableConfig<T extends TableItem> {
  name: TableName;
  getRelated?: (row: T, include?: IncludeMap) => Record<string, unknown>;
}

function matchesWhere<T extends TableItem>(row: T, where?: Where<T>): boolean {
  if (!where) return true;
  for (const key in where) {
    const condition = where[key];
    if (condition === undefined) continue;
    const current = row[key];
    if (condition && typeof condition === "object" && !Array.isArray(condition)) {
      const range = condition as Range<T[typeof key]>;
      if (range.equals !== undefined && current !== range.equals) return false;
      if (range.gte !== undefined && current < range.gte) return false;
      if (range.lte !== undefined && current > range.lte) return false;
      continue;
    }
    if (current !== condition) return false;
  }
  return true;
}

function applyOrder<T extends TableItem>(rows: T[], orderBy?: OrderBy<T>): T[] {
  if (!orderBy) return rows;
  const entries = Object.entries(orderBy) as [keyof T, "asc" | "desc"][];
  if (entries.length === 0) return rows;
  const [key, direction] = entries[0];
  if (!key || !direction) return rows;
  return [...rows].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (av === bv) return 0;
    const comparison = av > bv ? 1 : -1;
    return direction === "asc" ? comparison : comparison * -1;
  });
}

function applySelect<T extends TableItem>(row: T, select?: Select<T>): Partial<T> | T {
  if (!select) return clone(row);
  const result: Partial<T> = {};
  for (const key in select) {
    if (select[key]) {
      result[key] = clone(row[key]);
    }
  }
  return result as Partial<T>;
}

function applyInclude<T extends TableItem>(
  row: T,
  include: IncludeMap | undefined,
  related: ((row: T, include?: IncludeMap) => Record<string, unknown>) | undefined
) {
  if (!include || !related) return row;
  const base = clone(row) as Record<string, unknown>;
  const extra = related(row, include);
  return Object.assign(base, extra) as T;
}

class InMemoryTable<T extends TableItem> {
  constructor(private data: MockData, private config: TableConfig<T>) {}

  private get rows(): T[] {
    return (this.data[this.config.name] as unknown as T[]) ?? [];
  }

  private set rows(value: T[]) {
    (this.data as Record<string, unknown>)[this.config.name] = value;
  }

  async count(args?: { where?: Where<T> }): Promise<number> {
    return this.rows.filter((row) => matchesWhere(row, args?.where)).length;
  }

  async findMany(args?: QueryArgs<T>): Promise<T[]> {
    let result = this.rows.filter((row) => matchesWhere(row, args?.where));
    result = applyOrder(result, args?.orderBy);
    return result.map((row) => {
      const withInclude = applyInclude(row, args?.include, this.config.getRelated);
      if (args?.select) {
        return applySelect(withInclude as T, args.select) as T;
      }
      return clone(withInclude) as T;
    });
  }

  async findUnique(args: { where: { id: string }; include?: IncludeMap; select?: Select<T> }): Promise<T | null> {
    const row = this.rows.find((item) => item.id === args.where.id);
    if (!row) return null;
    const withInclude = applyInclude(row, args.include, this.config.getRelated);
    if (args.select) {
      return (applySelect(withInclude as T, args.select) as T) ?? null;
    }
    return clone(withInclude) as T;
  }

  async create(args: { data: Partial<T>; include?: IncludeMap; select?: Select<T> }): Promise<T> {
    const timestamp = now();
    const row = {
      ...args.data,
      id: (args.data.id as string | undefined) ?? generateId(),
      createdAt: (args.data.createdAt as string | undefined) ?? timestamp,
      updatedAt: timestamp,
    } as T;
    this.rows = [...this.rows, row];
    const withInclude = applyInclude(row, args.include, this.config.getRelated);
    if (args.select) {
      return applySelect(withInclude as T, args.select) as T;
    }
    return clone(withInclude) as T;
  }

  async update(args: { where: { id: string }; data: Partial<T>; include?: IncludeMap; select?: Select<T> }): Promise<T> {
    const existingIndex = this.rows.findIndex((row) => row.id === args.where.id);
    if (existingIndex === -1) throw new Error(`Record not found for update: ${args.where.id}`);
    const updated = {
      ...this.rows[existingIndex],
      ...args.data,
      updatedAt: now(),
    } as T;
    const newRows = [...this.rows];
    newRows[existingIndex] = updated;
    this.rows = newRows;
    const withInclude = applyInclude(updated, args.include, this.config.getRelated);
    if (args.select) {
      return applySelect(withInclude as T, args.select) as T;
    }
    return clone(withInclude) as T;
  }

  async delete(args: { where: { id: string } }): Promise<T> {
    const existingIndex = this.rows.findIndex((row) => row.id === args.where.id);
    if (existingIndex === -1) throw new Error(`Record not found for delete: ${args.where.id}`);
    const [removed] = this.rows.splice(existingIndex, 1);
    this.rows = [...this.rows];
    return clone(removed) as T;
  }
}

interface PrismaMock {
  student: InMemoryTable<Student>;
  staff: InMemoryTable<Staff>;
  financialEntry: InMemoryTable<FinancialEntry>;
  academicRecord: InMemoryTable<AcademicRecord>;
  eventItem: InMemoryTable<EventItem>;
}

declare global {
  var __mockPrisma: PrismaMock | undefined;
  var __mockData: MockData | undefined;
}

const createPrisma = (data: MockData): PrismaMock => ({
  student: new InMemoryTable<Student>(data, { name: "students" }),
  staff: new InMemoryTable<Staff>(data, { name: "staff" }),
  financialEntry: new InMemoryTable<FinancialEntry>(data, { name: "financialEntries" }),
  academicRecord: new InMemoryTable<AcademicRecord>(data, {
    name: "academicRecords",
    getRelated: (row, include) => {
      if (include?.student) {
        const student = data.students.find((s) => s.id === row.studentId) || null;
        return { student: clone(student) };
      }
      return {};
    },
  }),
  eventItem: new InMemoryTable<EventItem>(data, { name: "events" }),
});

if (!globalThis.__mockData) {
  globalThis.__mockData = clone(initialData);
}

if (!globalThis.__mockPrisma) {
  globalThis.__mockPrisma = createPrisma(globalThis.__mockData!);
}

export const prisma = globalThis.__mockPrisma;
