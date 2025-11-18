const { PrismaClient, MembershipRole, StaffRole, Status, EntryType, FinancialCategory, PaymentStatus, PayrollStatus, LibraryResourceType, LibraryFormat } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const school = await prisma.school.upsert({
    where: { domain: "brandstone.edu" },
    update: {},
    create: {
      name: "Brand-Stone Academy",
      domain: "brandstone.edu",
    },
  });

  const opsLead =
    (await prisma.staff.findFirst({ where: { name: "Chinedu Okoye" } })) ??
    (await prisma.staff.create({
      data: {
        name: "Chinedu Okoye",
        status: Status.active,
        role: StaffRole.admin,
        department: "Operations",
        phone: "+234 801 234 5678",
        rank: "Director",
      },
    }));

  await prisma.schoolMembership.upsert({
    where: { googleUid: "demo-admin-uid" },
    update: {
      email: "admin@brandstone.edu",
      schoolId: school.id,
      staffId: opsLead.id,
      role: MembershipRole.admin,
    },
    create: {
      googleUid: "demo-admin-uid",
      email: "admin@brandstone.edu",
      role: MembershipRole.admin,
      schoolId: school.id,
      staffId: opsLead.id,
    },
  });

  const student =
    (await prisma.student.findFirst({ where: { name: "Adaeze Obi" } })) ??
    (await prisma.student.create({
      data: {
        name: "Adaeze Obi",
        status: Status.active,
        dob: "2010-05-12",
        guardian: { name: "Nkechi Obi", phone: "+234 701 111 2222" },
        subjects: ["Mathematics", "Physics", "Literature"],
        cgpa: 4.2,
      },
    }));

  await prisma.financialEntry.create({
    data: {
      type: EntryType.income,
      category: FinancialCategory.fees,
      amount: 250000,
      date: "2024-09-02",
      description: "First term tuition",
      studentId: student.id,
      status: PaymentStatus.paid,
    },
  });

  await prisma.payrollRecord.create({
    data: {
      staffId: opsLead.id,
      month: 9,
      year: 2024,
      grossPay: 450000,
      netPay: 380000,
      status: PayrollStatus.paid,
      allowances: { housing: 30000, transport: 15000 },
      deductions: { pension: 20000 },
    },
  });

  await prisma.libraryAsset.create({
    data: {
      title: "STEM Acceleration Plan",
      subject: "Science",
      description: "Week-by-week scope and sequence for STEM labs.",
      level: "Junior Secondary",
      resourceType: LibraryResourceType.scheme_of_work,
      format: LibraryFormat.pdf,
      fileUrl: "https://example.com/resources/stem-acceleration.pdf",
      tags: ["STEM", "Lab", "Assessment"],
      uploaderId: opsLead.id,
      publishedAt: "2024-08-28",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seed failed", e);
    await prisma.$disconnect();
    process.exit(1);
  });
