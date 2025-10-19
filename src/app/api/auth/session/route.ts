import { NextResponse } from "next/server";
import { z } from "zod";
import {
  createMembership,
  createSchool,
  findMembershipByUid,
  findSchoolByDomain,
  prisma,
  updateMembershipContact,
} from "@/lib/db";
import {
  clearSchoolSessionCookie,
  getSchoolSessionFromCookie,
  setSchoolSessionCookie,
} from "@/lib/auth/server-session";

const SessionPayload = z.object({
  uid: z.string().min(1, "UID is required"),
  email: z.string().email("Valid email required"),
  name: z.string().optional(),
  schoolName: z.string().trim().min(1, "School name required").optional(),
  role: z.enum(["admin", "staff"]).optional(),
});

function normaliseEmail(email: string) {
  return email.trim().toLowerCase();
}

function resolveDomain(email: string) {
  const [, domain] = email.split("@");
  return domain?.toLowerCase();
}

function buildResponse(session: Awaited<ReturnType<typeof getSchoolSessionFromCookie>>) {
  if (!session) return null;
  const { school, staff, ...membership } = session;
  return {
    school: {
      id: school.id,
      name: school.name,
      domain: school.domain,
    },
    membership: {
      id: membership.id,
      email: membership.email,
      googleUid: membership.googleUid,
      role: membership.role,
      staffId: membership.staffId,
      createdAt: membership.createdAt,
      updatedAt: membership.updatedAt,
    },
    staff: staff
      ? {
          id: staff.id,
          name: staff.name,
          role: staff.role,
        }
      : null,
  } as const;
}

export async function GET() {
  const session = await getSchoolSessionFromCookie();
  if (!session) {
    return NextResponse.json({ error: "No active session" }, { status: 401 });
  }
  return NextResponse.json(buildResponse(session));
}

export async function POST(request: Request) {
  const raw = await request.json().catch(() => null);
  const parsed = SessionPayload.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { uid, email, schoolName, role } = parsed.data;
  const normalisedEmail = normaliseEmail(email);
  const domain = resolveDomain(normalisedEmail);

  if (!domain) {
    return NextResponse.json({ error: "Email domain missing" }, { status: 400 });
  }

  const existing = await findMembershipByUid(uid);
  if (existing) {
    if (existing.school.domain !== domain) {
      return NextResponse.json(
        {
          error: "Workspace domain mismatch",
          code: "DOMAIN_MISMATCH",
          expected: existing.school.domain,
          actual: domain,
        },
        { status: 403 },
      );
    }
    if (existing.email !== normalisedEmail) {
      await updateMembershipContact(existing.id, normalisedEmail);
    }
    setSchoolSessionCookie({ uid, membershipId: existing.id });
    return NextResponse.json(buildResponse({ ...existing, email: normalisedEmail }));
  }

  let school = await findSchoolByDomain(domain);
  if (!school) {
    if (!schoolName) {
      return NextResponse.json(
        {
          error: `No school configured for ${domain}`,
          code: "SCHOOL_NOT_FOUND",
          domain,
        },
        { status: 404 },
      );
    }
    school = await createSchool(domain, schoolName);
  }

  const membershipCount = await prisma.schoolMembership.count({ where: { schoolId: school.id } });
  if (membershipCount > 0 && !schoolName) {
    return NextResponse.json(
      {
        error: "No membership provisioned for this staff account",
        code: "MEMBERSHIP_NOT_FOUND",
      },
      { status: 403 },
    );
  }

  const created = await createMembership({
    uid,
    email: normalisedEmail,
    schoolId: school.id,
    role: role ?? "admin",
  });
  setSchoolSessionCookie({ uid, membershipId: created.id });
  return NextResponse.json(buildResponse(created));
}

export async function DELETE() {
  clearSchoolSessionCookie();
  return NextResponse.json({ success: true });
}
