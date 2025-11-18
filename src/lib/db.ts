import { PrismaClient, type MembershipRole, type Prisma } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL ?? "file:./dev.db";
const missingDatabaseUrlMessage =
  "DATABASE_URL is not set. Add it to your environment (see .env.example) before running Prisma migrations or starting the app.";

if (!process.env.DATABASE_URL) {
  console.warn(`${missingDatabaseUrlMessage} Falling back to ${databaseUrl}.`);
}

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ datasources: { db: { url: databaseUrl } } });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export type SchoolMembershipWithSchool = Prisma.SchoolMembershipGetPayload<{
  include: { school: true; staff: true };
}>;

export async function findSchoolByDomain(domain: string) {
  if (!domain) return null;
  return prisma.school.findUnique({ where: { domain: domain.toLowerCase() } });
}

export async function createSchool(domain: string, name: string) {
  return prisma.school.create({
    data: {
      name,
      domain: domain.toLowerCase(),
    },
  });
}

export async function findMembershipByUid(uid: string) {
  if (!uid) return null;
  return prisma.schoolMembership.findUnique({
    where: { googleUid: uid },
    include: { school: true, staff: true },
  });
}

export async function findMembershipByEmailInSchool(email: string, schoolId: string) {
  if (!email || !schoolId) return null;
  return prisma.schoolMembership.findUnique({
    where: {
      email_schoolId: {
        email: email.toLowerCase(),
        schoolId,
      },
    },
    include: { school: true, staff: true },
  });
}

export async function createMembership({
  uid,
  email,
  schoolId,
  role,
  staffId,
}: {
  uid: string;
  email: string;
  schoolId: string;
  role: MembershipRole;
  staffId?: string;
}) {
  return prisma.schoolMembership.create({
    data: {
      googleUid: uid,
      email: email.toLowerCase(),
      role,
      schoolId,
      staffId,
    },
    include: { school: true, staff: true },
  });
}

export async function updateMembershipContact(
  membershipId: string,
  email: string,
) {
  return prisma.schoolMembership.update({
    where: { id: membershipId },
    data: { email: email.toLowerCase() },
    include: { school: true, staff: true },
  });
}
