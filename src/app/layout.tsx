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
              <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[auto,1fr,auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
                <Link href="/" aria-label="Go to homepage" className="flex items-center gap-3 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo.png" alt="Brand‑Stone logo" className="h-9 w-9 rounded border border-white/10 bg-black/40 p-1" />
                  <div className="flex min-w-0 flex-col">
                    <span className="font-display text-base font-semibold tracking-tight text-white">Brand‑Stone</span>
                    <span className="text-xs uppercase tracking-[0.18em] text-white/60">School Suite</span>
                  </div>
                </Link>
                <div className="flex items-center justify-center">
                  <Nav />
                </div>
                <div className="flex items-center justify-end gap-4">
                  <div className="hidden text-right text-[11px] uppercase tracking-[0.3em] text-white/45 sm:block">
                    <span className="block">Single sign-on</span>
                    <span className="block text-white/35">Google Workspace</span>
                  </div>
                  <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/55">
                    <span className="h-2 w-2 rounded-full bg-[var(--brand)] shadow-[0_0_10px_rgba(217,4,41,0.8)]" aria-hidden />
                    Schools only
                  </div>
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
