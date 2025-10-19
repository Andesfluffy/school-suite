-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dob" TEXT,
    "photoUrl" TEXT,
    "guardian" JSONB,
    "stateOfOrigin" TEXT,
    "scholarship" TEXT,
    "financialStatus" TEXT,
    "subjects" JSONB,
    "medicalIssues" JSONB,
    "disabilities" JSONB,
    "sanction" TEXT,
    "clubs" JSONB,
    "grades" JSONB,
    "cgpa" REAL,
    "classOfDegree" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dob" TEXT,
    "phone" TEXT,
    "photoUrl" TEXT,
    "stateOfOrigin" TEXT,
    "disabilities" JSONB,
    "rank" TEXT,
    "salary" REAL,
    "role" TEXT NOT NULL,
    "subjects" JSONB,
    "department" TEXT,
    "sanction" TEXT,
    "clubs" JSONB,
    "qualification" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AcademicRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "attendance" REAL,
    "testScores" JSONB,
    "assignments" JSONB,
    "extraCredits" JSONB,
    "examScores" JSONB,
    "grade" TEXT,
    "cgpa" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AcademicRecord_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FinancialEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT,
    "studentId" TEXT,
    "staffId" TEXT,
    "status" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FinancialEntry_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FinancialEntry_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EventItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT,
    "audience" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "LibraryAsset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT,
    "level" TEXT,
    "resourceType" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "fileUrl" TEXT,
    "tags" JSONB,
    "uploaderId" TEXT,
    "publishedAt" TEXT,
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "LibraryAsset_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "Staff" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QuestionBankItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "term" TEXT,
    "gradeLevel" TEXT,
    "examType" TEXT,
    "totalMarks" INTEGER,
    "durationMinutes" INTEGER,
    "scheduledDate" TEXT,
    "instructions" TEXT,
    "fileUrl" TEXT,
    "uploaderId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "QuestionBankItem_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "Staff" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PayrollRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "staffId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "grossPay" REAL NOT NULL,
    "allowances" JSONB,
    "deductions" JSONB,
    "netPay" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "payDate" TEXT,
    "reference" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PayrollRecord_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SchoolMembership" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "googleUid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "staffId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SchoolMembership_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SchoolMembership_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "School_domain_key" ON "School"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolMembership_googleUid_key" ON "SchoolMembership"("googleUid");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolMembership_email_schoolId_key" ON "SchoolMembership"("email", "schoolId");
