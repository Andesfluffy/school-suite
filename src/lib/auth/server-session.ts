import { existsSync } from "node:fs";
import { join } from "node:path";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma, type SchoolMembershipWithSchool } from "@/lib/db";
import { AUTH_SIGN_IN_PATH, isPublicPath } from "@/lib/routes";

const SESSION_COOKIE = "school-suite.session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const SIGN_IN_PAGE_PATH = join(process.cwd(), "src/app/auth/sign-in/page.tsx");
let signInRouteAvailable: boolean | null = null;

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

function ensureSignInRouteExists() {
  if (signInRouteAvailable !== null) return signInRouteAvailable;
  signInRouteAvailable = existsSync(SIGN_IN_PAGE_PATH);
  if (!signInRouteAvailable) {
    throw new Error(`Authentication route is missing. Expected: ${SIGN_IN_PAGE_PATH}`);
  }
  return signInRouteAvailable;
}

export type SchoolSession = SchoolMembershipWithSchool;

export async function getSchoolSessionFromCookie(): Promise<SchoolSession | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE)?.value;
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

type RequireSchoolSessionOptions = {
  allowUnauthenticated?: boolean;
  currentPath?: string | null;
};

export async function requireSchoolSession(
  options: RequireSchoolSessionOptions = {},
): Promise<SchoolSession | null> {
  const session = await getSchoolSessionFromCookie();
  if (session) {
    return session;
  }

  const headerStore = await headers();
  const currentPath = options.currentPath ?? headerStore.get("next-url") ?? headerStore.get("referer") ?? null;
  if (options.allowUnauthenticated || isPublicPath(currentPath)) {
    return null;
  }

  ensureSignInRouteExists();
  redirect(AUTH_SIGN_IN_PATH);
}

export async function setSchoolSessionCookie(payload: SessionCookiePayload) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE,
    value: JSON.stringify(payload),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearSchoolSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
