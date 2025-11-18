export const AUTH_SIGN_IN_PATH = "/auth/sign-in";

const PUBLIC_PATHS = ["/"];
const PUBLIC_PREFIXES = ["/auth"];

export function isPublicPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  if (PUBLIC_PATHS.includes(pathname)) return true;
  return PUBLIC_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}
