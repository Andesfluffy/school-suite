import "./globals.css";
import type { Metadata } from "next";
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
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "Brand‑Stone School Suite",
  description: "Student and staff records, academics, events, and financials",
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
            <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070707cc] backdrop-blur">
              <div className="container flex h-16 items-center justify-between gap-4">
                <Link href="/" aria-label="Go to homepage" className="flex items-center gap-3 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo.png" alt="Brand‑Stone logo" className="h-9 w-9 rounded border border-white/10 bg-black/40 p-1" />
                  <div className="flex min-w-0 flex-col">
                    <span className="font-display text-base font-semibold tracking-tight text-white">Brand‑Stone</span>
                    <span className="text-xs uppercase tracking-[0.18em] text-white/60">School Suite</span>
                  </div>
                </Link>
                <div className="hidden lg:flex flex-1 items-center justify-center">
                  <div className="relative w-full max-w-xl">
                    <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-white/40">
                      <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4">
                        <path
                          d="M12.5 12.5 16 16"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </span>
                    <input
                      placeholder="Search the suite · Press ⌘K"
                      className="w-full rounded-full border border-white/10 bg-white/10 py-2 pl-9 pr-4 text-sm text-white placeholder-white/50 transition focus:border-[var(--brand-500)] focus:bg-black/40 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Nav />
                  <UserMenu />
                </div>
              </div>
            </header>
            <main id="content" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
              <AppFrame>{children}</AppFrame>
            </main>
            <CommandPalette />
            <footer className="border-t border-white/10 bg-[#080808]">
              <div className="container flex flex-col gap-2 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
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
