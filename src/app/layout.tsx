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

            <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0c1220e6] shadow-[0_18px_40px_-32px_rgba(15,23,42,0.7)] backdrop-blur">
              <div className="relative mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                  <div className="absolute inset-x-[-10%] inset-y-[-120%] bg-gradient-to-r from-[rgba(37,99,235,0.18)] via-[rgba(217,4,41,0.24)] to-[rgba(129,140,248,0.18)] blur-3xl" aria-hidden />
                </div>
                <Link
                  href="/"
                  aria-label="Go to homepage"
                  className="group flex min-w-0 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 transition duration-300 hover:border-white/20 hover:bg-white/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo.svg"
                    alt="Brand-Stone logo"
                    className="h-9 w-9 rounded-full border border-white/10 bg-black/40 p-1 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.8)]"
                  />
                  <div className="flex min-w-0 flex-col">
                    <span className="font-display text-base font-semibold tracking-tight text-white group-hover:text-white">
                      Brand-Stone
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/70">
                      School Suite
                    </span>
                  </div>
                </Link>

                <div className="hidden justify-center md:flex">
                  <Nav />
                </div>

                <div className="flex flex-1 items-center justify-end gap-4">
                  <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/70 sm:flex">
                    <span className="h-2 w-2 rounded-full bg-[var(--brand)] shadow-[0_0_12px_rgba(217,4,41,0.8)]" aria-hidden />
                    Schools only
                  </div>
                  <div className="hidden min-w-[9rem] text-right text-[11px] uppercase tracking-[0.32em] text-white/55 lg:block">
                    <span className="block">Single sign-on</span>
                    <span className="block text-white/45">Google Workspace</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <span className="hidden text-[11px] uppercase tracking-[0.3em] text-white/60 sm:block">Profile</span>
                    <UserMenu />
                  </div>
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

            <footer className="border-t border-white/10 bg-[#0b1324]">
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
