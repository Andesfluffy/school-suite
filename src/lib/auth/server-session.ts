import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma, type SchoolMembershipWithSchool } from "@/lib/db";

const SESSION_COOKIE = "school-suite.session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

type SessionCookiePayload = {
  uid: string;
  membershipId: string;
};

function parseCookie(value: string | undefined): SessionCookiePayload | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as SessionCookiePayload;
    if (parsed && typeof parsed.uid === "string" && typeof parsed.membershipId === "string") {
      return parsed;
    }
  } catch (error) {
    console.warn("Failed to parse session cookie", error);
  }
  return null;
}

export type SchoolSession = SchoolMembershipWithSchool;

export async function getSchoolSessionFromCookie(): Promise<SchoolSession | null> {
  const cookie = cookies().get(SESSION_COOKIE)?.value;
  const payload = parseCookie(cookie);
  if (!payload) {
    return null;
  }
  const membership = await prisma.schoolMembership.findUnique({
    where: { id: payload.membershipId },
    include: { school: true, staff: true },
  });
  if (!membership || membership.googleUid !== payload.uid) {
    return null;
  }
  return membership;
}

export async function requireSchoolSession(): Promise<SchoolSession> {
  const session = await getSchoolSessionFromCookie();
  if (!session) {
    redirect("/auth/sign-in");
  }
  return session;
}

export function setSchoolSessionCookie(payload: SessionCookiePayload) {
  cookies().set({
    name: SESSION_COOKIE,
    value: JSON.stringify(payload),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export function clearSchoolSessionCookie() {
  cookies().delete(SESSION_COOKIE);
}
