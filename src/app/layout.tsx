import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import Nav from "@/components/Nav";
// ThemeMenu removed: single vibrant theme only
import ToastProvider from "@/components/ToastProvider";
import Link from "next/link";
import AppFrame from "@/components/AppFrame";
import TopProgress from "@/components/TopProgress";
import CommandPalette from "@/components/CommandPalette";
import { AuthProvider } from "@/components/AuthProvider";
import UserMenu from "@/components/UserMenu";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Brand-Stone School Suite",
  description: "Student and staff records, academics, events, and financials",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#DC143C" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <AuthProvider>
          <ToastProvider>
            <TopProgress />
            <a className="skip-link" href="#content">
              Skip to content
            </a>

            <header className="sticky top-0 z-40 border-b border-neutral-200/70 bg-white/95 shadow-sm backdrop-blur-xl relative">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--brand-600)] via-[var(--brand)] to-[var(--brand-500)] opacity-70" aria-hidden />
              <div className="relative mx-auto flex h-20 w-full max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
                <div className="pointer-events-none absolute inset-x-0 bottom-0 top-1/2 -z-10 bg-gradient-to-b from-white via-white/95 to-white" aria-hidden />
                <Link
                  href="/"
                  aria-label="Go to homepage"
                  className="group flex min-w-0 items-center gap-3 rounded-full border border-neutral-200/80 bg-white px-3 py-2 shadow-sm transition duration-300 hover:border-neutral-300 hover:shadow-md"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo.svg"
                    alt="Brand-Stone logo"
                    className="h-9 w-9 rounded-full border border-neutral-200 bg-white p-1 shadow-inner"
                  />
                  <div className="flex min-w-0 flex-col">
                    <span className="font-display text-base font-semibold tracking-tight text-[var(--brand)]">
                      Brand-Stone
                    </span>
                    <span className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                      School Suite
                    </span>
                  </div>
                </Link>

                <div className="hidden flex-1 items-center justify-center md:flex">
                  <Nav />
                </div>

                <div className="flex flex-1 items-center justify-end gap-3">
                  <div className="hidden items-center gap-3 lg:flex">
                    <div className="rounded-full border border-neutral-200/80 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500 shadow-sm">
                      Community Portal
                    </div>
                    <Link
                      href="/contact"
                      className="rounded-full border border-transparent bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-500)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
                    >
                      Contact support
                    </Link>
                  </div>
                  <UserMenu />
                </div>
              </div>
              <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 pb-3 sm:px-6 lg:px-8 md:hidden">
                <Nav />
              </div>
            </header>

            <main
              id="content"
              className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in"
            >
              <AppFrame>{children}</AppFrame>
            </main>

            <CommandPalette />

            <footer className="border-t border-neutral-200 bg-white/95">
              <div className="container flex flex-col gap-2 py-6 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
                <span>© {new Date().getFullYear()} School Suite</span>
                <span>Designed for clarity · Powered by Next.js + Prisma</span>
              </div>
            </footer>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
